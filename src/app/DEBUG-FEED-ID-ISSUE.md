# 🐛 Debug Guide: Feed ID Always Showing as 6

## 🎯 Problem Description

All detections appear to be coming from Feed 6, even when other feeds should be detecting.

## 🔍 Root Cause Analysis

There are several possible causes:

### 1. **Only Feed 6 is Actually Detecting** (Most Likely)
- Feeds 1-5 might not have weapons in their video streams
- Feed 6 video has weapons and is the only one triggering
- This is **normal behavior** if only Feed 6 has weapons

### 2. **Backend Stream Initialization Issue**
- All feeds might be using the same stream instance
- Stream key collision causing wrong feed_id

### 3. **Frontend Feed Loop Issue**
- Loop variable closure problem
- All feeds referencing last feed in loop

### 4. **Detection Event Storage Issue**
- Backend storing all events with same feed_id
- feed_id being overwritten

---

## 🧪 Diagnostic Steps

### Step 1: Check Which Feeds Are Actually Running

**Run this in Browser Console:**
```javascript
// Check which feeds have weapon detection enabled
const feeds = document.querySelectorAll('[data-feed-id]');
feeds.forEach(feed => {
  const id = feed.getAttribute('data-feed-id');
  console.log(`Feed ${id}:`, feed.dataset);
});
```

### Step 2: Check Backend Logs

**Watch Python server terminal for:**
```
🎬 VIDEO FEED REQUEST: feed_id=1, source=video, use_camera=False
🎬 VIDEO FEED REQUEST: feed_id=2, source=video, use_camera=False
🎬 VIDEO FEED REQUEST: feed_id=3, source=video, use_camera=False
🎬 VIDEO FEED REQUEST: feed_id=4, source=camera, use_camera=True
🎬 VIDEO FEED REQUEST: feed_id=5, source=video, use_camera=False
🎬 VIDEO FEED REQUEST: feed_id=6, source=video, use_camera=False
```

**If you see all 6 feeds → Backend is receiving correct feed IDs ✅**
**If you only see Feed 6 → Frontend is only requesting Feed 6 ❌**

### Step 3: Check Detection Storage

**Watch for detection storage logs:**
```
🎯 STORING DETECTION EVENT: feed_id=5, source_type=Video Feed, timestamp=...
🎯 STORING DETECTION EVENT: feed_id=6, source_type=Video Feed, timestamp=...
```

**Expected:** Different feed_ids as weapons are detected
**Problem:** All showing feed_id=6

### Step 4: Check Frontend Detection Processing

**Watch Browser Console:**
```
🚀 Starting detection for Feed 1 (Main Street Intersection)
🚀 Starting detection for Feed 2 (Central Park East)
🚀 Starting detection for Feed 3 (Shopping Mall Entrance)
🚀 Starting detection for Feed 4 (Residential Zone A)
🚀 Starting detection for Feed 5 (Industrial Zone B)
🚀 Starting detection for Feed 6 (Airport Terminal)
```

**Then during detection:**
```
🔍 Detection from Feed 6 - Source: Video Feed - Weapon: true, Person: true
✅ Valid detection on Feed 6 - Processing alert and evidence capture
```

### Step 5: Manually Test Each Feed

**Test Feed 5 specifically (has weapon video):**
```bash
curl "http://localhost:5000/video_feed/5?source=video"
```

Wait 30 seconds, then check:
```bash
curl "http://localhost:5000/api/detections" | jq '.detections[-5:]'
```

Look for feed_id: 5 in the output.

---

## 🔧 Possible Fixes

### Fix 1: If Only Feed 6 is Detecting (Normal Behavior)

**This is expected!** Only Feed 6 has a weapon detection video. To test other feeds:

1. **Feed 5**: Change to a weapon detection video
2. **Feed 4**: Hold weapon image in front of webcam
3. **Feeds 1-3**: These are live city streams, unlikely to have weapons

**Verify Feed 5 Video:**
```python
# In weapon-detection-server.py
VIDEO_SOURCES = {
    5: 'https://youtube.com/shorts/myXiZTDSo-E',  # This should have weapons
    6: 'https://www.youtube.com/watch?v=llW2mUEZDFw',  # This has weapons
}
```

### Fix 2: If Backend Shows Wrong feed_id

**Add debug logging in VideoStream.__init__:**
```python
def __init__(self, feed_id, source, use_camera=False):
    print(f"🔧 INITIALIZING VideoStream: feed_id={feed_id}, source={source}, use_camera={use_camera}")
    self.feed_id = feed_id
    # ... rest of init
```

### Fix 3: If Frontend Requests Wrong feed_id

**Check cctvFeeds array:**
```javascript
// In browser console
console.log(cctvFeeds.map(f => ({ id: f.id, name: f.name })));
```

Should show:
```
[
  {id: 1, name: "Main Street Intersection"},
  {id: 2, name: "Central Park East"},
  {id: 3, name: "Shopping Mall Entrance"},
  {id: 4, name: "Residential Zone A"},
  {id: 5, name: "Industrial Zone B"},
  {id: 6, name: "Airport Terminal"}
]
```

### Fix 4: If Detection Events Have Wrong feed_id

**Check active_streams dictionary:**
```python
# Add to /api/health endpoint in weapon-detection-server.py
@app.route('/api/health')
def health():
    stream_info = {
        key: {
            'feed_id': stream.feed_id,
            'use_camera': stream.use_camera,
            'detection_count': stream.detection_count
        }
        for key, stream in active_streams.items()
    }
    return jsonify({
        'status': 'running',
        'model_loaded': model is not None,
        'active_streams': stream_info
    })
```

Then check: `http://localhost:5000/api/health`

---

## 🎯 Quick Test Script

Save as `test-feed-ids.py`:

```python
import requests
import time
import json

API_BASE = 'http://localhost:5000'

print("🔍 Testing Feed ID Detection System\n")

# Step 1: Check health
print("Step 1: Checking backend health...")
health = requests.get(f"{API_BASE}/api/health").json()
print(f"✅ Status: {health['status']}, Model: {health['model_loaded']}\n")

# Step 2: Trigger all feeds
print("Step 2: Triggering all 6 feeds...")
for feed_id in range(1, 7):
    for source in ['video', 'camera']:
        try:
            requests.get(f"{API_BASE}/video_feed/{feed_id}?source={source}", timeout=2)
            print(f"✅ Feed {feed_id} ({source}) triggered")
        except:
            pass

print("\nStep 3: Waiting 30 seconds for detections...")
time.sleep(30)

# Step 4: Check detections
print("\nStep 4: Checking detection events...")
detections = requests.get(f"{API_BASE}/api/detections").json()

if detections['detections']:
    print(f"\n📊 Found {len(detections['detections'])} detection events:")
    feed_counts = {}
    for det in detections['detections']:
        feed_id = det['feed_id']
        feed_counts[feed_id] = feed_counts.get(feed_id, 0) + 1
    
    print("\n📈 Detections per feed:")
    for feed_id in sorted(feed_counts.keys()):
        print(f"  Feed {feed_id}: {feed_counts[feed_id]} detections")
    
    if len(feed_counts) == 1 and 6 in feed_counts:
        print("\n⚠️ WARNING: Only Feed 6 is detecting!")
        print("   This is normal if only Feed 6 has weapons in the video.")
        print("   To test other feeds:")
        print("   - Feed 5: Verify YouTube Shorts URL has weapons")
        print("   - Feed 4: Hold weapon image in front of webcam")
        print("   - Feeds 1-3: Live city streams (unlikely to have weapons)")
    elif len(feed_counts) > 1:
        print("\n✅ Multiple feeds are detecting! System working correctly.")
else:
    print("\n❌ No detections found")
```

Run it:
```bash
python test-feed-ids.py
```

---

## 🎬 Video Source Verification

### Current Feed Configuration:

| Feed ID | Video Source | Has Weapons? | Detection Expected? |
|---------|--------------|--------------|-------------------|
| 1 | YouTube Live Street | ❌ No | ❌ No detections |
| 2 | YouTube Live Park | ❌ No | ❌ No detections |
| 3 | YouTube Live Mall | ❌ No | ❌ No detections |
| 4 | Webcam (source=0) | ⚠️ Only if shown | ✅ Yes (if weapon shown) |
| 5 | YouTube Shorts | ✅ Yes (should have) | ✅ Yes |
| 6 | YouTube Video | ✅ Yes (confirmed) | ✅ Yes |

**Most likely scenario:** Only Feeds 5 and 6 have weapons, so only they detect!

---

## 🔍 Advanced Debugging

### Add Explicit Feed ID Tracking:

**In weapon-detection-server.py, modify detect_weapons:**

```python
def detect_weapons(self, frame):
    """Run YOLO detection on frame"""
    if model is None:
        return frame
    
    # EXPLICIT: Log which feed is processing
    if self.frame_count % 30 == 0:  # Every 30 frames
        print(f"🔄 Feed {self.feed_id} processing frame {self.frame_count}")
    
    try:
        results = model.track(frame, persist=True, verbose=False, conf=DETECTION_CONFIDENCE)
        # ... rest of detection logic
```

This will show which feeds are actually running.

---

## ✅ Expected Behavior

**Normal Operation:**
- Feed 6 detects frequently (has weapon video) ✅
- Feed 5 might detect (if video has weapons) ✅
- Feed 4 detects only when weapon shown to webcam ✅
- Feeds 1-3 rarely detect (live city streams) ✅

**This is NOT a bug!** Only feeds with weapons will detect weapons.

**Problem Indicators:**
- Feed 5 video has weapons but not detecting ❌
- Feed 4 shows weapon to webcam but not detecting ❌
- Backend logs show feed_id=6 for all streams ❌
- Frontend only starts Feed 6 stream ❌

---

## 🚀 Quick Fix Commands

### Restart Everything:
```bash
# Terminal 1: Stop and restart backend
Ctrl+C
python weapon-detection-server.py

# Terminal 2: Clear browser cache and refresh
# In browser: Ctrl+Shift+R (hard refresh)
```

### Clear Detection History:
```bash
# Restart Python server (clears detection_events list)
Ctrl+C
python weapon-detection-server.py
```

### Test Specific Feed:
```bash
# Test Feed 5 detection
curl "http://localhost:5000/video_feed/5?source=video" > /dev/null &

# Wait 30 seconds
sleep 30

# Check detections
curl "http://localhost:5000/api/detections" | grep -o "feed_id.*5"
```

---

## 📊 Debug Checklist

- [ ] Backend shows all 6 VIDEO FEED REQUEST logs
- [ ] Backend shows STORING DETECTION EVENT with different feed_ids
- [ ] Frontend logs show "Starting detection for Feed X" for all 6 feeds
- [ ] Browser console shows detections from multiple feed_ids
- [ ] Feed 5 YouTube video actually contains weapons
- [ ] Feed 4 webcam can see weapon image clearly
- [ ] No JavaScript errors in browser console
- [ ] Backend has no Python errors
- [ ] Active streams includes all 6 feeds

---

## 🎯 Most Likely Conclusion

**If you're seeing only Feed 6 detections, it's probably because:**

1. ✅ Feed 6 has a weapon detection video that works
2. ❓ Feed 5 video might not have clear weapons
3. ❓ Feed 4 webcam hasn't been tested with weapon image
4. ✅ Feeds 1-3 are live city streams (no weapons expected)

**This is normal behavior!** The system is working correctly.

**To verify it's working on other feeds:**
- Test Feed 4: Hold weapon+person image in front of webcam
- Wait for alert with "Feed ID: 4" in the description

If that works, the system is functioning perfectly! ✅
