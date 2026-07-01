# 🧪 Weapon Detection Testing Guide

## ✅ Pre-Flight Checklist

Before testing weapon detection, ensure you have:

- [ ] Python 3.8+ installed
- [ ] Flask server dependencies installed
- [ ] `best.pt` YOLO model file in project root
- [ ] `yt-dlp` installed for YouTube support
- [ ] Dashboard running (port 5173 or 3000)
- [ ] Flask server ready to start (port 5000)

---

## 📦 Installation Steps

### **1. Install Python Dependencies**
```bash
pip install flask flask-cors ultralytics opencv-python-headless numpy yt-dlp
```

### **2. Verify Model File**
```bash
ls -la best.pt
# Should show your trained YOLO model
```

### **3. Test Your Model Classes**
```bash
python test-model-classes.py
```

**Expected Output:**
```
============================================================
YOLO Model Class Inspector
============================================================
Loading model from: best.pt

✓ Model loaded successfully!

📋 Model Classes:
------------------------------------------------------------
  Class 0: 'weapon'
  Class 1: 'person'
------------------------------------------------------------

🔍 Checking for expected classes:
------------------------------------------------------------
  ✓ WEAPON class found: Index 0 = 'weapon'
  ✓ PERSON class found: Index 1 = 'person'
------------------------------------------------------------

📊 Detection Capability:
------------------------------------------------------------
  ✓ Model can detect BOTH weapon AND person
  ✓ Weapon + Person detection will work!
------------------------------------------------------------
```

If you don't see this, your model classes might be different - update the Python code accordingly.

---

## 🚀 Starting the System

### **Step 1: Start Flask Server**
Open a terminal and run:
```bash
python weapon-detection-server.py
```

**You should see:**
```
==========================================================
CrimeShield AI - Weapon Detection Server
==========================================================
Model: best.pt
Available Feeds: [1, 2, 3, 4, 5, 6]
Detection Confidence: 0.25
==========================================================

Endpoints:
  Video Streams: http://localhost:5000/video_feed/<feed_id>
  API Docs:      http://localhost:5000/
  Health Check:  http://localhost:5000/api/health
==========================================================

Starting server...
Loading YOLO model from best.pt...
✓ Model loaded successfully!
 * Running on all addresses (0.0.0.0)
 * Running on http://127.0.0.1:5000
```

**Keep this terminal open!** Watch it for debug logs.

### **Step 2: Verify Server Health**
Open a new terminal or browser and check:
```bash
curl http://localhost:5000/api/health
```

**Expected Response:**
```json
{
  "status": "running",
  "model_loaded": true,
  "active_streams": 0,
  "total_detections": 0
}
```

### **Step 3: Open Dashboard**
Navigate to your dashboard (usually `http://localhost:5173` or `http://localhost:3000`)

---

## 🎬 Testing Weapon Detection on Camera ID 6

Camera ID 6 is configured to use the YouTube video with a person holding a gun.

### **Step 1: Enable Weapon Detection**

1. Scroll to **"Live CCTV Monitoring"** section
2. Look for server status indicator - should show **"Server Online"** with green dot
3. Click the **"Enable Weapon Detection"** button
   - Button should turn RED
   - Should say **"Weapon Detection ON"**
4. Toast notification: **"Weapon Detection Enabled"**

### **Step 2: Ensure Video Feed Source is Selected**

1. Make sure **"Video Feed"** is selected (not "Live Camera")
   - Video Feed = uses YouTube videos
   - Live Camera = uses your webcam

### **Step 3: Wait for Detection Stream to Start**

1. Find **Camera ID 6** (Airport Terminal)
2. Watch the feed - it should now show the Flask server stream with YOLO overlay
3. Look for **"AI SCAN"** badge on the video

### **Step 4: Watch for Detections**

**In the Terminal** (Flask server), you should start seeing:

```
📺 Extracting YouTube stream URL for feed 6...
✓ YouTube stream URL extracted for feed 6
✓ Feed 6 started successfully (Video Feed)

🔍 DEBUG Feed 6: Model classes = {0: 'weapon', 1: 'person'}

📊 Feed 6 Frame 50: Detected ['person'], has_weapon=False, has_person=True
📊 Feed 6 Frame 52: Detected ['person'], has_weapon=False, has_person=True
📊 Feed 6 Frame 54: Detected ['person'], has_weapon=False, has_person=True

🔫 DEBUG Feed 6: WEAPON detected! Class=weapon, Index=0, Conf=0.78
📊 Feed 6 Frame 56: Detected ['weapon'], has_weapon=True, has_person=False

🔫 DEBUG Feed 6: WEAPON detected! Class=weapon, Index=0, Conf=0.82
👤 DEBUG Feed 6: PERSON detected! Class=person, Index=1, Conf=0.91
📊 Feed 6 Frame 58: Detected ['weapon', 'person'], has_weapon=True, has_person=True
⚠️⚠️⚠️ WEAPON + PERSON DETECTED on feed 6! Frame: 58, Confidence: 0.91
```

**In the Dashboard**, you should see:

1. **🚨 RED ALERT BANNER** at top of feed section:
   - "WEAPON DETECTED!"
   - "📸 Screenshot Captured"
   - Feed name and timestamp
   - Detection confidence percentages

2. **🔊 ALARM SOUND** plays (siren sound)

3. **🔔 TOAST NOTIFICATIONS:**
   - Red toast: "⚠️ WEAPON + PERSON DETECTED!" with feed name and confidence
   - Green toast: "📸 Screenshot Captured - Evidence saved to Evidence Section"

4. **📊 DETECTION COUNT BADGE** on Camera ID 6:
   - Red pulsing badge
   - "⚠ 1 WEAPON+PERSON DETECTIONS"
   - Increments with each new detection

5. **📸 EVIDENCE SECTION:**
   - Click "Evidence Section" in navigation
   - New item should appear at top
   - Title: "Weapon + Person Detection - Airport Terminal"
   - Tags: weapon, person, high-priority, auto-captured
   - Click thumbnail to see full detection details

---

## 🔍 What to Look For in Video Feed

The YOLO detection overlay should show:

1. **Bounding Boxes:**
   - Green/blue box around person
   - Red/yellow box around weapon (gun)

2. **Class Labels:**
   - "person 0.91" (class name + confidence)
   - "weapon 0.82"

3. **Tracking IDs:**
   - May show tracking numbers if objects are being tracked

---

## 🐛 Troubleshooting

### **Problem: Server shows "Offline"**

**Solutions:**
1. Check Flask server is running: `ps aux | grep python`
2. Check port 5000 is not blocked
3. Try accessing: http://localhost:5000/api/health
4. Check firewall/antivirus

### **Problem: Video feed not loading**

**Solutions:**
1. Check terminal for YouTube extraction errors
2. Try different video ID
3. Verify yt-dlp is installed: `pip install --upgrade yt-dlp`
4. Check internet connection

### **Problem: Detections not appearing**

**Solutions:**

1. **Check Confidence Threshold**
   - In `weapon-detection-server.py` line 35
   - Try lowering to 0.15 or 0.20
   
2. **Check Model Classes**
   - Run: `python test-model-classes.py`
   - Verify classes are 'weapon' and 'person'
   
3. **Check Detection Logic**
   - Look at terminal output
   - Are detections happening but not meeting the person+weapon requirement?
   - You should see: `📊 Feed 6 Frame X: Detected [...]`

4. **Check Class Indices**
   - In terminal, look for: `🔍 DEBUG Feed 6: Model classes = {...}`
   - If weapon is not class 0, update line 197 in Python code
   - If person is not class 1, update line 202 in Python code

### **Problem: Alarm not playing**

**Solutions:**
1. Check browser console for errors (F12)
2. Check browser audio permissions
3. Unmute browser tab
4. Try test alarm button in header
5. Check system volume

### **Problem: Screenshot not captured**

**Solutions:**
1. Check terminal for capture errors
2. Verify `/api/capture/<feed_id>` endpoint is working
3. Check browser console for network errors

### **Problem: "has_weapon=True, has_person=True but no alert"**

**Solutions:**
1. Check frontend is polling `/api/detections/latest`
2. Open browser DevTools → Network tab
3. Look for requests to `http://localhost:5000/api/detections/latest`
4. Check response contains `has_weapon: true` and `has_person: true`

---

## 📊 Performance Metrics

### **Expected Response Times:**
- Detection check interval: 3 seconds
- Frame processing: 30 FPS
- Screenshot capture: < 1 second
- Alarm trigger: Immediate

### **Expected Detection Rate:**
For Camera ID 6 (person with gun):
- Should detect person: **90%+ of frames**
- Should detect weapon: **70%+ when visible**
- Should detect both together: **Every 3-10 seconds** when both in frame

---

## 🎯 Testing Checklist

Use this checklist to verify full functionality:

### **Backend Tests:**
- [ ] Flask server starts without errors
- [ ] Model loads successfully
- [ ] Health endpoint returns status
- [ ] Model classes are correct (weapon=0, person=1)
- [ ] YouTube stream extracts successfully
- [ ] Video feed starts for Camera 6
- [ ] Detections appear in terminal
- [ ] Both weapon AND person detected together
- [ ] Screenshot capture works

### **Frontend Tests:**
- [ ] Server status shows "Online"
- [ ] Enable weapon detection button works
- [ ] Video feed switches to Flask stream
- [ ] "AI SCAN" badge appears
- [ ] Detection alert banner appears
- [ ] Alarm sound plays
- [ ] Toast notifications show
- [ ] Detection count increments
- [ ] Screenshot saves to Evidence Section
- [ ] Evidence item is clickable
- [ ] Detection details are visible

### **Integration Tests:**
- [ ] Detection triggers within 30 seconds
- [ ] Multiple detections work
- [ ] System continues monitoring after detection
- [ ] All 6 cameras can use detection
- [ ] Switching between feeds works
- [ ] Disabling detection stops monitoring

---

## 💡 Tips for Best Results

1. **Let it Run:** Give the system 30-60 seconds to warm up after enabling detection
2. **Watch Terminal:** The debug output tells you exactly what's happening
3. **Check Network:** Make sure localhost:5000 is accessible from browser
4. **Video Quality:** Higher quality YouTube videos = better detection
5. **Lighting:** Better lit scenes = more accurate detection

---

## 📝 Expected Workflow

```
1. User enables weapon detection
   ↓
2. Frontend polls Flask API every 3 seconds
   ↓
3. Flask processes video frames with YOLO
   ↓
4. When person + weapon detected together:
   ↓
5. Flask stores detection event
   ↓
6. Frontend fetches latest detection
   ↓
7. Frontend triggers alarm + screenshot
   ↓
8. Screenshot sent to Evidence Section
   ↓
9. User notified via toast + alert banner
   ↓
10. Monitoring continues
```

---

## 🎉 Success Criteria

You'll know everything is working when:

✅ Terminal shows: `⚠️⚠️⚠️ WEAPON + PERSON DETECTED on feed 6!`  
✅ Dashboard shows red alert banner  
✅ Alarm sound plays  
✅ Toast notifications appear  
✅ Detection count badge shows on camera  
✅ Screenshot appears in Evidence Section  
✅ Evidence item shows detection details

---

## 📞 Still Having Issues?

If detection still doesn't work after following this guide:

1. **Capture Terminal Output:** Copy last 50 lines from Flask server terminal
2. **Check Browser Console:** Press F12 → Console, copy any errors
3. **Run Model Test:** `python test-model-classes.py` and share output
4. **Share Details:** What frame numbers show in terminal? What classes detected?

Most common issue: **Class indices don't match** (weapon not class 0, person not class 1)

Solution: Update lines 197 and 202 in `weapon-detection-server.py` with correct class indices from your model.

---

**Good luck testing! 🚀**
