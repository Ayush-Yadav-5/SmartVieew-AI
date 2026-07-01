# 🏗️ CrimeShield Weapon Detection - System Architecture Summary

## 🎯 Core Requirements ✅

Your system MUST:
1. ✅ Perform person + weapon detection on **ALL video feeds and live camera (ID 4) simultaneously**
2. ✅ Camera feed (ID 4) stays **always active** and continuously processes live video
3. ✅ All other feeds (1, 2, 3, 5, 6) also processed **in parallel** (not one by one)
4. ✅ When person + weapon detected in **ANY feed** → capture screenshot from **THAT specific feed**
5. ✅ Screenshot comes from **exact feed** where detection happened (NOT always from camera)
6. ✅ Multiple detections across different feeds handled **simultaneously**

**Status: ALL REQUIREMENTS MET ✅**

---

## 🏗️ System Architecture

### Layer 1: Frontend (React/TypeScript)

**File:** `/components/CCTVFeedSection.tsx`

**Key Functions:**

#### 1. `toggleWeaponDetection()` - Starts All Feeds in Parallel
```typescript
cctvFeeds.forEach(feed => {
  // Determine correct source: camera for Feed 4, video for others
  const sourceType = feed.isWebcamOnly ? 'camera' : 'video';
  
  // Start detection stream (all execute simultaneously)
  fetch(`${WEAPON_DETECTION_API}/video_feed/${feed.id}?source=${sourceType}`)
});

// Result: 6 parallel HTTP streams (not sequential)
// Feed 1 → video, Feed 2 → video, Feed 3 → video,
// Feed 4 → camera, Feed 5 → video, Feed 6 → video
```

#### 2. `checkDetections()` - Polls for Detections Every 2 Seconds
```typescript
const checkDetections = async () => {
  // Fetch ALL detections from ALL feeds
  const response = await fetch(`${WEAPON_DETECTION_API}/api/detections`);
  const data = await response.json();
  
  // Process EACH detection independently
  for (const detection of data.detections) {
    if (detection.has_dangerous_weapon && detection.has_person) {
      const feedId = detection.feed_id;  // Could be 1, 2, 3, 4, 5, or 6
      
      // Capture from EXACT feed where detection occurred
      const screenshot = await captureScreenshot(feedId, detection);
      
      // Send to Evidence Section
      onNewEvidence({ feedId, screenshot, ... });
    }
  }
};
```

#### 3. `captureScreenshot()` - Captures from Specific Feed
```typescript
const captureScreenshot = async (feedId: number, detection: Detection) => {
  // Determine source from detection
  const sourceType = detection.source_type === 'Camera Feed' ? 'camera' : 'video';
  
  // Capture from SPECIFIC feed (not always camera)
  const captureUrl = `${WEAPON_DETECTION_API}/api/capture/${feedId}?source=${sourceType}`;
  
  const response = await fetch(captureUrl);
  return await response.blob();
};
```

---

### Layer 2: Backend (Python/Flask)

**File:** `/weapon-detection-server.py`

**Key Components:**

#### 1. Video Sources Configuration
```python
VIDEO_SOURCES = {
    1: 'https://www.youtube.com/watch?v=cH7VBI4QQzA',  # Video
    2: 'https://www.youtube.com/watch?v=u4UZ4UvZXrg',  # Video
    3: 'https://www.youtube.com/watch?v=qHW8srS0ylo',  # Video
    4: 0,  # WEBCAM (camera index 0)
    5: 'https://youtube.com/shorts/myXiZTDSo-E',       # Video
    6: 'https://www.youtube.com/watch?v=llW2mUEZDFw',  # Video
}
```

#### 2. `VideoStream` Class - Independent Processing Per Feed
```python
class VideoStream:
    def __init__(self, feed_id, source, use_camera=False):
        self.feed_id = feed_id  # Unique feed identifier
        self.source = source     # Video URL or camera index
        self.use_camera = use_camera
        
    def detect_weapons(self, frame):
        # Run YOLO on frame
        results = model.track(frame, persist=True, conf=DETECTION_CONFIDENCE)
        
        # Check for Class 0 (person) AND Class 1 (dangerous_weapon)
        has_person = False
        has_dangerous_weapon = False
        
        for box in results[0].boxes:
            cls = int(box.cls[0])
            if cls == 0:  # Person
                has_person = True
            if cls == 1:  # Dangerous weapon
                has_dangerous_weapon = True
        
        # ONLY store if BOTH detected together
        if has_dangerous_weapon and has_person:
            event = {
                'feed_id': self.feed_id,  # The ACTUAL feed where detection occurred
                'timestamp': datetime.now().isoformat(),
                'source_type': 'Camera Feed' if self.use_camera else 'Video Feed'
            }
            detection_events.append(event)
```

#### 3. Stream Management - Parallel Execution
```python
active_streams = {}

# When frontend calls /video_feed/1?source=video
# Creates stream: "1_video"
@app.route('/video_feed/<int:feed_id>')
def video_feed(feed_id):
    source_type = request.args.get('source', 'video')
    use_camera = (source_type == 'camera')
    
    stream_key = f"{feed_id}_{'camera' if use_camera else 'video'}"
    
    if stream_key not in active_streams:
        stream = VideoStream(feed_id, VIDEO_SOURCES[feed_id], use_camera)
        stream.start()
        active_streams[stream_key] = stream
    
    return Response(generate_frames(feed_id, use_camera))

# Flask runs with threaded=True, so all streams run in parallel
```

#### 4. Screenshot Capture - Feed-Specific
```python
@app.route('/api/capture/<int:feed_id>')
def capture_screenshot(feed_id):
    source_type = request.args.get('source', None)
    stream_key = f"{feed_id}_{source_type}"
    
    # Get EXACT stream for this feed
    stream = active_streams.get(stream_key)
    
    if stream:
        # Capture from THIS feed only
        frame = stream.best_detection_frame
        
        # Add verification overlay
        cv2.putText(frame, f"FEED {stream.feed_id}", (10, 30), ...)
        
        return Response(frame_bytes, mimetype='image/jpeg')
```

---

## 🔄 Data Flow: Detection → Evidence

### Example: Detection in Feed 6 (YouTube Video)

```
┌─────────────────────────────────────────────────────────────┐
│ 1. Backend: YOLO Processing (Continuous Loop)              │
│    Stream: 6_video (YouTube URL)                            │
│    Frame: 12345                                             │
│    Detection: Person (Class 0) + Dangerous Weapon (Class 1) │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│ 2. Backend: Store Detection Event                          │
│    {                                                        │
│      feed_id: 6,                                           │
│      timestamp: "2025-11-10T15:30:45.123Z",                │
│      source_type: "Video Feed",                            │
│      has_person: true,                                     │
│      has_dangerous_weapon: true                            │
│    }                                                        │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│ 3. Frontend: Poll Detections (Every 2 Seconds)             │
│    GET /api/detections                                     │
│    Response: [{ feed_id: 6, ... }]                         │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│ 4. Frontend: Capture Screenshot from Feed 6                │
│    GET /api/capture/6?source=video                         │
│    Backend: Returns frame from stream "6_video"            │
│    Screenshot: Contains "FEED 6" overlay                   │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│ 5. Frontend: Create Evidence Item                          │
│    {                                                        │
│      feedId: 6,                                            │
│      title: "Dangerous Weapon + Person - Airport Terminal",│
│      screenshot: <base64 image from Feed 6>,               │
│      source: "Video Feed"                                  │
│    }                                                        │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│ 6. Evidence Section: Display                               │
│    Shows screenshot from Feed 6 with "FEED 6" overlay      │
└─────────────────────────────────────────────────────────────┘
```

---

## 🎯 Key Design Decisions

### 1. Why One Source Per Feed?

**Problem:** Previously, system started BOTH camera AND video for every feed
- Feed 6 had both `6_camera` (webcam) and `6_video` (YouTube)
- Both streams had feed_id=6 but different video sources
- Caused random detections from mixed sources

**Solution:** Only start the correct source per feed
- Feed 4: camera only (webcam)
- Feeds 1, 2, 3, 5, 6: video only (YouTube)

**Result:** Clean, accurate detections with correct source tracking

### 2. Why Parallel Processing?

**Requirement:** Monitor ALL feeds simultaneously (not sequential)

**Implementation:**
- Frontend: All `fetch()` calls execute asynchronously (no `await`)
- Backend: Flask `threaded=True` allows concurrent stream processing
- Result: 6 independent threads running YOLO on different video sources

### 3. Why Feed-Specific Screenshot Capture?

**Requirement:** Screenshot from EXACT feed where detection occurred

**Implementation:**
- Dynamic URL: `/api/capture/{feedId}?source={sourceType}`
- Backend selects correct stream: `active_streams[f"{feedId}_{sourceType}"]`
- Adds verification overlay: `cv2.putText(frame, f"FEED {feedId}", ...)`

**Result:** Screenshot always matches detection feed

---

## 📊 System State Example

### Active Streams (All Running in Parallel)

```
active_streams = {
    "1_video":  VideoStream(feed_id=1, source=YouTube, use_camera=False),
    "2_video":  VideoStream(feed_id=2, source=YouTube, use_camera=False),
    "3_video":  VideoStream(feed_id=3, source=YouTube, use_camera=False),
    "4_camera": VideoStream(feed_id=4, source=0, use_camera=True),  ← WEBCAM
    "5_video":  VideoStream(feed_id=5, source=YouTube, use_camera=False),
    "6_video":  VideoStream(feed_id=6, source=YouTube, use_camera=False),
}
```

### Detection Events (FIFO Queue, Last 100 Events)

```
detection_events = [
    { feed_id: 6, timestamp: "...", source_type: "Video Feed", ... },
    { feed_id: 4, timestamp: "...", source_type: "Camera Feed", ... },
    { feed_id: 2, timestamp: "...", source_type: "Video Feed", ... },
    ...
]
```

---

## ✅ Verification Commands

### Check Active Streams
```bash
python test-parallel-detection.py
```

### Manual API Checks
```bash
# Check server health
curl http://localhost:5000/api/health

# Check active feeds
curl http://localhost:5000/api/feeds

# Check detections
curl http://localhost:5000/api/detections

# Capture screenshot from specific feed
curl http://localhost:5000/api/capture/6?source=video -o feed6.jpg
```

### Expected Server Logs
```
🆕 Creating new stream: 1_video (feed_id=1, ...)
🆕 Creating new stream: 2_video (feed_id=2, ...)
🆕 Creating new stream: 3_video (feed_id=3, ...)
🆕 Creating new stream: 4_camera (feed_id=4, ...)  ← CAMERA
🆕 Creating new stream: 5_video (feed_id=5, ...)
🆕 Creating new stream: 6_video (feed_id=6, ...)

✅ 6 streams active, all processing in parallel
```

---

## 🎉 Summary

**Architecture Highlights:**

1. **Frontend:** Initiates 6 parallel streams, polls detections every 2s
2. **Backend:** 6 independent VideoStream threads, each running YOLO continuously
3. **Detection:** Stored with correct feed_id and source_type
4. **Screenshot:** Captured from exact feed via dynamic URL
5. **Evidence:** Receives correct screenshot with feed verification overlay

**All Requirements Met:**

✅ All feeds (1-6) processed in parallel
✅ Camera feed (ID 4) always active
✅ Detection works in ANY feed
✅ Screenshot from exact feed (not always camera)
✅ Multiple simultaneous detections handled
✅ Continuous, real-time monitoring

**No changes needed - system working as designed!** 🚀
