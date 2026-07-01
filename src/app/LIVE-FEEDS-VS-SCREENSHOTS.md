# Live Feeds vs Screenshots - Clear Explanation

## The Confusion Explained

### What You See in CCTV Tab = LIVE VIDEO STREAM (NOT A SCREENSHOT!)

```
┌─────────────────────────────────────────────┐
│  CCTV Feed Tab - Camera 1                   │
│  ┌─────────────────────────────────────┐    │
│  │  🎥 CONTINUOUS VIDEO STREAM          │    │
│  │                                      │    │
│  │  [Person walking]  ← Bounding box   │    │
│  │   └─ Person: 95%                     │    │
│  │                                      │    │
│  │  This is LIVE video with AI          │    │
│  │  annotations, NOT a screenshot!      │    │
│  │                                      │    │
│  │  Video NEVER stops                   │    │
│  └─────────────────────────────────────┘    │
│  🟢 LIVE  🔴 AI SCAN                         │
└─────────────────────────────────────────────┘

This is what plays continuously in the browser
Source: http://localhost:5000/video_feed/1
Format: Motion JPEG stream (mjpeg)
```

### What Happens When Detection Occurs

```
Step 1: AI Detects Person + Weapon
┌─────────────────────────────────────────────┐
│  Live Feed (keeps running)                   │
│  ┌─────────────────────────────────────┐    │
│  │  🎥 VIDEO CONTINUES                  │    │
│  │                                      │    │
│  │  [Person with weapon]                │    │
│  │   └─ Person: 92%  ← Bounding boxes  │    │
│  │   └─ Weapon: 87%  ← Still live!     │    │
│  │                                      │    │
│  └─────────────────────────────────────┘    │
└─────────────────────────────────────────────┘
        ↓
Step 2: Screenshot Captured (Background)
        ↓
Step 3: Screenshot Sent to Evidence Section
┌─────────────────────────────────────────────┐
│  Evidence Section                            │
│  ┌─────────────────────────────────────┐    │
│  │  📸 SCREENSHOT (Static Image)        │    │
│  │                                      │    │
│  │  [Frozen frame of detection]         │    │
│  │   Captured at: 14:32:15              │    │
│  │   Confidence: 87%                    │    │
│  │                                      │    │
│  └─────────────────────────────────────┘    │
│  Title: Weapon + Person Detection           │
│  Location: Main Street Intersection          │
└─────────────────────────────────────────────┘

Meanwhile, the live feed CONTINUES playing!
```

## Key Differences

| Feature | Live CCTV Feed | Evidence Screenshot |
|---------|----------------|---------------------|
| **Type** | Continuous video stream | Single static image |
| **Location** | CCTV Tab | Evidence Tab |
| **Updates** | 30 frames per second | Once, when captured |
| **Stops?** | NO - runs forever | YES - it's a photo |
| **Bounding boxes** | Drawn on every frame | Drawn once on capture |
| **Source** | `/video_feed/{id}` endpoint | `/api/capture/{id}` endpoint |
| **Purpose** | Real-time monitoring | Historical evidence |

## What The User Sees

### In CCTV Tab (Always Visible)
```
┌────────────────────────────────────────────────────────┐
│ Main Street Intersection      🟢 LIVE  🔴 AI SCAN      │
│ ┌────────────────────────────────────────────────┐    │
│ │                                                 │    │
│ │      [Live video with bounding boxes]          │    │
│ │           (Video keeps playing)                │    │
│ │                                                 │    │
│ └────────────────────────────────────────────────┘    │
│ Location: Downtown District                            │
│ Last activity: Live Stream                             │
└────────────────────────────────────────────────────────┘
```

### In Evidence Tab (After Detection)
```
┌────────────────────────────────────────────────────────┐
│ Evidence Section - Recent Detections                   │
│                                                         │
│ ┌──────────────┐  ┌──────────────┐                    │
│ │ 📸 Detection  │  │ 📸 Detection  │                    │
│ │ [Screenshot]  │  │ [Screenshot]  │                    │
│ │ 14:32:15      │  │ 14:28:03      │                    │
│ │ Weapon: 87%   │  │ Weapon: 92%   │                    │
│ └──────────────┘  └──────────────┘                    │
│                                                         │
│ These are STATIC images captured at specific moments   │
└────────────────────────────────────────────────────────┘
```

## Technical Flow

### Live Video Feed (Continuous)
```python
# In weapon-detection-server.py
def generate_frames(feed_id):
    while True:  # ← Infinite loop = continuous video
        frame = stream.get_frame()
        
        # AI detection happens here
        if weapon and person detected:
            # Save detection event
            detection_events.append(event)
        
        # Always return the frame (with bounding boxes)
        yield frame  # ← This keeps the video playing
        
        time.sleep(0.03)  # ~30 FPS
```

### Screenshot Capture (One-time)
```typescript
// In CCTVFeedSection.tsx
const captureScreenshot = async (feedId: number) => {
    // This captures ONE frame from the stream
    const response = await fetch(
        `${WEAPON_DETECTION_API}/api/capture/${feedId}`
    );
    
    // Convert to image
    const blob = await response.blob();
    const screenshot = await blobToDataURL(blob);
    
    // Send ONLY to Evidence Section
    onNewEvidence(evidenceItem);
    
    // Live feed continues independently!
};
```

## Common Misconceptions

### ❌ WRONG: "When detection occurs, the feed shows a screenshot"
**Reality:** The feed shows continuous video. The bounding boxes you see are drawn on each frame in real-time.

### ❌ WRONG: "The live feed stops when a screenshot is taken"
**Reality:** The feed never stops. Screenshot capture happens in the background.

### ❌ WRONG: "Screenshots appear in the CCTV tab"
**Reality:** Screenshots ONLY appear in the Evidence Section tab.

### ✅ CORRECT: "The live feed shows continuous video with real-time bounding boxes, and when detections occur, a screenshot is captured and sent to the Evidence Section while the live feed continues running"

## Visual Summary

```
┌─────────────────────────────────────────────────────────┐
│                    Your Browser                         │
│                                                          │
│  Tab 1: CCTV Feeds                Tab 2: Evidence       │
│  ┌──────────────────────┐         ┌──────────────┐     │
│  │ 🎥 LIVE VIDEO        │         │ 📸 Screenshot │     │
│  │    (streaming)       │         │    (static)   │     │
│  │                      │         │               │     │
│  │  Plays continuously  │         │  Saved moment │     │
│  │  Never stops         │         │  Fixed image  │     │
│  │  ~30 FPS             │         │  One frame    │     │
│  └──────────────────────┘         └──────────────┘     │
│           ↑                              ↑              │
│           │                              │              │
│     Always running              Only when detected      │
│                                                          │
└─────────────────────────────────────────────────────────┘
                            │
                            ↓
            ┌───────────────────────────┐
            │  Flask Detection Server   │
            │  localhost:5000           │
            │                           │
            │  Streams video frames     │
            │  Captures screenshots     │
            └───────────────────────────┘
```

## Analogy

Think of it like this:

**Live CCTV Feed** = Watching a live TV broadcast with subtitles (bounding boxes)
- The show keeps playing
- Subtitles appear and disappear
- You're watching it happen in real-time

**Evidence Screenshot** = Taking a photo of your TV screen
- You capture one moment
- The photo is saved to your photo album
- The TV show continues playing regardless

The CCTV feeds are the TV, and the Evidence Section is your photo album!

## Summary

✅ **CCTV Tab** = Live continuous video with real-time AI annotations
✅ **Evidence Tab** = Static screenshot images captured at detection moments
✅ **Video streams NEVER stop**, even when screenshots are taken
✅ **Screenshots ONLY appear in Evidence Section**, never in CCTV feeds
✅ **Bounding boxes on live feeds** = Real-time AI annotations, NOT screenshots

**The system is working correctly as designed!**
