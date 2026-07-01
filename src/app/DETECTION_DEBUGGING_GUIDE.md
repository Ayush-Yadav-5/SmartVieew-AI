# 🔍 Detection Debugging Guide

## Issue: "Latest Detection" shows "Waiting..." even when backend is detecting

### Step-by-Step Troubleshooting:

---

## 1️⃣ **Check Backend is Running**

Open terminal and run:
```bash
python weapon-detection-server.py
```

You should see:
```
🚀 Starting server and background monitoring...
✅ Feed 1 started successfully (Video Stream)
✅ Feed 2 started successfully (Video Stream)
✅ Feed 3 started successfully (Video Stream)
✅ Feed 4 started successfully (Webcam)
✅ Feed 5 started successfully (Video Stream)
✅ Feed 6 started successfully (Video Stream)
```

---

## 2️⃣ **Enable Weapon Detection in Frontend**

1. Click "Enable Weapon Detection" button
2. Watch the browser console for:
   ```
   🚀 Opening SSE connection to backend for real-time alerts...
   ✅ SSE connection established successfully
   🚀 Frontend detection monitoring STARTED - Polling every 2 seconds
   ```

3. Check the "Frontend Monitoring Status" panel:
   - **🔔 Real-time SSE**: Should show "Connected" (green)
   - **🔄 Polling (Fallback)**: Should show "Active (2s)" (green)
   - **Backend Server**: Should show "Connected" (green)

---

## 3️⃣ **Click "🔍 Debug Backend" Button**

This button is in the Frontend Monitoring Status panel. Click it and check console:

```
🔍 ========== MANUAL BACKEND CHECK ==========
📊 Health: {
  status: 'running',
  model_loaded: true,
  active_streams: 6,
  total_detections: 0
}
📹 Feeds: {
  feeds: [
    { id: 1, status: 'active', detection_count: 0 },
    { id: 2, status: 'active', detection_count: 0 },
    ...
  ]
}
🔔 Detections: {
  detections: []
}
   Total detections: 0
============================================
```

**Key Things to Check:**
- ✅ `model_loaded: true` - YOLO model is loaded
- ✅ `active_streams: 6` - All 6 feeds are monitoring
- ❓ `total_detections: 0` - No detections yet (this is normal if no weapons detected)

---

## 4️⃣ **Check Backend Console for Detection Activity**

In your **backend terminal**, you should see:

```
🎯 Feed 5: New best detection - weapon_conf=0.850, association=0.950
⚠️  ALERT: Feed 5 - Weapon detected with conf=0.85, association=0.95
```

If you DON'T see these messages:
- ❌ The video feeds might not contain detectable weapons
- ❌ The confidence thresholds might be too high
- ❌ Feed 5 (the weapon detection video) might not be playing

---

## 5️⃣ **Watch for Real-time Alerts**

When backend detects a weapon, you'll see in **frontend console**:

```
🔔 ========== REAL-TIME ALERT RECEIVED VIA SSE ==========
   Feed ID: 5
   Timestamp: 2025-11-11T...
   Weapon Conf: 0.85
   Has Person: true
   Has Weapon: true
==========================================================
```

**AND** you should see:
- 🔊 Alarm sound plays
- 🍞 Toast notification appears
- 📸 Screenshot captured
- 📋 Evidence added to Evidence Section
- ✅ "Latest Detection" updates to show "Feed 5 - [time]"

---

## 6️⃣ **Common Issues & Solutions**

### Issue: "Latest Detection" always shows "Waiting..."

**Possible causes:**

1. **Backend hasn't detected anything yet**
   - Solution: Wait for detections, or use Feed 5 which has weapons
   - Feed 5 video: https://youtube.com/shorts/myXiZTDSo-E

2. **Backend monitoring threads not running**
   - Check backend console for "Worker started for feed X"
   - Should see 6 worker threads running

3. **SSE connection not established**
   - Check if "🔔 Real-time SSE" shows "Connected"
   - Check browser console for "✅ SSE connection established"

4. **CORS issues**
   - Backend should have `flask-cors` installed
   - Check browser console for CORS errors

5. **Cooldown preventing updates**
   - 30-second cooldown per feed
   - Wait 30 seconds between detections from same feed

---

## 7️⃣ **Force a Detection (Testing)**

To test if the system works:

1. Make sure Feed 5 is running (weapon detection video)
2. Wait 30 seconds for cooldown window
3. Watch backend console for:
   ```
   ⚠️  ALERT: Feed 5 - Weapon detected
   ```
4. Frontend should immediately show alert

---

## 8️⃣ **Check Network Tab**

Open browser DevTools → Network tab:

1. **SSE Connection**: Look for `alerts/stream` with status "pending" (this is normal for SSE)
2. **Polling**: Look for `detections` requests every 2 seconds
3. **Health checks**: `health` requests every 10 seconds

---

## 9️⃣ **Verify Backend Alert Emission**

In backend console, add this check:

```python
# After line 298 in weapon-detection-server.py
print(f"📤 SSE Event emitted: {event}")
```

You should see events being added to the queue when detections occur.

---

## 🔟 **Manual SSE Test**

Test SSE directly in browser console:

```javascript
const es = new EventSource('http://localhost:5000/api/alerts/stream');
es.addEventListener('detection', (evt) => {
  console.log('SSE DETECTION:', JSON.parse(evt.data));
});
es.onopen = () => console.log('SSE CONNECTED');
es.onerror = (e) => console.error('SSE ERROR:', e);
```

If this works, the issue is in the React component. If not, backend SSE is broken.

---

## ✅ Expected Behavior When Working:

1. Backend continuously monitors all 6 feeds
2. When weapon+person detected:
   - Backend emits SSE event immediately
   - Frontend receives SSE event within 500ms
   - Alarm plays, toast shows, screenshot captured
   - "Latest Detection" updates to show feed and time
3. Polling runs as backup every 2 seconds
4. Cooldown prevents spam (30s per feed)

---

## 📞 Still Not Working?

Run the "🔍 Debug Backend" button and share:
1. Health status
2. Active streams count
3. Detection count
4. Any console errors

The issue is likely:
- Backend not detecting (check thresholds)
- SSE not connecting (check CORS)
- State not updating (check React dependencies)
