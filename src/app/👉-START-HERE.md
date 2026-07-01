# 👉 START HERE - Weapon Detection System

## 🎯 You're in the Right Place!

This guide will get your **CrimeShield AI Weapon Detection System** up and running in **less than 5 minutes**.

---

## ⚡ Quick Setup (3 Steps)

### Step 1: Place Your Model File (30 seconds)
```bash
# Your YOLO model file must be named "best.pt" and placed in the project root
# Check if it exists:
ls best.pt

# If you see the file, you're good! ✅
# If not, place your best.pt file here before continuing
```

### Step 2: Start the Detection Server (30 seconds)
```bash
# Install dependencies (first time only):
pip install flask flask-cors ultralytics opencv-python-headless numpy yt-dlp

# Start the server:
python weapon-detection-server.py

# Look for these messages:
# ✅ Model loaded successfully!
# ✅ Feed 4 started successfully (Webcam)
# If you see these, continue to Step 3!
```

### Step 3: Enable Detection in Dashboard (1 minute)
1. Open your dashboard (usually http://localhost:5173)
2. **Login as organization user** (citizens cannot access weapon detection)
3. Navigate to **"Live CCTV"** section
4. Find **Feed 4 (Residential Zone A)**
5. Toggle the **"Enable Weapon Detection"** switch
6. You should see the badge change to **"AI DETECTION ACTIVE" (red)**

**Done! Your system is now monitoring for weapons.** 🎉

---

## ✅ How to Know It's Working

### You should see:

#### In Flask Console:
```
✅ Model loaded successfully!
✅ Feed 4 started successfully (Webcam)
🔄 Worker started for feed 4
```

#### In Dashboard:
- 🔴 **"AI DETECTION ACTIVE"** badge on Feed 4
- 🟢 Green bounding boxes around detected objects
- 🔴 Red boxes around weapons near persons
- 📹 Live video feed (not black screen)

#### When Weapon Detected:
- Red boxes appear around weapon
- "DANGER!" label appears
- After 30 seconds: Alert notification
- Screenshot captured automatically
- Alert appears in Evidence section

---

## 🎬 Quick Test

### Option A: Test with Your Webcam (Feed 4)
1. Enable weapon detection
2. Show a toy weapon or knife to the camera
3. Hold it close to your body (weapon must be near person)
4. Wait 30 seconds
5. Alert should appear! 🚨

### Option B: Test with Pre-recorded Videos (Easier!)
1. Enable weapon detection
2. Look at **Feed 5 (Industrial Zone B)** or **Feed 6 (Airport Terminal)**
3. These feeds have videos with weapons already
4. Alerts should appear automatically
5. No need to have physical props!

---

## 🐛 Something Not Working?

### Issue: "Webcam goes black when I enable detection"
**This is now fixed!** If you still see this:
- Make sure no other app is using your webcam (close Zoom, Teams, etc.)
- Refresh your browser
- Try disabling and re-enabling detection

### Issue: "No green/red boxes appearing on video"
**Check Flask console:**
- Do you see "Model loaded successfully"? 
  - If NO → Place `best.pt` in project root
  - If YES → Continue to next check

### Issue: "Boxes appear but no alerts"
**This is normal!** Alerts only trigger when:
- ✅ Person detected (green box around person)
- ✅ Weapon detected (green box around weapon)
- ✅ Weapon is NEAR the person (they must be close/touching)
- ✅ 30 seconds have passed

Try holding the weapon closer to your body!

### Issue: "Detection stream not loading"
**Check if Flask server is running:**
```bash
curl http://localhost:5000/api/health
```
If this fails, restart the Flask server:
```bash
python weapon-detection-server.py
```

---

## 📚 Want to Learn More?

### For Quick Reference:
**[⚡ Quick Reference Card](./⚡-QUICK-REFERENCE-CARD.md)** - Print this! Has all commands and quick fixes.

### For Detailed Setup:
**[🚀 Quick Start Guide](./🚀-QUICK-START-WEAPON-DETECTION.md)** - Comprehensive setup instructions with troubleshooting.

### To Understand What Changed:
**[🎯 What Got Fixed](./🎯-WHAT-GOT-FIXED.md)** - Before/after comparison with visual diagrams.

### For Complete Documentation:
**[📚 Documentation Index](./📚-DOCUMENTATION-INDEX.md)** - All documentation organized by topic.

### To Test Your System:
Run this automated test script:
```bash
chmod +x 🧪-TEST-COMMANDS.sh
./🧪-TEST-COMMANDS.sh
```

---

## 🎓 How It Works (Simple Explanation)

```
1. Camera captures video
2. YOLO AI analyzes each frame
3. Detects persons (Class 0)
4. Detects weapons (Class 1)
5. Checks if weapon is NEAR person
   ├─ Near? → Mark as dangerous
   └─ Far? → Ignore
6. Accumulates best detection for 30 seconds
7. Emits alert with screenshot
8. Waits 30 seconds before next alert (cooldown)
```

---

## 🔧 Quick Configuration

All settings are in `weapon-detection-server.py`. Common changes:

### Make Detection More Sensitive:
```python
WEAPON_CONF = 0.45  # Lower = more detections (default: 0.55)
```

### Make Detection Less Sensitive:
```python
WEAPON_CONF = 0.70  # Higher = fewer false alarms (default: 0.55)
```

### Change Alert Frequency:
```python
COOLDOWN_SEC = 60  # Alert max once per minute (default: 30)
```

After changes, restart the server:
```bash
python weapon-detection-server.py
```

---

## 📊 System Health Check

Run this one command to check everything:
```bash
curl http://localhost:5000/api/health | python -m json.tool
```

**Expected output:**
```json
{
  "status": "running",
  "model_loaded": true,
  "active_streams": 6,
  "total_detections": 0
}
```

If `model_loaded` is `false`, place `best.pt` in project root and restart server.

---

## 🎯 What You Can Detect

Your YOLO model is trained to detect:
- **Class 0: Person** (confidence threshold: 0.40)
- **Class 1: Dangerous Weapon** (confidence threshold: 0.55)

**Important:** Both must be detected together and close to each other to trigger an alert!

---

## 🚀 Next Steps After Setup

1. **Test with different lighting conditions**
   - Bright light, dim light, night mode

2. **Test with different weapon types**
   - Knives, guns, tools, etc.

3. **Adjust confidence thresholds**
   - Based on your false positive/negative rate

4. **Monitor performance**
   - Check CPU/memory usage
   - Adjust `FRAME_SKIP` if needed

5. **Train your team**
   - How to respond to alerts
   - How to verify evidence screenshots

---

## ⚠️ Important Notes

- **Only ONE app can use webcam at a time**
  - Close Zoom, Teams, Skype, etc. before enabling detection

- **Browser needs camera permission**
  - Allow when prompted, or check browser settings

- **Wait full 30 seconds after detection**
  - System batches alerts to avoid spam
  - The best detection in 30s window is used

- **Weapon must be near person**
  - System won't alert on weapon alone
  - Must be held or within ~30% of person height

- **best.pt must exist in project root**
  - This is your trained YOLO model
  - System won't work without it

---

## 🎉 You're All Set!

If you followed the 3 steps above, your system should be:
- ✅ Running
- ✅ Monitoring webcam
- ✅ Detecting weapons
- ✅ Sending alerts
- ✅ Capturing evidence

**Congratulations! Your AI security system is operational.** 🎊

---

## 🆘 Need Help?

### 1. Run the test script first:
```bash
./🧪-TEST-COMMANDS.sh
```
This will identify most issues automatically.

### 2. Check the Flask console
Look for ❌ or ⚠️ error messages.

### 3. Check browser console
Press F12 and look for errors.

### 4. Read the troubleshooting guide:
**[WEBCAM-AND-DETECTION-COMPLETE-FIX.md](./WEBCAM-AND-DETECTION-COMPLETE-FIX.md)** - Section: "Troubleshooting"

### 5. Check the quick fixes:
**[⚡-QUICK-REFERENCE-CARD.md](./⚡-QUICK-REFERENCE-CARD.md)** - "Quick Fixes" table

---

## 📁 Important Files

| File | Purpose |
|------|---------|
| `best.pt` | Your YOLO model (REQUIRED!) |
| `weapon-detection-server.py` | Flask backend server |
| `components/WebcamFeed.tsx` | Frontend webcam component |
| `👉-START-HERE.md` | This file - Start here! |
| `🧪-TEST-COMMANDS.sh` | Automated test script |
| `📚-DOCUMENTATION-INDEX.md` | All documentation index |

---

## 🎯 Success Checklist

Before considering your setup complete:

- [ ] `best.pt` exists in project root
- [ ] Flask server starts without errors
- [ ] Console shows "Model loaded successfully"
- [ ] Console shows "Feed 4 started successfully"
- [ ] Dashboard shows "AI DETECTION ACTIVE" badge
- [ ] Can see video feed (not black)
- [ ] Green boxes appear on detected objects
- [ ] Red boxes appear when weapon near person
- [ ] Alert appears after 30 seconds
- [ ] Screenshot captured in Evidence section

---

## 🎓 Congratulations!

You now have a **state-of-the-art AI weapon detection system** running!

**The system will:**
- ✅ Monitor your cameras 24/7
- ✅ Detect persons and weapons in real-time
- ✅ Alert when weapons are held by persons
- ✅ Capture evidence screenshots automatically
- ✅ Send alerts to your dashboard
- ✅ Handle errors gracefully with fallbacks

**Stay safe!** 🛡️

---

**Quick Links:**
- 📚 [All Documentation](./📚-DOCUMENTATION-INDEX.md)
- ⚡ [Quick Reference](./⚡-QUICK-REFERENCE-CARD.md)
- 🚀 [Detailed Setup](./🚀-QUICK-START-WEAPON-DETECTION.md)
- 🎯 [What Got Fixed](./🎯-WHAT-GOT-FIXED.md)
- 🧪 [Test Script](./🧪-TEST-COMMANDS.sh)

---

**Last Updated:** November 10, 2025  
**Status:** ✅ System Operational  
**Version:** 2.0 (Fixed webcam + detection)
