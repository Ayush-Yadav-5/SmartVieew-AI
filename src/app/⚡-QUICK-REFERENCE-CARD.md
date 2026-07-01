# ⚡ Quick Reference Card - Weapon Detection System

## 🚀 Start System (30 seconds)

```bash
# 1. Verify model exists
ls best.pt

# 2. Start Flask server
python weapon-detection-server.py

# 3. Wait for this message:
✅ Feed 4 started successfully (Webcam)
```

## 🎯 Enable Detection (Dashboard)

1. Login as **organization user**
2. Navigate to **Live CCTV**
3. Toggle **"Enable Weapon Detection"**
4. Look for **"AI DETECTION ACTIVE"** badge (red)

## ✅ System is Working When You See:

### In Flask Console:
```
✅ Model loaded successfully!
✅ Feed 4 started successfully (Webcam)
🎯 Feed 4: New best detection - weapon_conf=0.723
⚠️  ALERT: Feed 4 - Weapon detected
```

### In Dashboard:
- 🔴 **"AI DETECTION ACTIVE"** badge on Feed 4
- 🟢 Green boxes around persons and objects
- 🔴 Red boxes around dangerous weapons near persons
- 🚨 Alert notification after 30 seconds
- 📸 Screenshot in Evidence section

## 🐛 Quick Fixes

| Problem | Quick Fix |
|---------|-----------|
| **Webcam black** | Close other apps using camera, refresh browser |
| **No boxes** | Check Flask logs: Model loaded? |
| **No alerts** | Weapon must be near person, wait 30s |
| **Stream fails** | Server running? `curl localhost:5000/api/health` |

## 🔧 Quick Config Changes

### Make Detection More Sensitive:
Edit `weapon-detection-server.py`:
```python
WEAPON_CONF = 0.45  # Was 0.55 - lower = more detections
```

### Make Detection Less Sensitive:
```python
WEAPON_CONF = 0.70  # Was 0.55 - higher = fewer false positives
```

### Change Alert Frequency:
```python
COOLDOWN_SEC = 60  # Was 30 - alert max once per minute
```

### Improve Performance:
```python
FRAME_SKIP = 3  # Was 2 - process fewer frames
```

## 📊 Health Check (1 line)

```bash
curl http://localhost:5000/api/health | jq
```

Expected:
```json
{
  "status": "running",
  "model_loaded": true,
  "active_streams": 6
}
```

## 🎬 Test Flows

### Quick Test with Webcam:
```
1. Enable detection on Feed 4
2. Show weapon near your body
3. Keep it visible for 30s
4. Alert should appear!
```

### Quick Test with Video:
```
1. Enable detection
2. Watch Feed 5 or Feed 6 (test videos)
3. These have weapons in them
4. Alerts should appear automatically
```

## 🔍 Debug Commands

```bash
# Check server running
curl localhost:5000/

# Check feeds status  
curl localhost:5000/api/feeds

# Check recent detections
curl localhost:5000/api/detections

# View live stream (in browser)
http://localhost:5000/video_feed/4?source=camera
```

## 🎯 Detection Parameters

| Parameter | Default | Purpose |
|-----------|---------|---------|
| Person Conf | 0.40 | Person detection threshold |
| Weapon Conf | 0.55 | Weapon detection threshold |
| Alert Interval | 30s | Time to wait before alert |
| Cooldown | 30s | Time between alerts |
| Frame Skip | 2 | Process every Nth frame |

## 📁 Important Files

| File | Purpose |
|------|---------|
| `best.pt` | YOLO model (must be in root) |
| `weapon-detection-server.py` | Flask backend |
| `components/WebcamFeed.tsx` | Frontend webcam component |
| `WEBCAM-AND-DETECTION-COMPLETE-FIX.md` | Full documentation |
| `🚀-QUICK-START-WEAPON-DETECTION.md` | Setup guide |

## 🎓 How Detection Works (Simple)

```
1. Camera captures frame
2. YOLO finds persons (Class 0)
3. YOLO finds weapons (Class 1)
4. Check: Weapon near person?
   ├─ Yes: Mark as dangerous
   └─ No: Ignore
5. Accumulate best detection for 30s
6. Emit alert with screenshot
7. 30s cooldown before next alert
```

## 🔄 Webcam Mode Logic

```
Detection OFF:
  → Browser shows webcam directly

Detection ON + Server Running:
  → Browser releases webcam
  → Flask server acquires webcam
  → YOLO processes frames
  → Flask streams annotated video
  → Browser shows detection stream

Detection ON + Server Offline:
  → Try to load detection stream
  → Fails after 1 second
  → Fallback to browser webcam
  → Show error message
```

## 🎯 Expected Behavior

### Feed 4 (Webcam):
- Detection OFF: Browser webcam (mirrored)
- Detection ON: Flask stream (with YOLO boxes)
- Server OFF: Automatic fallback to browser webcam

### Feed 5 & 6 (Videos):
- Always show YouTube/video stream
- Detection boxes overlay when enabled
- Test videos contain weapons for easy testing

## ⚠️ Important Notes

- **Only ONE app** can access webcam at a time
- Browser must have **camera permissions**
- **Wait full 30 seconds** after detection before alert
- **Cooldown prevents** alert spam (30s between alerts)
- **Weapon must be near person** to trigger alert
- **best.pt must exist** in project root

## 🚨 Critical Logs to Watch

### Good:
```
✅ Model loaded successfully!
✅ Feed 4 started successfully (Webcam)
🔄 Worker started for feed 4
🎯 New best detection - weapon_conf=0.723
⚠️  ALERT: Feed 4 - Weapon detected
```

### Bad:
```
❌ Error loading model: No such file
  → Fix: Add best.pt to project root

❌ Could not open video source for feed 4
  → Fix: Close other apps using webcam

⚠️  Failed to read frame from feed 4
  → Fix: Reconnect camera or restart server
```

## 📱 Browser Console (F12)

### Good:
```
✅ Webcam Feed 4: Browser camera started
🛑 Webcam Feed 4: Camera stopped for detection server
✅ Detection stream 4 loaded from server
```

### Bad:
```
❌ Detection stream 4 failed to load
  → Automatic fallback to browser webcam
  → Check if Flask server is running
```

## 🎯 Success Indicators

| ✅ | Indicator |
|----|-----------|
| 1️⃣ | Flask server started |
| 2️⃣ | "Model loaded successfully" in logs |
| 3️⃣ | "Feed 4 started successfully" in logs |
| 4️⃣ | "AI DETECTION ACTIVE" badge in UI |
| 5️⃣ | Green/red boxes on video |
| 6️⃣ | Alert after 30s when weapon shown |
| 7️⃣ | Screenshot in Evidence section |

## 🔧 Port & URL Reference

| Service | URL | Purpose |
|---------|-----|---------|
| Flask API | `http://localhost:5000` | Weapon detection backend |
| Health Check | `http://localhost:5000/api/health` | Server status |
| Video Stream | `http://localhost:5000/video_feed/4` | Live MJPEG stream |
| Dashboard | `http://localhost:5173` | Frontend UI (Vite dev) |

## 📚 Full Documentation

- **Complete Guide**: `WEBCAM-AND-DETECTION-COMPLETE-FIX.md`
- **Quick Start**: `🚀-QUICK-START-WEAPON-DETECTION.md`  
- **Flow Diagrams**: `WEBCAM-DETECTION-FLOW-DIAGRAM.md`
- **Summary**: `✅-FIXES-COMPLETE-SUMMARY.md`
- **This Card**: `⚡-QUICK-REFERENCE-CARD.md`

## ⏱️ Typical Timeline

| Time | Event |
|------|-------|
| 0:00 | User enables detection |
| 0:01 | Browser releases webcam |
| 0:02 | Flask acquires webcam |
| 0:03 | YOLO starts processing |
| 0:05 | Person detected |
| 0:07 | Weapon detected near person |
| 0:07-0:30 | System accumulates best detection |
| 0:30 | Alert emitted 🚨 |
| 0:30-1:00 | Cooldown period |
| 1:00 | Ready for next alert |

---

**Print this card and keep it handy!** 📋

**Status**: ✅ All systems operational  
**Last Updated**: November 10, 2025
