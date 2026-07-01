# 🚀 Quick Start - Weapon Detection System

## ⚡ 3-Minute Setup

### Step 1: Verify Model (30 seconds)
```bash
# Check if best.pt exists in project root
ls -lh best.pt

# Should show: -rw-r--r-- 1 user user 6.2M Nov 10 12:00 best.pt
```

❌ **If missing:** Place your `best.pt` YOLO model in the project root directory.

### Step 2: Install Dependencies (1 minute)
```bash
pip install flask flask-cors ultralytics opencv-python-headless numpy yt-dlp
```

### Step 3: Start Server (30 seconds)
```bash
python weapon-detection-server.py
```

✅ **Look for these messages:**
```
✅ Model loaded successfully!
   Class 0: person -> person
     ✓ Identified as PERSON class
   Class 1: dangerous_weapon -> dangerous weapon
     ✓ Identified as WEAPON class
✅ Feed 4 started successfully (Webcam)
```

### Step 4: Test in Dashboard (1 minute)
1. Open dashboard → Login as organization
2. Navigate to **Live CCTV** section  
3. Find **Feed 4 (Residential Zone A)**
4. Toggle **"Enable Weapon Detection"** switch
5. Should see: Badge changes to **"AI DETECTION ACTIVE"** (red)

---

## 🎯 Quick Test

### Option A: Use Test Video (Easiest)
1. Look at **Feed 5 (Industrial Zone B)** or **Feed 6 (Airport Terminal)**
2. These have pre-recorded videos with weapons
3. Enable detection and watch for alerts

### Option B: Use Your Webcam (Feed 4)
1. Enable detection on Feed 4
2. Show a toy weapon or knife to the camera
3. Move it close to your body
4. Wait 30 seconds
5. Alert should appear!

---

## ✅ How to Know It's Working

### ✅ Server Console Should Show:
```
✅ Feed 4 started successfully (Webcam)
🔄 Worker started for feed 4
🎯 Feed 4: New best detection - weapon_conf=0.723, association=0.891
⚠️  ALERT: Feed 4 - Weapon detected with conf=0.723, association=0.891
```

### ✅ Browser Should Show:
- Badge: **"AI DETECTION ACTIVE"** (red, top-left of feed)
- Green boxes around detected persons and objects
- **RED boxes** around weapons near persons
- **"DANGER!"** label on dangerous detections
- After 30s: Alert notification appears

### ✅ Dashboard Should Show:
- Alert count increases in Live CCTV section
- New entry in Evidence section with screenshot
- Location: "Residential Zone A"
- Alarm sounds (if enabled)

---

## 🐛 Common Issues

### ❌ "Webcam goes black when server starts"
**Cause:** Both browser and server trying to access webcam simultaneously

**Fix:** This is now handled automatically:
1. When detection is OFF → Browser uses webcam
2. When detection is ON → Browser releases → Server uses → Streams back to browser

**If still happening:**
- Disable detection in dashboard
- Close all other apps using webcam (Zoom, Teams, etc.)
- Refresh browser
- Re-enable detection after server is fully started

### ❌ "No detections appearing"
**Possible causes:**

1. **Model not loaded**
   ```bash
   # Check Flask logs for:
   ❌ Error loading model: [Errno 2] No such file or directory: 'best.pt'
   
   # Fix: Place best.pt in project root
   ```

2. **Wrong classes detected**
   ```bash
   # Check Flask logs for:
   ⚠ Warning: Could not infer PERSON_IDS/WEAPON_IDS
   
   # Verify model has correct classes:
   python -c "from ultralytics import YOLO; m=YOLO('best.pt'); print(m.names)"
   # Should output: {0: 'person', 1: 'dangerous_weapon'}
   ```

3. **Weapon too small or far from person**
   - Move weapon closer to your body
   - Ensure good lighting
   - Weapon must be at least 0.1% of frame size

4. **Confidence too low**
   - Check server logs for detection confidence
   - If seeing boxes but no alerts, weapon conf may be below threshold (0.55)

### ❌ "Detection stream not loading"
**Cause:** Flask server not running or connection issue

**Fix:**
```bash
# Test server is running:
curl http://localhost:5000/api/health

# Should return:
{"status": "running", "model_loaded": true, ...}

# If not, restart server:
python weapon-detection-server.py
```

**Browser will automatically fall back to webcam** if server is unavailable.

### ❌ "Too many false positives"
**Fix:** Increase weapon confidence threshold

Edit `weapon-detection-server.py`:
```python
WEAPON_CONF = 0.70  # Increase from 0.55 to 0.70
```

Restart server and test again.

---

## 📊 Quick Health Check

### Run this command:
```bash
curl http://localhost:5000/api/health
```

### Expected output:
```json
{
  "status": "running",
  "model_loaded": true,
  "active_streams": 6,
  "total_detections": 3,
  "alert_interval_sec": 30,
  "cooldown_sec": 30
}
```

### Verify each field:
- ✅ `status: "running"` → Server is active
- ✅ `model_loaded: true` → YOLO model loaded successfully  
- ✅ `active_streams: 6` → All 6 feeds initialized
- ✅ `total_detections: 3` → 3 alerts emitted so far

---

## 🎬 Quick Test Script

Copy and run this to test all functionality:

```bash
#!/bin/bash

echo "🔍 CrimeShield Weapon Detection - Quick Test"
echo "=============================================="

# Check model
echo "1. Checking model file..."
if [ -f "best.pt" ]; then
    echo "   ✅ best.pt found"
else
    echo "   ❌ best.pt NOT found - Place it in project root!"
    exit 1
fi

# Check server
echo "2. Checking Flask server..."
if curl -s http://localhost:5000/api/health > /dev/null; then
    echo "   ✅ Server is running"
else
    echo "   ❌ Server is NOT running - Start with: python weapon-detection-server.py"
    exit 1
fi

# Check feeds
echo "3. Checking active feeds..."
FEEDS=$(curl -s http://localhost:5000/api/feeds | jq '.feeds | length')
echo "   ✅ $FEEDS feeds active"

# Check detections
echo "4. Checking detections..."
DETECTIONS=$(curl -s http://localhost:5000/api/detections | jq '.detections | length')
echo "   📊 $DETECTIONS detections recorded"

# Test video stream
echo "5. Testing video stream..."
if curl -s --max-time 3 http://localhost:5000/video_feed/4?source=camera > /dev/null; then
    echo "   ✅ Video stream working"
else
    echo "   ⚠️  Video stream timeout (may be normal if webcam not ready)"
fi

echo ""
echo "=============================================="
echo "✅ All checks complete!"
echo ""
echo "Next steps:"
echo "  1. Open dashboard at http://localhost:5173 (or your port)"
echo "  2. Login as organization user"
echo "  3. Go to Live CCTV section"
echo "  4. Enable weapon detection"
echo "  5. Test with Feed 4 (webcam) or Feed 5/6 (test videos)"
echo "=============================================="
```

Save as `test-weapon-detection.sh`, make executable, and run:
```bash
chmod +x test-weapon-detection.sh
./test-weapon-detection.sh
```

---

## 🎯 Performance Optimization

### If detection is too slow:

1. **Reduce resolution** (edit `weapon-detection-server.py`):
   ```python
   # In VideoStream.start() method
   self.cap.set(cv2.CAP_PROP_FRAME_WIDTH, 640)   # Was 1280
   self.cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)  # Was 720
   ```

2. **Skip more frames** (edit `weapon-detection-server.py`):
   ```python
   FRAME_SKIP = 3  # Was 2 - process every 3rd frame instead of every 2nd
   ```

3. **Use GPU** (if available):
   ```bash
   # Install CUDA-enabled PyTorch
   pip install torch torchvision --index-url https://download.pytorch.org/whl/cu118
   ```

### If getting too many alerts:

1. **Increase cooldown** (edit `weapon-detection-server.py`):
   ```python
   COOLDOWN_SEC = 60  # Was 30 - emit alert max once per minute
   ```

2. **Increase alert interval** (edit `weapon-detection-server.py`):
   ```python
   ALERT_INTERVAL_SEC = 45  # Was 30 - wait 45s before checking window
   ```

---

## 📸 Evidence Screenshot Guide

When a detection triggers:
- Screenshot is **automatically captured** from the feed where weapon was detected
- Stored in Supabase `evidence` table
- Includes:
  - Feed ID
  - Timestamp
  - Location name
  - Image with YOLO annotations (bounding boxes)
  - Weapon confidence score
  - Association score

To view screenshots:
1. Dashboard → **Evidence** section
2. Filter by date/location
3. Click thumbnail to view full image

---

## 🔧 Advanced Configuration

### Adjust Detection Thresholds

Edit `weapon-detection-server.py`:

```python
# Confidence thresholds
PERSON_CONF = 0.40    # 0.0 - 1.0 (lower = more detections)
WEAPON_CONF = 0.55    # 0.0 - 1.0 (higher = fewer false positives)

# Spatial association
MIN_IOU = 0.05        # 0.0 - 1.0 (lower = more lenient association)

# Proximity threshold (as % of person height)
threshold_distance = person_height * 0.3  # 0.3 = 30%

# Minimum weapon size (as % of frame area)
MIN_REL_AREA_WEAPON = 0.001  # 0.001 = 0.1%
```

### Change Alert Timing

```python
ALERT_INTERVAL_SEC = 30  # Seconds to accumulate best detection
COOLDOWN_SEC = 30        # Seconds between alerts per feed
```

---

## 🎓 Understanding the Logs

### Good Logs:
```
✅ Feed 4 started successfully (Webcam)
🔄 Worker started for feed 4
🎯 Feed 4: New best detection - weapon_conf=0.723, association=0.891
⚠️  ALERT: Feed 4 - Weapon detected with conf=0.723, association=0.891
```

### Problem Logs:
```
❌ Could not open video source for feed 4
→ Fix: Webcam in use by another app or not connected

⚠️  Failed to read frame from feed 4
→ Fix: Camera disconnected or stream ended

❌ Detection error on feed 4: module 'cv2' has no attribute 'imencode'
→ Fix: Reinstall opencv: pip install --force-reinstall opencv-python-headless
```

---

## 📞 Getting Help

If something's not working:

1. **Check Flask logs** - Most issues show up here
2. **Check browser console** (F12) - Look for network errors
3. **Test API directly**: 
   ```bash
   curl http://localhost:5000/api/health
   curl http://localhost:5000/api/feeds
   ```
4. **Review the comprehensive guide**: `WEBCAM-AND-DETECTION-COMPLETE-FIX.md`
5. **Check flow diagram**: `WEBCAM-DETECTION-FLOW-DIAGRAM.md`

---

## ✅ Success Checklist

Before reporting issues, verify:

- [ ] `best.pt` exists in project root
- [ ] Flask server is running (port 5000)
- [ ] Server logs show "Model loaded successfully"
- [ ] Server logs show "Feed 4 started successfully (Webcam)"
- [ ] Dashboard shows "AI DETECTION ACTIVE" badge
- [ ] Can see YOLO bounding boxes on video
- [ ] No other app is using webcam
- [ ] Camera permissions allowed in browser

---

**You're all set! The system is now monitoring for weapons 24/7.** 🎉
