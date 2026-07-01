# CrimeShield AI - Weapon Detection Integration Guide

## Overview
This guide will help you integrate your custom YOLO weapon detection model with the CrimeShield AI Dashboard.

## Features
- ✅ Real-time weapon detection on live CCTV feeds
- ✅ Automatic alarm system when weapons are detected
- ✅ Multi-camera support (up to 6 feeds)
- ✅ REST API for detection events
- ✅ Web-based video streaming with annotations
- ✅ Toast notifications for threat alerts
- ✅ Detection statistics and history

## Prerequisites
- Python 3.8 or higher
- Your trained YOLO model file (`best.pt`)
- Webcam or RTSP/HTTP video streams

## Installation Steps

### 1. Install Python Dependencies

```bash
# Using requirements.txt (recommended)
pip install -r requirements.txt

# Or install manually
pip install flask flask-cors ultralytics opencv-python-headless numpy
```

### 2. Setup Your Model

Place your trained YOLO model file in the project directory:
```
/your-project/
  ├── best.pt                    # Your trained model
  ├── weapon-detection-server.py # Flask server
  ├── requirements.txt
  └── components/
      └── CCTVFeedSection.tsx
```

### 3. Configure Video Sources

Edit `weapon-detection-server.py` and update the `VIDEO_SOURCES` dictionary:

```python
VIDEO_SOURCES = {
    1: 0,  # Webcam
    2: "rtsp://username:password@192.168.1.10:554/stream1",  # RTSP camera
    3: "http://192.168.1.20:8080/video",  # HTTP stream
    4: "path/to/video.mp4",  # Video file
    5: 0,  # Another webcam
    6: 0,  # Yet another camera
}
```

**Source Options:**
- `0` or `1` - Built-in webcam
- `"rtsp://..."` - RTSP network camera
- `"http://..."` - HTTP video stream
- `"path/to/file.mp4"` - Local video file

### 4. Start the Detection Server

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
 * Running on http://0.0.0.0:5000
```

### 5. Start the Dashboard

In a separate terminal, start your dashboard:

```bash
npm run dev
```

### 6. Enable Weapon Detection

1. Navigate to the **Live CCTV** section
2. Look for the green "Server Online" indicator
3. Click **"Enable Weapon Detection"** button
4. The feeds will switch to AI-powered detection mode

## API Endpoints

The weapon detection server provides the following REST API endpoints:

### Video Streaming
```
GET /video_feed/<feed_id>
```
Returns MJPEG video stream with weapon detection annotations.

### Health Check
```
GET /api/health
```
Returns server status and statistics.

**Response:**
```json
{
  "status": "running",
  "model_loaded": true,
  "active_streams": 3,
  "total_detections": 15
}
```

### List Feeds
```
GET /api/feeds
```
Returns status of all video feeds.

**Response:**
```json
{
  "feeds": [
    {
      "id": 1,
      "status": "active",
      "detection_count": 5,
      "last_detection": "2025-11-01T10:30:45.123456"
    }
  ]
}
```

### Recent Detections
```
GET /api/detections
```
Returns last 50 weapon detection events.

### Latest Detection
```
GET /api/detections/latest
```
Returns the most recent weapon detection.

**Response:**
```json
{
  "detection": {
    "feed_id": 1,
    "timestamp": "2025-11-01T10:30:45.123456",
    "detections": [
      {
        "class": "gun",
        "confidence": 0.95,
        "bbox": [100, 200, 150, 300]
      }
    ],
    "frame_number": 1245
  }
}
```

### Snapshot
```
GET /api/feed/<feed_id>/snapshot
```
Returns a single frame as base64-encoded image.

## Configuration Options

### Model Settings

Edit these variables in `weapon-detection-server.py`:

```python
MODEL_PATH = 'best.pt'              # Path to your model
DETECTION_CONFIDENCE = 0.5          # Confidence threshold (0.0 - 1.0)
FRAME_SKIP = 2                      # Process every Nth frame
```

### Frontend Settings

Edit these constants in `CCTVFeedSection.tsx`:

```typescript
const WEAPON_DETECTION_API = 'http://localhost:5000';  // API URL
const CHECK_INTERVAL = 3000;                            // Check every 3 seconds
```

## Features Explained

### Automatic Alarm System
When a weapon is detected:
1. Visual alert banner appears at the top
2. Toast notification is triggered
3. Audio alarm plays (siren sound)
4. Detection details are logged

### Real-time Statistics
- Total detection count per feed
- Last detection timestamp
- Confidence scores
- Bounding box coordinates

### Performance Optimization
- Frame skipping (processes every Nth frame)
- Multi-threaded video processing
- Efficient MJPEG streaming
- Configurable confidence thresholds

## Troubleshooting

### Server Won't Start

**Problem:** `Error loading model`
- **Solution:** Ensure `best.pt` is in the correct directory

**Problem:** `Could not open video source`
- **Solution:** Check your camera is connected and the RTSP URL is correct

### No Detections Showing

**Problem:** Server online but no detections
- **Solution:** Check DETECTION_CONFIDENCE (lower it if needed)
- **Solution:** Verify your model is trained on the correct classes

**Problem:** Frontend shows "Server Offline"
- **Solution:** Ensure Flask server is running on port 5000
- **Solution:** Check CORS is enabled (already configured)

### Performance Issues

**Problem:** Video is laggy
- **Solution:** Increase FRAME_SKIP value (e.g., from 2 to 3)
- **Solution:** Lower video resolution
- **Solution:** Use GPU acceleration (install torch with CUDA)

**Problem:** High CPU usage
- **Solution:** Increase FRAME_SKIP
- **Solution:** Reduce number of active cameras
- **Solution:** Use smaller YOLO model (e.g., yolov8n instead of yolov8x)

## GPU Acceleration (Optional)

For better performance with CUDA-enabled GPU:

```bash
# Install PyTorch with CUDA support
pip install torch torchvision --index-url https://download.pytorch.org/whl/cu118

# Verify GPU is detected
python -c "import torch; print(torch.cuda.is_available())"
```

## Security Considerations

### Production Deployment

1. **Change default host/port:**
```python
app.run(host='127.0.0.1', port=5000)  # Localhost only
```

2. **Add authentication:**
```python
from flask_httpauth import HTTPBasicAuth
auth = HTTPBasicAuth()

@auth.verify_password
def verify(username, password):
    # Implement your authentication logic
    pass
```

3. **Use HTTPS:**
```python
app.run(ssl_context=('cert.pem', 'key.pem'))
```

4. **Rate limiting:**
```bash
pip install flask-limiter
```

## Testing

### Test Video Stream
```bash
# Open in browser
http://localhost:5000/video_feed/1
```

### Test API
```bash
# Check health
curl http://localhost:5000/api/health

# Get feeds
curl http://localhost:5000/api/feeds

# Get detections
curl http://localhost:5000/api/detections
```

## Model Training Tips

If you need to train a new weapon detection model:

1. **Dataset:** Collect diverse weapon images (guns, knives, etc.)
2. **Annotation:** Use tools like Roboflow or LabelImg
3. **Training:** Use YOLOv8 or YOLOv11
4. **Classes:** Define clear classes (e.g., "gun", "knife", "weapon")
5. **Validation:** Test on real-world scenarios

### Example Training Command
```bash
yolo detect train data=weapons.yaml model=yolov8n.pt epochs=100 imgsz=640
```

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review Flask server logs
3. Check browser console for frontend errors
4. Ensure all dependencies are installed correctly

## Advanced Configuration

### Multiple Model Support

To use different models for different feeds:

```python
models = {
    1: YOLO('weapons.pt'),
    2: YOLO('knives.pt'),
    3: YOLO('general.pt')
}
```

### Custom Detection Logic

Add custom logic in the `detect_weapons` method:

```python
def detect_weapons(self, frame):
    results = model.track(frame, persist=True, verbose=False)
    
    # Custom logic here
    if len(results[0].boxes) > 2:
        # Multiple weapons detected - higher alert level
        self.trigger_emergency_protocol()
    
    return results[0].plot()
```

## License

This weapon detection integration is part of the CrimeShield AI Dashboard project.

---

**Note:** Always ensure you have proper authorization before monitoring any area with surveillance cameras. Weapon detection systems should be used responsibly and in compliance with local laws and regulations.
