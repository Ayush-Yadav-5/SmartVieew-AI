# Evidence Capture Source Fix - Complete

## Problem Fixed
The weapon detection system was capturing screenshots from the wrong camera source when both person and weapon were detected. When Feed 6 (Airport Terminal) detected both person + weapon from a **Camera Feed** (webcam/live camera), the system would sometimes capture a screenshot from the **Video Feed** (YouTube) instead, which only showed a person without the weapon.

## Root Cause
When both camera and video streams were running simultaneously for the same feed ID:
- Frontend called `/api/capture/6` without specifying which source (camera or video)
- Backend would find the first active stream matching the feed ID
- This could be the video stream instead of the camera stream where the actual detection occurred
- Result: Wrong screenshot captured (person only, no weapon)

## Solution Implemented

### 1. Backend Fix (weapon-detection-server.py)
Updated the `/api/capture/<int:feed_id>` endpoint to accept a `source` query parameter:

```python
@app.route('/api/capture/<int:feed_id>')
def capture_screenshot(feed_id):
    """Capture screenshot from active detection stream - returns BEST quality detection frame"""
    # Get source parameter to capture from correct stream (camera or video)
    source_type = request.args.get('source', None)  # 'camera' or 'video'
    
    # Try to find the specific stream
    stream = None
    
    if source_type:
        # Look for specific source type
        stream_key = f"{feed_id}_{source_type}"
        stream = active_streams.get(stream_key)
        print(f"🎯 Capture request for feed {feed_id} from {source_type} feed - Found: {stream is not None}")
    else:
        # Fallback: Try both camera and video stream (prefer camera first for live feeds)
        camera_key = f"{feed_id}_camera"
        video_key = f"{feed_id}_video"
        
        # Try camera first (live feed)
        if camera_key in active_streams:
            stream = active_streams[camera_key]
            print(f"📸 Capture from camera feed {feed_id}")
        # Then try video
        elif video_key in active_streams:
            stream = active_streams[video_key]
            print(f"🎥 Capture from video feed {feed_id}")
```

**Key improvements:**
- Accepts `?source=camera` or `?source=video` query parameter
- Explicitly searches for the correct stream key (`feed_id_camera` or `feed_id_video`)
- Provides clear logging showing which source is being captured
- Falls back to camera first if no source specified (prioritizes live feeds)

### 2. Frontend Fix (CCTVFeedSection.tsx)
Updated the `captureScreenshot()` function to pass the correct source type:

```typescript
const captureScreenshot = async (feedId: number, detection: Detection): Promise<string> => {
  try {
    // Determine which source to capture from based on detection source_type
    const sourceType = detection.source_type === 'Camera Feed' ? 'camera' : 'video';
    
    console.log(`📸 Capturing screenshot from Feed ${feedId} - Source: ${detection.source_type} (${sourceType})`);
    
    // Try to capture from weapon detection stream with correct source parameter
    const response = await fetch(`${WEAPON_DETECTION_API}/api/capture/${feedId}?source=${sourceType}`);
    if (response.ok) {
      const blob = await response.blob();
      console.log(`✅ Screenshot captured successfully from ${detection.source_type}`);
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(blob);
      });
    } else {
      console.error(`Failed to capture from ${detection.source_type}:`, response.status);
    }
  } catch (error) {
    console.error('Failed to capture from API, using fallback:', error);
  }
  // ... fallback code ...
}
```

**Key improvements:**
- Reads `source_type` from detection event ('Camera Feed' or 'Video Feed')
- Converts to API parameter format ('camera' or 'video')
- Passes correct source to backend via query parameter
- Provides clear logging for debugging

## How It Works Now

### Detection Flow
1. **Weapon detection occurs** in either:
   - Camera stream (webcam/live camera) → `source_type: 'Camera Feed'`
   - Video stream (YouTube) → `source_type: 'Video Feed'`

2. **Detection event is stored** with `source_type` field:
   ```python
   event = {
       'feed_id': 6,
       'timestamp': '2024-01-15T10:30:45',
       'detections': [...],
       'has_dangerous_weapon': True,
       'has_person': True,
       'source_type': 'Camera Feed'  # ← Tracks which source detected it
   }
   ```

3. **Frontend receives detection** and extracts source type:
   ```typescript
   const sourceType = detection.source_type === 'Camera Feed' ? 'camera' : 'video';
   ```

4. **Screenshot capture** targets correct source:
   ```
   GET /api/capture/6?source=camera  ← Camera stream
   GET /api/capture/6?source=video   ← Video stream
   ```

5. **Backend finds exact stream**:
   ```python
   stream_key = f"{feed_id}_{source_type}"  # "6_camera" or "6_video"
   stream = active_streams.get(stream_key)
   ```

6. **Evidence captured** from correct source with weapon + person visible

## Testing Instructions

### 1. Start the Detection Server
```bash
python weapon-detection-server.py
```

### 2. Enable Both Streams
When you enable weapon detection in the dashboard, it automatically starts BOTH:
- Camera stream: `http://localhost:5000/video_feed/6?source=camera`
- Video stream: `http://localhost:5000/video_feed/6?source=video`

### 3. Trigger Detection
- **Camera Feed (Webcam)**: Point webcam at person holding a weapon-like object
- **Video Feed (YouTube)**: The Airport Terminal video will detect weapons automatically

### 4. Verify Correct Capture
Check the console logs:

**Expected for Camera detection:**
```
📸 Capturing screenshot from Feed 6 - Source: Camera Feed (camera)
🎯 Capture request for feed 6 from camera feed - Found: True
✅ Best frame captured from Camera feed 6 - Resetting for next detection
```

**Expected for Video detection:**
```
📸 Capturing screenshot from Feed 6 - Source: Video Feed (video)
🎯 Capture request for feed 6 from video feed - Found: True
✅ Best frame captured from Video feed 6 - Resetting for next detection
```

### 5. Check Evidence Section
- Screenshot should show the frame where BOTH person AND weapon are visible
- Tags should include the correct source type: 'Camera Feed' or 'Video Feed'

## Key Benefits

✅ **Correct Source Targeting**: Screenshots always captured from the exact source where detection occurred
✅ **No More Mismatches**: Camera detections capture camera frames, video detections capture video frames
✅ **Clear Logging**: Console shows exactly which source is being captured from
✅ **Backward Compatible**: Falls back to camera if source not specified
✅ **Evidence Accuracy**: Evidence section shows actual detection frames with both person + weapon

## API Changes

### Endpoint: `/api/capture/<feed_id>`
**New Query Parameter:**
- `source` (optional): Either 'camera' or 'video'
- Example: `/api/capture/6?source=camera`
- Default: Falls back to camera first, then video

### Response
- Returns high-quality JPEG (95% quality) of best detection frame
- Resets best frame counter after capture
- Returns 404 if feed not active or source not found

## Live Monitoring

Both camera and video feeds continue to run simultaneously in background:
- **Live CCTV section**: Shows clean YouTube feeds (no detection overlay)
- **Background detection**: AI processes BOTH camera and video in parallel
- **Evidence capture**: Targets the exact source where detection occurred
- **User experience**: Seamless monitoring with accurate evidence collection

## Troubleshooting

### Issue: Screenshot shows wrong content
**Check:**
1. Console log showing capture source
2. Detection event `source_type` field
3. Active streams on backend (`/api/feeds`)

### Issue: 404 error on capture
**Reason:** Stream not active for specified source
**Solution:** Verify both camera and video streams are running via backend logs

### Issue: Both sources detecting differently
**Expected behavior:** Different sources may detect at different times:
- Camera feed: Live webcam input (real-time)
- Video feed: YouTube stream (pre-recorded)
- System correctly captures from the source that made the detection

## Related Files
- `/weapon-detection-server.py` - Backend Flask server
- `/components/CCTVFeedSection.tsx` - Frontend CCTV component
- `/components/EvidenceSection.tsx` - Evidence display

## Status
✅ **COMPLETE** - Evidence capture now correctly identifies and captures from the exact camera/video source where person + weapon detection occurred.
