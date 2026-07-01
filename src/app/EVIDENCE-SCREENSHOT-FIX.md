# 🔧 Evidence Screenshot Fix - Capture from Correct Feed

## 🎯 Problem

Evidence section shows screenshots from Feed 4 (webcam) instead of from the actual feed where weapon+person was detected (e.g., Feed 5 or Feed 6).

## 🔍 Root Cause

The issue could be:
1. **Stream lookup failure** - Wrong stream being retrieved from `active_streams`
2. **best_detection_frame not set** - Falling back to wrong stream's current frame
3. **Stream key mismatch** - Requesting camera when should be video (or vice versa)
4. **Timing issue** - best_detection_frame being reset before capture

## ✅ Fixes Applied

### 1. Enhanced Backend Logging

Added comprehensive logging to `/api/capture/<feed_id>` endpoint:

```python
📸 CAPTURE REQUEST: feed_id=5, source=video
🔍 Available streams: ['1_video', '2_video', '3_video', '4_camera', '5_video', '6_video']
✅ Found stream: 5_video (feed_id=5, use_camera=False)
🎯 Stream details: feed_id=5, use_camera=False, stream_key=5_video
📊 Best frame available: True, Confidence: 0.87
✅ CAPTURED: Best frame from Video feed 5 (requested feed_id=5)
```

This will show:
- Which feed_id was requested
- Which source was requested (camera/video)
- All available streams in memory
- Which stream was actually used
- The stream's internal feed_id (to verify match)
- Whether best_detection_frame was available

### 2. Feed ID Verification Overlay

Added feed ID text overlay on captured screenshots:

```python
cv2.putText(frame_copy, f"FEED {stream.feed_id}", (10, 30), 
            cv2.FONT_HERSHEY_SIMPLEX, 1.0, (0, 255, 0), 2)
```

**Now screenshots will show "FEED X" in top-left corner** so you can visually verify which feed was captured!

### 3. Frontend Enhanced Logging

Added detailed logging in frontend `captureScreenshot()` function:

```javascript
============================================================
📸 SCREENSHOT CAPTURE REQUEST
   Feed ID: 5
   Source Type: Video Feed
   Source Parameter: video
   Detection Timestamp: 2025-01-10T10:30:15
   Capture URL: http://localhost:5000/api/capture/5?source=video
✅ Screenshot captured successfully from Feed 5 - Video Feed
   Blob size: 125643 bytes
============================================================
```

### 4. Stream Registration Logging

Added logging when streams are created/reused:

```python
🆕 Creating new stream: 5_video (feed_id=5, source=<url>, use_camera=False)
✅ Stream started and registered: 5_video (stream.feed_id=5)
```

This ensures each stream is registered with correct feed_id.

### 5. Best Frame Reset After Capture

Added explicit reset of `best_detection_confidence`:

```python
stream.best_detection_frame = None
stream.best_detection_confidence = 0.0
```

This ensures stale frames aren't reused.

---

## 🧪 How to Debug

### Step 1: Enable Weapon Detection

1. Start backend: `python weapon-detection-server.py`
2. Open dashboard
3. Enable weapon detection
4. Watch backend terminal for stream creation logs:

```
🎬 VIDEO FEED REQUEST: feed_id=5, source=video, use_camera=False
🆕 Creating new stream: 5_video (feed_id=5, source=..., use_camera=False)
✅ Stream started and registered: 5_video (stream.feed_id=5)
```

**Verify:** Each feed gets created with correct feed_id

### Step 2: Wait for Detection

Wait for Feed 5 or Feed 6 to detect (30-60 seconds). Watch backend:

```
👤 DEBUG Feed 5: PERSON (Class 0) detected!
🔫 DEBUG Feed 5: DANGEROUS WEAPON (Class 1) detected!
📸 Best frame updated for feed 5 - Confidence: 0.87
⚠️⚠️⚠️ DANGEROUS WEAPON + PERSON DETECTED on feed 5!
🎯 STORING DETECTION EVENT: feed_id=5, source_type=Video Feed
```

**Verify:** Detection event stored with correct feed_id (5, not 4)

### Step 3: Watch Screenshot Capture

When frontend captures screenshot, watch both logs:

**Frontend (Browser Console):**
```
============================================================
📸 SCREENSHOT CAPTURE REQUEST
   Feed ID: 5
   Source Type: Video Feed
   Source Parameter: video
   Capture URL: http://localhost:5000/api/capture/5?source=video
```

**Backend (Python Terminal):**
```
============================================================
📸 CAPTURE REQUEST: feed_id=5, source=video
🔍 Available streams: ['4_camera', '5_video', '6_video', ...]
✅ Found stream: 5_video (feed_id=5, use_camera=False)
🎯 Stream details: feed_id=5, use_camera=False, stream_key=5_video
📊 Best frame available: True, Confidence: 0.87
✅ CAPTURED: Best frame from Video feed 5 (requested feed_id=5)
============================================================
```

**Verify:**
- Frontend requests feed_id=5
- Backend finds 5_video stream
- Backend confirms stream.feed_id=5
- Backend captures from feed 5

### Step 4: Check Evidence Screenshot

1. Go to Evidence Section
2. Click on new evidence item
3. Look at screenshot - should show:
   - **"FEED 5" text in top-left corner** ✅
   - Content from Feed 5 video (not webcam)
   - Bounding boxes around detections

**If you see "FEED 4"** → Wrong feed captured! ❌
**If you see "FEED 5"** → Correct feed captured! ✅

---

## 🔍 Diagnostic Scenarios

### Scenario A: Backend captures wrong feed

**Symptoms:**
```
📸 CAPTURE REQUEST: feed_id=5, source=video
✅ Found stream: 4_camera (feed_id=4, use_camera=True)  ← WRONG!
```

**Cause:** Stream lookup finding wrong stream
**Fix:** Check stream_key generation and active_streams dictionary

### Scenario B: Best frame not available

**Symptoms:**
```
📊 Best frame available: False, Confidence: 0.00
⚠️ No best frame available, used current frame from feed 5
```

**Cause:** best_detection_frame being reset before capture
**Fix:** Increase time between detection and capture, or don't reset immediately

### Scenario C: Source type mismatch

**Symptoms:**
```
📸 CAPTURE REQUEST: feed_id=5, source=camera  ← Should be 'video'!
❌ Stream not found: 5_camera
```

**Cause:** Frontend sending wrong source parameter
**Fix:** Check detection.source_type mapping in frontend

### Scenario D: Feed ID mismatch

**Symptoms:**
```
📸 CAPTURE REQUEST: feed_id=4, source=camera
   (But detection was actually from Feed 5)
```

**Cause:** Frontend using wrong feed_id from detection
**Fix:** Check detection.feed_id is correct in detection event

---

## 🎯 Expected Behavior

### For Feed 5 Detection:

1. **Detection occurs:**
   ```
   🎯 STORING DETECTION EVENT: feed_id=5, source_type=Video Feed
   ```

2. **Frontend processes:**
   ```
   🔍 Detection from Feed 5 - Source: Video Feed
   ✅ Valid detection on Feed 5
   ```

3. **Screenshot captured:**
   ```
   Frontend: Capture URL: .../api/capture/5?source=video
   Backend: CAPTURED: Best frame from Video feed 5 (requested feed_id=5)
   ```

4. **Evidence created:**
   ```
   Title: "⚠️ Dangerous Weapon + Person - Industrial Zone B"
   Location: "East District (Feed 5)"
   Tags: ["feed-5", "Video Feed"]
   Screenshot: Shows "FEED 5" overlay + Feed 5 video content
   ```

### For Feed 6 Detection:

Same flow but with feed_id=6:
- `feed_id=6`
- `source=video`
- Screenshot shows "FEED 6"
- Location: "Airport Terminal"

### For Feed 4 Detection:

Same flow but with feed_id=4:
- `feed_id=4`
- `source=camera`
- Screenshot shows "FEED 4"
- Screenshot shows webcam content
- Location: "Residential Zone A"

---

## 🚨 Common Issues

### Issue 1: All screenshots show Feed 4

**Check:**
1. Are other feeds actually detecting?
   - Run: `curl http://localhost:5000/api/detections | jq '.detections[-5:]'`
   - Look for feed_id: 5 or 6
2. If all detections are feed_id: 4 → Only webcam is detecting (normal if not shown weapon to other feeds)
3. If detections show feed_id: 5 but screenshot is from Feed 4 → Stream lookup issue

**Debug:**
- Check backend logs during capture
- Verify stream_key matches
- Check active_streams dictionary has correct feeds

### Issue 2: Screenshot is blank or shows wrong content

**Check:**
1. Backend logs show which stream was used
2. Verify stream.feed_id matches requested feed_id
3. Check if best_detection_frame is available

**Debug:**
- If best_detection_frame is None → Detection happened but frame was reset too early
- If wrong content → Wrong stream retrieved from active_streams

### Issue 3: Feed ID overlay shows wrong number

**If screenshot shows "FEED 4" but was supposed to be from Feed 5:**

This is definitive proof of wrong stream being used!

**Fix:**
1. Check stream lookup logic in `/api/capture/`
2. Verify stream_key generation
3. Check if stream.feed_id was set correctly during VideoStream init

---

## 🛠️ Quick Fixes

### Reset Everything:

```bash
# Stop backend
Ctrl+C

# Clear any cached state
# Delete any .pyc files if needed

# Restart backend
python weapon-detection-server.py

# In browser: Hard refresh
Ctrl+Shift+R
```

### Test Specific Feed:

```python
# Test Feed 5 detection and capture
import requests

# Start feed
requests.get('http://localhost:5000/video_feed/5?source=video', stream=True)

# Wait 30 seconds for detection
import time
time.sleep(30)

# Capture screenshot
resp = requests.get('http://localhost:5000/api/capture/5?source=video')
with open('test_feed5.jpg', 'wb') as f:
    f.write(resp.content)

# Open test_feed5.jpg - should show "FEED 5" in corner
```

---

## ✅ Verification Checklist

After fixes:

- [ ] Backend shows stream creation with correct feed_ids (1-6)
- [ ] Detection events store correct feed_id
- [ ] Frontend requests correct feed_id for screenshot
- [ ] Backend receives correct feed_id in capture request
- [ ] Backend finds correct stream (e.g., 5_video for feed 5)
- [ ] Backend confirms stream.feed_id matches requested feed_id
- [ ] Screenshot overlay shows correct "FEED X" text
- [ ] Evidence thumbnail shows content from correct feed
- [ ] Evidence tags include correct "feed-X"
- [ ] No Feed 4 screenshots when detection was on Feed 5/6

---

## 🎉 Success Criteria

**When working correctly:**

1. Feed 5 detects → Evidence shows "FEED 5" overlay + Feed 5 video content
2. Feed 6 detects → Evidence shows "FEED 6" overlay + Feed 6 video content
3. Feed 4 detects → Evidence shows "FEED 4" overlay + webcam content
4. Backend logs confirm stream.feed_id matches requested feed_id
5. No screenshots from wrong feeds

**Test all three feeds and verify each screenshot is correct!**
