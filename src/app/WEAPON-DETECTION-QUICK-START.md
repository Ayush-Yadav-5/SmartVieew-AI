# 🔫 Weapon Detection - Quick Start Guide

## 🚀 Starting the Detection Server

### Step 1: Install Required Dependencies

```bash
pip install flask flask-cors ultralytics opencv-python-headless numpy yt-dlp
```

### Step 2: Place Your YOLO Model
- Place your trained `best.pt` model file in the project root directory (same folder as `weapon-detection-server.py`)

### Step 3: Start the Server

```bash
python weapon-detection-server.py
```

You should see:
```
============================================================
CrimeShield AI - Weapon Detection Server
============================================================
Model: best.pt
Available Feeds: [1, 2, 3, 4, 5, 6]
Detection Confidence: 0.5
============================================================

Endpoints:
  Video Streams: http://localhost:5000/video_feed/<feed_id>
  API Docs:      http://localhost:5000/
  Health Check:  http://localhost:5000/api/health
============================================================

Starting server...
```

## 🎯 What's New in This Update

### ✅ Fixed Issues:
1. **Dummy Evidence Removed**: All fake/sample evidence has been removed from Evidence Section
2. **Live Camera vs Video Feed**: You can now choose between:
   - **Video Feed** (default): Detects from YouTube videos running on Feed ID 6
   - **Live Camera**: Uses your webcam for detection
3. **Auto-Capture Working**: When weapon or person is detected, screenshot is automatically saved to Evidence Section
4. **Evidence Display Fixed**: Clicking on evidence shows full screenshot with all detection details

### 🎮 How to Use:

1. **Start the Detection Server** (see above)
2. **Enable Weapon Detection** in the dashboard
3. **Choose Source**:
   - Click "Video Feed" to detect from the YouTube video on Feed ID 6
   - Click "Live Camera" to use your webcam
4. **Toggle Capture Mode**:
   - "Weapons Only": Only captures when weapons are detected
   - "📸 Capture All": Captures all detections (persons, vehicles, etc.)

### 📸 Auto-Capture Features:

- ✅ Automatically captures screenshot when detection occurs
- ✅ Sends to Evidence Section with full details
- ✅ Shows detection confidence and bounding boxes
- ✅ Includes timestamp and location info
- ✅ Plays alarm sound for weapon detections
- ✅ Click on evidence to view full screenshot with details

### 🎬 Feed ID 6 - Your YouTube Video:

- **URL**: https://youtu.be/llW2mUEZDFw
- **Name**: Airport Terminal
- **Location**: Transport Hub
- **Status**: ✅ Active and ready for detection

## 🔧 Troubleshooting:

### Server Won't Start:
```bash
# Make sure all dependencies are installed
pip install --upgrade flask flask-cors ultralytics opencv-python-headless numpy yt-dlp
```

### YouTube Video Won't Load:
```bash
# Install yt-dlp for YouTube support
pip install yt-dlp
```

### Webcam Not Working:
- Check browser permissions for camera access
- Make sure no other app is using the webcam

### No Detections Showing:
- Verify server is running (check status indicator in dashboard)
- Make sure "Enable Weapon Detection" is turned ON
- Check that you've selected the correct source (Camera or Video Feed)

## 📊 API Endpoints:

| Endpoint | Description |
|----------|-------------|
| `/video_feed/<feed_id>?source=video` | Video feed detection stream |
| `/video_feed/<feed_id>?source=camera` | Webcam detection stream |
| `/api/health` | Server health check |
| `/api/detections/latest` | Latest detection event |
| `/api/capture/<feed_id>` | Capture screenshot from active stream |

## 🎨 Evidence Section Updates:

### Before:
- ❌ Had 3 dummy evidence items
- ❌ Clicking evidence showed placeholder with play button
- ❌ No real detection details

### After:
- ✅ Shows ONLY real auto-captured evidence
- ✅ Clicking evidence shows actual screenshot clearly
- ✅ Full detection details with confidence scores
- ✅ Download and share options work
- ✅ Eye icon to view, download icon to save

## 💡 Pro Tips:

1. **For Testing**: Use "Live Camera" mode and show an object to the webcam
2. **For Demo**: Use "Video Feed" mode to detect from the YouTube video
3. **Capture Everything**: Enable "📸 Capture All" to capture persons and vehicles too
4. **Clear Evidence**: Old dummy evidence has been automatically removed
5. **View Details**: Click the eye icon on any evidence to see full screenshot with detection boxes

## 🎯 Next Steps:

1. Train your YOLO model on more weapon classes
2. Add more video feeds to the system
3. Configure RTSP camera streams for real CCTV integration
4. Adjust `DETECTION_CONFIDENCE` in `weapon-detection-server.py` for sensitivity

---

**Status**: ✅ All features working and tested!
