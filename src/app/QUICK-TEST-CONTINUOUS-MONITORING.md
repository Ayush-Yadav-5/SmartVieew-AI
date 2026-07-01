# 🚀 Quick Test Guide - Continuous Monitoring All Feeds

## ⚡ Quick Start (2 Minutes)

### 1. Start the Backend Server
```bash
python weapon-detection-server.py
```

**Expected Output:**
```
============================================================
CrimeShield AI - Weapon Detection Server
============================================================
Model: best.pt
Available Feeds: [1, 2, 3, 4, 5, 6]
Detection Confidence: 0.4
============================================================
✓ Model loaded successfully!
* Running on http://0.0.0.0:5000
```

---

### 2. Open Dashboard
- Navigate to your CrimeShield dashboard
- Look for "Live CCTV Monitoring" section
- You should see 6 camera feeds

---

### 3. Enable Weapon Detection
1. Click **"Enable Weapon Detection"** button (top right)
2. Wait for green notification: "Weapon Detection Enabled"
3. Status should show: **"Background Monitoring Active"**
4. Server status indicator should be **green** (Server Online)

---

## 🎯 Test Each Feed

### Feed 1 - Main Street Intersection
- **Source**: YouTube Live Stream
- **Test**: Background monitoring active
- **Expected**: No immediate detection (regular street footage)

### Feed 2 - Central Park East
- **Source**: YouTube Live Stream
- **Test**: Background monitoring active
- **Expected**: No immediate detection (park footage)

### Feed 3 - Shopping Mall Entrance
- **Source**: YouTube Live Stream
- **Test**: Background monitoring active
- **Expected**: No immediate detection (mall footage)

### Feed 4 - Residential Zone A ⭐ **WEBCAM ONLY**
- **Source**: Live Webcam (Source: 0)
- **Display**: Green "WEBCAM" badge + placeholder with camera icon
- **Test**: 
  1. Hold weapon image in front of webcam
  2. Make sure a person is also visible
  3. Wait 2-5 seconds
- **Expected**: 
  - Alert: "⚠️ DANGEROUS WEAPON + PERSON DETECTED!"
  - Evidence captured in Evidence Section
  - Alarm sound plays

### Feed 5 - Industrial Zone B ⭐ **WEAPON VIDEO**
- **Source**: YouTube Shorts (myXiZTDSo-E)
- **Test**: Auto-detection when video plays
- **Expected**: 
  - Detection within 5-10 seconds
  - Alert with "Feed ID: 5"
  - Evidence screenshot captured

### Feed 6 - Airport Terminal ⭐ **WEAPON VIDEO**
- **Source**: YouTube (llW2mUEZDFw)
- **Test**: Auto-detection when video plays
- **Expected**: 
  - Detection within 5-10 seconds
  - Alert with "Feed ID: 6"
  - Evidence screenshot captured

---

## ✅ What to Verify

### 1. Independent Detection (Most Important!)
```
✅ Feed 5 detects weapon → Alert + Evidence
   (30 second cooldown starts for Feed 5 only)

✅ Feed 6 detects weapon → Alert + Evidence
   (30 second cooldown starts for Feed 6 only)

✅ Feed 4 detects weapon → Alert + Evidence
   (30 second cooldown starts for Feed 4 only)
```

**Key Point**: Each feed triggers independently! Feed 5 cooldown does NOT affect Feed 6.

---

### 2. Cooldown System
```
Time 00:00 → Feed 6 detects → Alert ✅
Time 00:10 → Feed 6 detects → Skipped (cooldown) ⏱️
Time 00:15 → Feed 5 detects → Alert ✅ (different feed!)
Time 00:30 → Feed 6 detects → Alert ✅ (cooldown expired)
```

---

### 3. Evidence Section
Check Evidence Section for:
- ✅ Each detection creates separate evidence item
- ✅ Evidence title shows correct feed name
- ✅ Tags include feed ID (e.g., "feed-5", "feed-6")
- ✅ Screenshot shows person + weapon together
- ✅ Timestamp is accurate
- ✅ Detection source is labeled (Camera Feed vs Video Feed)

---

### 4. Console Logs

**Backend Console (weapon-detection-server.py):**
```
✓ Feed 5 started successfully (Video Feed)
✓ Feed 6 started successfully (Video Feed)
✓ Feed 4 started successfully (Camera)
👤 DEBUG Feed 5: PERSON (Class 0) detected!
🔫 DEBUG Feed 5: DANGEROUS WEAPON (Class 1) detected!
⚠️⚠️⚠️ DANGEROUS WEAPON + PERSON DETECTED on feed 5!
📸 Best frame captured from Video feed 5
```

**Browser Console:**
```
✅ Evidence submitted for Feed 5 - ID: 5-12345-weapon-person
⏱️ Cooldown active for Feed 5 (25s remaining)
✅ Evidence submitted for Feed 6 - ID: 6-12345-weapon-person
```

---

## 🔍 Common Issues & Solutions

### Issue 1: "Server Offline"
**Solution**: 
```bash
# Make sure Flask server is running
python weapon-detection-server.py
```

### Issue 2: No Detection on Feed 4 (Webcam)
**Solution**:
- Check webcam is connected and accessible
- Try granting browser camera permissions
- Hold weapon+person image CLEARLY in front of camera
- Ensure good lighting

### Issue 3: No Detection on Feed 5/6 (YouTube)
**Solution**:
- Wait 10-15 seconds for video to load
- Check if yt-dlp is installed: `pip install yt-dlp`
- Backend will show extraction logs

### Issue 4: Only One Feed Detects
**Solution**:
- This is the issue we just fixed!
- Make sure you updated CCTVFeedSection.tsx with the new code
- Restart frontend if needed
- Check console for "Processing detections" logs

---

## 📊 Expected Results

### All Feeds Working:
```
[00:00] Weapon Detection Enabled ✅
[00:05] Feed 6 Detection → Alert + Evidence ✅
[00:10] Feed 5 Detection → Alert + Evidence ✅
[00:15] Feed 4 Detection → Alert + Evidence ✅
[00:35] Feed 6 Detection → Alert + Evidence ✅ (cooldown expired)
[00:40] Feed 5 Detection → Alert + Evidence ✅ (cooldown expired)
```

### Evidence Section Should Show:
```
Evidence Items:
1. ⚠️ Dangerous Weapon + Person - Airport Terminal (Feed 6)
2. ⚠️ Dangerous Weapon + Person - Industrial Zone B (Feed 5)
3. ⚠️ Dangerous Weapon + Person - Residential Zone A (Feed 4)
... and more as detections continue
```

---

## 🎉 Success Criteria

You know it's working when:

1. ✅ All 6 feeds show in the dashboard
2. ✅ "Background Monitoring Active" appears when enabled
3. ✅ Feed 4 shows "WEBCAM" badge (green)
4. ✅ Feed 5 & 6 auto-detect weapons within 10 seconds
5. ✅ Feed 4 detects when you show weapon to webcam
6. ✅ Each detection creates separate evidence item
7. ✅ Cooldown countdown shows (30s per feed)
8. ✅ Multiple feeds can alert within same 30-second window
9. ✅ No errors in console
10. ✅ Alarm sound plays on detection

---

## 🔧 Advanced Testing

### Test Simultaneous Multi-Feed Detection:
1. Enable weapon detection
2. Have Feed 5 and Feed 6 running (both have weapon videos)
3. Hold weapon in front of Feed 4 webcam
4. You should get alerts from all 3 feeds!

### Test Continuous Monitoring:
1. Enable detection at 00:00
2. Feed 6 detects at 00:05 → Alert
3. Feed 6 detects at 00:15 → Skipped (cooldown)
4. Feed 5 detects at 00:20 → Alert (different feed)
5. Feed 6 detects at 00:35 → Alert (cooldown expired)
6. Monitoring never stops! ✅

---

## 📝 Performance Metrics

- **Detection Latency**: 2-5 seconds from event to alert
- **Frame Rate**: ~30 FPS per feed
- **Check Interval**: 2 seconds (frontend polls backend)
- **Cooldown**: 30 seconds per camera
- **Evidence Window**: 60 seconds uniqueness

---

## 💡 Tips

1. **Best Webcam Test**: Print out a weapon+person image and hold it clearly in front of camera
2. **YouTube Videos**: Feed 5 and 6 should auto-detect within first 10 seconds
3. **Evidence Review**: Click any evidence item to see full details with bounding boxes
4. **Cooldown Timer**: Watch the cooldown countdown on each feed card
5. **Server Logs**: Keep terminal open to see real-time detection logs

---

## 🚨 If Nothing Works

1. **Restart everything**:
   ```bash
   # Stop Flask server (Ctrl+C)
   python weapon-detection-server.py
   
   # Refresh browser
   ```

2. **Check model file**: Ensure `best.pt` is in same directory as server

3. **Verify installations**:
   ```bash
   pip install flask flask-cors ultralytics opencv-python-headless numpy yt-dlp
   ```

4. **Test server health**:
   ```
   http://localhost:5000/api/health
   ```
   Should return: `{"status": "running", "model_loaded": true}`

---

## ✅ Final Checklist

- [ ] Backend server running (port 5000)
- [ ] Frontend dashboard loaded
- [ ] "Enable Weapon Detection" clicked
- [ ] "Background Monitoring Active" visible
- [ ] Server status = "Server Online" (green)
- [ ] Feed 4 shows "WEBCAM" badge
- [ ] Feed 5 playing YouTube Shorts video
- [ ] Feed 6 playing YouTube video
- [ ] Detection test on Feed 4 (webcam) → Success
- [ ] Auto-detection on Feed 5 → Success
- [ ] Auto-detection on Feed 6 → Success
- [ ] Evidence section has 3+ items
- [ ] Each evidence has correct feed ID
- [ ] Cooldown working (30s per feed)
- [ ] No console errors

**If all checked: 🎉 CONTINUOUS MONITORING IS WORKING PERFECTLY!**
