# 🎯 Webcam & Weapon Detection - Complete Fix

## ✅ What Was Fixed

### 1. **Webcam Access Conflict Resolved**
**Problem:** Browser and Flask server cannot both access webcam simultaneously
**Solution:** 
- When detection is OFF: Browser directly accesses webcam via `getUserMedia()`
- When detection is ON: Browser releases webcam → Flask server acquires it → Streams back to browser
- Automatic fallback: If Flask server fails, browser shows webcam directly

### 2. **Improved Detection Logic**
**Problem:** Weapon detection was not reliable
**Solution:**
- Enhanced spatial association using 3 methods:
  - IoU (Intersection over Union) overlap
  - Weapon center inside person bounding box
  - Proximity detection (weapon within 30% of person height)
- Better size filtering to ignore tiny false positives
- More robust confidence thresholds (Person: 0.40, Weapon: 0.55)

### 3. **Better Error Handling**
- Graceful camera access/release
- Automatic retry on stream failures
- Clear error messages and fallback options
- Improved logging for debugging

## 🚀 How to Use

### Step 1: Ensure Model is Present
```bash
# Make sure best.pt is in your project root
ls best.pt
```

### Step 2: Start Flask Detection Server
```bash
# Install dependencies (if not already installed)
pip install flask flask-cors ultralytics opencv-python-headless numpy yt-dlp

# Start the server
python weapon-detection-server.py
```

**Expected Output:**
```
======================================================================
      CrimeShield AI - Weapon Detection Server
======================================================================
📦 Model: best.pt
🔄 Loading YOLO model...
✅ Model loaded successfully!
   Model classes: {0: 'person', 1: 'dangerous_weapon'}
   Class 0: person -> person
     ✓ Identified as PERSON class
   Class 1: dangerous_weapon -> dangerous weapon
     ✓ Identified as WEAPON class
📊 Detection Configuration:
   Person IDs: [0]
   Weapon IDs: [1]
   Person Confidence: 0.4
   Weapon Confidence: 0.55
📹 Available Feeds: [1, 2, 3, 4, 5, 6]
======================================================================
🚀 Starting server and background monitoring...

✅ Feed 1 started successfully (Video Stream)
✅ Monitoring thread started for feed 1
✅ Feed 4 started successfully (Webcam)
✅ Monitoring thread started for feed 4
...
```

### Step 3: Open Dashboard
1. Navigate to your CrimeShield dashboard
2. Login as an organization user
3. Go to "Live CCTV" section
4. You should see Feed 4 (Residential Zone A) showing live webcam

### Step 4: Enable Weapon Detection
1. Toggle the **"Enable Weapon Detection"** switch
2. Wait 2-3 seconds for connection
3. You should see:
   - Feed indicator changes to "AI DETECTION ACTIVE" (red badge)
   - YOLO detection boxes appear on video
   - Browser webcam is released, Flask server takes over

### Step 5: Test Detection
1. Show a weapon to Feed 4 (or use Feed 5/6 which have test videos)
2. Server will analyze every other frame
3. When person + weapon detected together:
   - Red box appears around weapon
   - "DANGER!" label displayed
   - After 30 seconds, alert is sent to Supabase
   - Evidence screenshot captured automatically

## 🔍 How It Works

### Detection Flow
```
Browser Webcam → Flask Server → YOLO Model → Detection Logic → Alert System
                                    ↓
                             Person Detection (Class 0)
                             Weapon Detection (Class 1)
                                    ↓
                          Spatial Association Check
                                    ↓
                    Person + Weapon Together? → YES
                                    ↓
                            Wait 30 seconds
                                    ↓
                      Emit Alert with Screenshot
                                    ↓
                         Send to Supabase Backend
```

### Webcam Access Logic
```
Detection OFF:
  Browser → getUserMedia() → <video> element → User sees webcam

Detection ON (Server Running):
  Browser releases webcam
     ↓
  Flask opens webcam with cv2.VideoCapture(0)
     ↓
  YOLO processes frames
     ↓
  Flask streams MJPEG with annotations
     ↓
  Browser <img> element shows annotated stream

Detection ON (Server Offline):
  Browser releases webcam
     ↓
  Try to load Flask stream
     ↓
  Stream fails after 1 second
     ↓
  Fallback: Browser re-acquires webcam
     ↓
  Show "LIVE WEBCAM (FALLBACK)" indicator
```

## 🎯 Detection Parameters

| Parameter | Value | Purpose |
|-----------|-------|---------|
| **Person Confidence** | 0.40 | Threshold for detecting persons |
| **Weapon Confidence** | 0.55 | Threshold for detecting weapons |
| **Min IoU** | 0.05 | Minimum overlap for association |
| **Proximity Threshold** | 30% of person height | Max distance for association |
| **Min Weapon Size** | 0.1% of frame | Filter out tiny detections |
| **Alert Interval** | 30 seconds | Time between alerts per feed |
| **Frame Skip** | 2 | Process every 2nd frame |

## 🐛 Troubleshooting

### Issue: Webcam goes black when server starts
**Cause:** Browser is holding webcam, server can't access it
**Solution:** 
- Make sure to enable detection AFTER server is fully started
- Check browser console for "Camera track stopped" message
- Verify Flask logs show "Feed 4 started successfully (Webcam)"

### Issue: No detections even with weapon visible
**Possible Causes:**
1. **Model not loaded** → Check Flask startup logs for "Model loaded successfully"
2. **Wrong classes** → Verify Person IDs: [0], Weapon IDs: [1]
3. **Low confidence** → Weapon might be too small or unclear
4. **No spatial association** → Weapon must be near/held by person

**Debug Steps:**
```bash
# Check model classes
python -c "from ultralytics import YOLO; model = YOLO('best.pt'); print(model.names)"

# Should output: {0: 'person', 1: 'dangerous_weapon'}
```

### Issue: Detection stream not loading
**Cause:** Flask server not running or CORS issue
**Solution:**
```bash
# Check if server is running
curl http://localhost:5000/api/health

# Should return: {"status": "running", "model_loaded": true, ...}

# If not, restart server:
python weapon-detection-server.py
```

### Issue: False positives (detecting when no weapon)
**Solution:** Increase weapon confidence threshold in `weapon-detection-server.py`:
```python
WEAPON_CONF = 0.65  # Increase from 0.55 to reduce false positives
```

## 📊 Monitoring

### Check Server Status
```bash
curl http://localhost:5000/api/health
```

### Check Active Feeds
```bash
curl http://localhost:5000/api/feeds
```

### Check Recent Detections
```bash
curl http://localhost:5000/api/detections
```

### View Detection Stream
Open in browser:
```
http://localhost:5000/video_feed/4?source=camera
```

## ⚡ Performance Tips

1. **Adjust Frame Skip** - Increase `FRAME_SKIP` to process fewer frames (better performance, less detection frequency)
2. **Lower Resolution** - Set camera to 640x480 instead of 1280x720
3. **Close Other Apps** - Make sure no other apps are using the webcam
4. **GPU Acceleration** - Install CUDA for faster YOLO inference

## 🎬 Test Videos

The system includes test videos with weapons:
- **Feed 5**: Industrial Zone B - Short weapon detection clip
- **Feed 6**: Airport Terminal - Longer video with weapons

Use these to test detection without needing physical props!

## ✅ Success Indicators

You know it's working when you see:
1. ✅ Flask server shows "Feed 4 started successfully (Webcam)"
2. ✅ Browser shows "AI DETECTION ACTIVE" badge
3. ✅ YOLO bounding boxes appear on video
4. ✅ Console shows "🎯 Feed 4: New best detection - weapon_conf=0.XXX"
5. ✅ After 30s: "⚠️ ALERT: Feed 4 - Weapon detected"
6. ✅ Alert appears in dashboard with screenshot

## 📝 Next Steps

- Test with different lighting conditions
- Adjust confidence thresholds based on your needs
- Add more camera feeds if needed
- Integrate with alarm system for immediate alerts
- Train model with more weapon types for better accuracy
