# 🎬 Webcam & Detection Flow Diagram

## 📊 System Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                     CrimeShield Dashboard                           │
│                    (Organization User View)                         │
└───────────────────────────────┬─────────────────────────────────────┘
                                │
                                ▼
                    ┌───────────────────────┐
                    │  Live CCTV Section    │
                    │  (CCTVFeedSection)    │
                    └───────────┬───────────┘
                                │
                                ▼
            ┌───────────────────────────────────────┐
            │   Weapon Detection Toggle Switch     │
            └───────────┬───────────────────────────┘
                        │
        ┌───────────────┴───────────────┐
        │                               │
        ▼                               ▼
   Detection OFF                  Detection ON
        │                               │
        ▼                               ▼
┌───────────────┐              ┌────────────────┐
│ Browser Mode  │              │  Server Mode   │
└───────┬───────┘              └────────┬───────┘
        │                               │
        │                               │
```

## 🎥 Browser Mode (Detection OFF)

```
┌──────────────────────────────────────────────────────────────────┐
│                        BROWSER MODE                              │
│                     (Detection Disabled)                         │
└──────────────────────────┬───────────────────────────────────────┘
                           │
                           ▼
              ┌────────────────────────┐
              │ WebcamFeed Component   │
              │ useDetectionStream=false│
              └───────────┬────────────┘
                          │
                          ▼
         ┌─────────────────────────────────┐
         │ navigator.mediaDevices.         │
         │   getUserMedia({ video: true }) │
         └──────────────┬──────────────────┘
                        │
                        ▼
              ┌──────────────────┐
              │  Browser gets    │
              │  direct access   │
              │  to webcam       │
              └─────────┬────────┘
                        │
                        ▼
              ┌──────────────────┐
              │ <video> element  │
              │ srcObject=stream │
              └─────────┬────────┘
                        │
                        ▼
        ┌───────────────────────────────┐
        │ User sees live webcam feed    │
        │ Badge: "LIVE WEBCAM" (green)  │
        │ Mirror effect enabled         │
        └───────────────────────────────┘
```

## 🤖 Server Mode (Detection ON)

```
┌──────────────────────────────────────────────────────────────────┐
│                         SERVER MODE                              │
│                      (Detection Enabled)                         │
└──────────────────────────┬───────────────────────────────────────┘
                           │
                           ▼
              ┌────────────────────────┐
              │ WebcamFeed Component   │
              │ useDetectionStream=true │
              └───────────┬────────────┘
                          │
                          ▼
         ┌─────────────────────────────────┐
         │ Stop browser webcam stream      │
         │ stream.getTracks().forEach(     │
         │   track => track.stop()         │
         │ )                               │
         └──────────────┬──────────────────┘
                        │
                        ▼
              ┌──────────────────┐
              │ Browser releases │
              │ webcam           │
              └─────────┬────────┘
                        │
                        ▼
        ┌───────────────────────────────┐
        │ Flask Server (weapon-detection│
        │  -server.py) acquires webcam  │
        └──────────────┬────────────────┘
                       │
                       ▼
        ┌──────────────────────────────┐
        │ cv2.VideoCapture(0)          │
        │ Opens webcam feed            │
        └──────────────┬───────────────┘
                       │
                       ▼
        ┌──────────────────────────────┐
        │ Continuous Frame Processing  │
        │ (Background Thread)          │
        └──────────────┬───────────────┘
                       │
                       ▼
        ┌──────────────────────────────┐
        │ YOLO Model Detection         │
        │ - Detect Person (Class 0)    │
        │ - Detect Weapon (Class 1)    │
        └──────────────┬───────────────┘
                       │
                       ▼
        ┌──────────────────────────────┐
        │ Spatial Association Check    │
        │ - IoU overlap                │
        │ - Center point check         │
        │ - Proximity detection        │
        └──────────────┬───────────────┘
                       │
          ┌────────────┴────────────┐
          │                         │
          ▼                         ▼
    No Association          Person + Weapon
          │                   Together
          │                         │
          │                         ▼
          │            ┌──────────────────────┐
          │            │ Store best detection │
          │            │ in 30s window        │
          │            └──────────┬───────────┘
          │                       │
          │                       ▼
          │            ┌──────────────────────┐
          │            │ Wait 30 seconds      │
          │            └──────────┬───────────┘
          │                       │
          │                       ▼
          │            ┌──────────────────────┐
          │            │ Emit Alert Event     │
          │            │ - Timestamp          │
          │            │ - Weapon confidence  │
          │            │ - Association score  │
          │            └──────────┬───────────┘
          │                       │
          ▼                       ▼
    ┌─────────────────────────────────────┐
    │ Annotate Frame with Bounding Boxes  │
    │ - Green: Normal detections          │
    │ - Red: Dangerous weapon+person      │
    └────────────────┬────────────────────┘
                     │
                     ▼
    ┌─────────────────────────────────────┐
    │ Encode frame as JPEG                │
    └────────────────┬────────────────────┘
                     │
                     ▼
    ┌─────────────────────────────────────┐
    │ Stream via MJPEG                    │
    │ /video_feed/4?source=camera         │
    └────────────────┬────────────────────┘
                     │
                     ▼
    ┌─────────────────────────────────────┐
    │ Browser <img> element loads stream  │
    │ Shows annotated video with boxes    │
    └────────────────┬────────────────────┘
                     │
                     ▼
    ┌─────────────────────────────────────┐
    │ User sees AI-annotated live feed    │
    │ Badge: "AI DETECTION ACTIVE" (red)  │
    └─────────────────────────────────────┘
```

## 🔄 Fallback Mode (Server Offline)

```
┌──────────────────────────────────────────────────────────────────┐
│                       FALLBACK MODE                              │
│              (Detection ON but Server Unavailable)               │
└──────────────────────────┬───────────────────────────────────────┘
                           │
                           ▼
              ┌────────────────────────┐
              │ WebcamFeed Component   │
              │ useDetectionStream=true │
              └───────────┬────────────┘
                          │
                          ▼
         ┌─────────────────────────────────┐
         │ Try to load detection stream    │
         │ <img src="http://localhost:     │
         │   5000/video_feed/4" />         │
         └──────────────┬──────────────────┘
                        │
                        ▼
              ┌──────────────────┐
              │ Stream fails     │
              │ (onError event)  │
              └─────────┬────────┘
                        │
                        ▼
         ┌─────────────────────────────────┐
         │ Wait 1 second for retry         │
         └──────────────┬──────────────────┘
                        │
                        ▼
         ┌─────────────────────────────────┐
         │ Still failing?                  │
         │ Set useFallback = true          │
         └──────────────┬──────────────────┘
                        │
                        ▼
         ┌─────────────────────────────────┐
         │ Re-acquire browser webcam       │
         │ getUserMedia()                  │
         └──────────────┬──────────────────┘
                        │
                        ▼
         ┌─────────────────────────────────┐
         │ Show error dialog with option:  │
         │ "Connecting to Detection        │
         │  Server... [Use Browser Webcam]"│
         └──────────────┬──────────────────┘
                        │
                        ▼
         ┌─────────────────────────────────┐
         │ User sees browser webcam        │
         │ Badge: "LIVE WEBCAM (FALLBACK)" │
         │ Toast: "Detection unavailable"  │
         └─────────────────────────────────┘
```

## 🎯 Detection Logic Deep Dive

```
┌──────────────────────────────────────────────────────────────────┐
│                     YOLO DETECTION FRAME                         │
└──────────────────────────┬───────────────────────────────────────┘
                           │
                           ▼
              ┌────────────────────────┐
              │ model.track(frame)     │
              │ classes=[0, 1]         │
              └───────────┬────────────┘
                          │
                          ▼
         ┌────────────────────────────────┐
         │ Results contain bounding boxes │
         │ with class IDs and confidence  │
         └──────────────┬─────────────────┘
                        │
        ┌───────────────┴───────────────┐
        │                               │
        ▼                               ▼
┌───────────────┐              ┌───────────────┐
│ Class 0       │              │ Class 1       │
│ "person"      │              │ "dangerous_   │
│ conf >= 0.40  │              │  weapon"      │
│               │              │ conf >= 0.55  │
└───────┬───────┘              └───────┬───────┘
        │                              │
        │    ┌─────────────────────────┘
        │    │
        ▼    ▼
┌────────────────────────────────────┐
│ Spatial Association Algorithm      │
│                                    │
│ For each weapon W:                 │
│   For each person P:               │
│                                    │
│     Check 1: IoU Overlap           │
│     ├─ Calculate intersection      │
│     ├─ Calculate union             │
│     └─ IoU >= 0.05? → Associated   │
│                                    │
│     Check 2: Center Point          │
│     ├─ Calculate weapon center     │
│     └─ Inside person box? → Assoc  │
│                                    │
│     Check 3: Proximity             │
│     ├─ Calculate min distance      │
│     ├─ Threshold = 30% person H    │
│     └─ Distance < threshold? → Assoc│
│                                    │
│     If ANY check passes:           │
│     └─ Valid pair (P, W, score)    │
└────────────┬───────────────────────┘
             │
             ▼
┌─────────────────────────────────────┐
│ Valid Pairs Found?                  │
└────────────┬────────────────────────┘
             │
    ┌────────┴────────┐
    │                 │
    ▼                 ▼
  NO               YES
    │                 │
    │                 ▼
    │    ┌──────────────────────────┐
    │    │ Find best pair:          │
    │    │ - Highest weapon conf    │
    │    │ - Highest association    │
    │    └──────────┬───────────────┘
    │               │
    │               ▼
    │    ┌──────────────────────────┐
    │    │ Better than window best? │
    │    └──────────┬───────────────┘
    │               │
    │       ┌───────┴───────┐
    │       │               │
    │       ▼               ▼
    │     NO              YES
    │       │               │
    │       │               ▼
    │       │    ┌────────────────────┐
    │       │    │ Update window best │
    │       │    │ - Store frame      │
    │       │    │ - Store confidence │
    │       │    └─────────┬──────────┘
    │       │              │
    ▼       ▼              ▼
┌─────────────────────────────────────┐
│ Annotate frame (green boxes)        │
└────────────┬────────────────────────┘
             │
             ▼
┌─────────────────────────────────────┐
│ Check: 30 seconds passed since      │
│        window start?                │
└────────────┬────────────────────────┘
             │
    ┌────────┴────────┐
    │                 │
    ▼                 ▼
   NO               YES
    │                 │
    │                 ▼
    │    ┌──────────────────────────┐
    │    │ Window has detection?    │
    │    └──────────┬───────────────┘
    │               │
    │       ┌───────┴───────┐
    │       │               │
    │       ▼               ▼
    │      NO             YES
    │       │               │
    │       │               ▼
    │       │    ┌────────────────────┐
    │       │    │ In cooldown?       │
    │       │    └─────────┬──────────┘
    │       │              │
    │       │      ┌───────┴───────┐
    │       │      │               │
    │       │      ▼               ▼
    │       │    YES             NO
    │       │      │               │
    │       │      │               ▼
    │       │      │    ┌─────────────────┐
    │       │      │    │ EMIT ALERT!     │
    │       │      │    │ - Save event    │
    │       │      │    │ - Reset window  │
    │       │      │    │ - Start cooldown│
    │       │      │    └────────┬────────┘
    │       │      │             │
    ▼       ▼      ▼             ▼
┌──────────────────────────────────────┐
│ Continue to next frame               │
└──────────────────────────────────────┘
```

## 📡 API Endpoints

```
Flask Server (localhost:5000)
│
├─ GET /
│  └─ API documentation
│
├─ GET /video_feed/<feed_id>?source=camera
│  └─ MJPEG stream with YOLO annotations
│
├─ GET /api/feeds
│  └─ List all feeds with status
│
├─ GET /api/detections
│  └─ Get last 50 detections
│
├─ GET /api/detections/latest
│  └─ Get most recent detection
│
├─ GET /api/capture/<feed_id>?source=camera
│  └─ Capture screenshot (JPEG)
│
├─ GET /api/feed/<feed_id>/snapshot
│  └─ Get base64 snapshot (JSON)
│
└─ GET /api/health
   └─ Server health check
```

## ⏱️ Timeline Example

```
Time    Event
─────   ─────────────────────────────────────────────────────────
0:00    User enables weapon detection
0:01    Browser releases webcam
0:02    Flask server acquires webcam
0:03    YOLO starts processing frames
0:05    Frame 100: Person detected (conf=0.85)
0:06    Frame 120: Weapon detected (conf=0.72)
0:07    Frame 140: Person + Weapon together!
        └─ Association score: 0.89 (weapon center in person box)
        └─ Store as window best
0:10    Frame 200: Better detection found (conf=0.81, score=0.95)
        └─ Update window best
0:15    Frame 300: Still monitoring...
0:30    30 seconds elapsed!
        └─ Check: Window has best detection? YES
        └─ Check: In cooldown? NO
        └─ EMIT ALERT! 🚨
        └─ Save to detection_events[]
        └─ Start 30s cooldown
        └─ Reset window
0:45    Frame 450: New detection, but in cooldown (skip)
1:00    Cooldown expires, ready for next alert
```

## 🎬 Success Flow

```
1. Start Flask Server
   ✅ Model loaded
   ✅ All feeds initialized
   ✅ Background monitoring started

2. Open Dashboard
   ✅ Login as organization
   ✅ Navigate to Live CCTV
   ✅ See Feed 4 with browser webcam

3. Enable Detection
   ✅ Toggle weapon detection ON
   ✅ Browser releases webcam
   ✅ Flask server streams back
   ✅ Badge changes to "AI DETECTION ACTIVE"

4. Show Weapon
   ✅ Hold weapon in view
   ✅ Person detected (green box)
   ✅ Weapon detected (green box)
   ✅ Association check passes
   ✅ Both boxes turn red
   ✅ "DANGER!" label appears

5. Wait 30 Seconds
   ✅ System accumulates best detection
   ✅ Timer reaches 30s
   ✅ Alert emitted
   ✅ Evidence screenshot captured
   ✅ Sent to Supabase
   ✅ Cooldown starts

6. View Alert
   ✅ Alert appears in dashboard
   ✅ Evidence section updated
   ✅ Alarm sounds (if configured)
   ✅ Admin notified
```

---

**Legend:**
- 🎥 = Webcam/Video
- 🤖 = AI/YOLO
- 🚨 = Alert/Detection
- ✅ = Success
- ❌ = Error
- 🔄 = Processing
- ⏱️ = Timing
