# 🚀 Quick Test Guide - Dangerous Weapon Detection

## ⚡ Quick Start (3 Steps)

### Step 1: Verify Your Model Classes
```bash
python verify-model-classes.py
```

**Expected output:**
```
✅ Class 0 (Person): FOUND - 'person'
✅ Class 1 (Dangerous Weapon): FOUND - 'dangerous_weapon'
🎉 SUCCESS! Your model has the correct classes for detection.
```

### Step 2: Start Flask Detection Server
```bash
python weapon-detection-server.py
```

**Look for:**
```
✓ Model loaded successfully!
Available Feeds: [1, 2, 3, 4, 5, 6]
Starting server...
```

### Step 3: Enable Detection in Dashboard
1. Open CrimeShield Dashboard
2. Go to "Live CCTV Monitoring" section
3. Click **"Enable Weapon Detection"** button
4. You should see: "AI is now monitoring all feeds (both camera and video) in background"

## 🔍 What to Watch For

### In Flask Server Console:

**When detecting objects (but not both):**
```
📊 Feed 1 Frame 100: Detected ['person'], has_dangerous_weapon=False, has_person=True
👤 DEBUG Feed 1: PERSON detected! Class=person, Index=0, Conf=0.92
```

**When detecting BOTH person AND dangerous weapon:**
```
📊 Feed 3 Frame 250: Detected ['person', 'dangerous_weapon'], has_dangerous_weapon=True, has_person=True
👤 DEBUG Feed 3: PERSON detected! Class=person, Index=0, Conf=0.89
🔫 DEBUG Feed 3: DANGEROUS WEAPON detected! Class=dangerous_weapon, Index=1, Conf=0.87
⚠️⚠️⚠️ DANGEROUS WEAPON + PERSON DETECTED on feed 3! Frame: 250, Confidence: 0.89
```

### In Dashboard:

**Alert Banner:**
```
⚠️ DANGEROUS WEAPON + PERSON DETECTED!
📸 Screenshot Captured
Shopping Mall Entrance - 14:23:45
→ Evidence Section Updated
```

**Toast Notification:**
```
⚠️ DANGEROUS WEAPON + PERSON DETECTED!
Shopping Mall Entrance - Confidence: 89%
```

**Evidence Section:**
- New item appears automatically
- Title: "Dangerous Weapon + Person Detection - [Feed Name]"
- Tags: dangerous-weapon, person, high-priority, auto-captured

## ❓ Troubleshooting

### Problem: "No detections happening"

**Check 1: Is the server processing frames?**
```bash
# In Flask console, you should see periodic logs like:
📊 Feed 1 Frame 100: Detected [...], has_dangerous_weapon=..., has_person=...
```

If you see these logs → Server is working ✅

**Check 2: What is being detected?**
```bash
# Look at the detected classes:
📊 Feed 1 Frame 100: Detected ['car', 'traffic light'], ...
```

If you see classes but not 'person' or 'dangerous_weapon':
- Your model may not be detecting them in the current video
- Try different YouTube feeds or use your own video with people and weapons

**Check 3: Are streams starting?**
```bash
# You should see these when you enable detection:
✓ Feed 1 started successfully (Video Feed)
✓ Feed 1 started successfully (Camera)
✓ Feed 2 started successfully (Video Feed)
✓ Feed 2 started successfully (Camera)
...
```

### Problem: "Detection works but no screenshot captured"

**This is expected!** Screenshots are ONLY captured when:
- ✅ Person detected (Class 0) AND
- ✅ Dangerous weapon detected (Class 1)
- ✅ BOTH in the SAME frame

If you only see person OR weapon (not both together), no screenshot is taken.

### Problem: "Server says offline"

1. Make sure Flask server is running (Step 2)
2. Check server is on http://localhost:5000
3. Test manually: Open browser → http://localhost:5000/api/health

Should show:
```json
{
  "status": "running",
  "model_loaded": true,
  "active_streams": 12,
  "total_detections": 0
}
```

## 🎯 Understanding Detection Behavior

### Detection Sources (12 Streams Total):

When you enable weapon detection, the system starts:

| Feed | Video Source | Camera Source |
|------|-------------|---------------|
| 1 | YouTube Stream | Webcam/IP Cam |
| 2 | YouTube Stream | Webcam/IP Cam |
| 3 | YouTube Stream | Webcam/IP Cam |
| 4 | YouTube Stream | Webcam/IP Cam |
| 5 | YouTube Stream | Webcam/IP Cam |
| 6 | YouTube Stream | Webcam/IP Cam |

**Total: 6 feeds × 2 sources = 12 concurrent detection streams**

### Why Both Sources?

- **Video Source**: Analyzes the YouTube/RTSP stream
- **Camera Source**: Analyzes direct camera feed (if available)

This ensures detection works whether you're using:
- Live YouTube streams ✅
- Local video files ✅
- RTSP camera streams ✅
- Webcam/IP cameras ✅

## 📊 Expected Performance

### Detection Latency:
- Frame processing: ~15-30ms per frame
- Detection interval: Every 3 seconds
- Alert delay: < 1 second after detection

### Resource Usage:
- CPU: Medium (YOLO model inference)
- RAM: ~2-4GB (model + 12 streams)
- Network: Depends on video quality

### Accuracy:
- Model accuracy: Depends on your training
- Person detection: Usually high (>90%)
- Weapon detection: Depends on training data quality

## 🔧 Manual API Testing

### Get Server Health:
```bash
curl http://localhost:5000/api/health
```

### Get All Feeds Status:
```bash
curl http://localhost:5000/api/feeds
```

### Get Recent Detections:
```bash
curl http://localhost:5000/api/detections
```

### Get Latest Detection:
```bash
curl http://localhost:5000/api/detections/latest
```

### View Detection Stream (in browser):
```
http://localhost:5000/video_feed/1?source=video
http://localhost:5000/video_feed/1?source=camera
```

## ✅ Success Checklist

- [ ] Model verification shows both classes (person + dangerous_weapon)
- [ ] Flask server starts without errors
- [ ] Dashboard shows "Server Online" status
- [ ] Enabling detection shows success toast
- [ ] Flask console shows frame processing logs
- [ ] Person detections appear in logs
- [ ] Weapon detections appear in logs (when present)
- [ ] Alert triggers when BOTH detected
- [ ] Screenshot appears in Evidence Section
- [ ] Continuous monitoring works (doesn't stop after first detection)

## 🎉 You're All Set!

If you've completed all checklist items, your dangerous weapon detection system is working correctly!

The system will now:
- ✅ Monitor all 6 feeds continuously
- ✅ Detect both camera and video sources
- ✅ Recognize "person" (Class 0) and "dangerous_weapon" (Class 1)
- ✅ Trigger alerts only when BOTH detected together
- ✅ Auto-capture screenshots to Evidence Section
- ✅ Keep monitoring (never stop after detection)
- ✅ Update statistics in real-time

Happy monitoring! 🚨🔫👤
