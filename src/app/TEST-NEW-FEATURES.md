# Test New Features - Quick Guide

## 🎯 What to Test

You now have 4 major improvements to test:

1. ✅ **Google Maps API** - Fixed and configured
2. ✅ **Notification Cooldown** - No more spam
3. ✅ **Duplicate Evidence Prevention** - Clean database
4. ✅ **Best Frame Capture** - High-quality screenshots

---

## 🗺️ Test 1: Google Maps Integration

### Steps:
1. Open CrimeShield Dashboard
2. Navigate to "Crime Hotspot & Threat Map" section
3. Select a location from dropdown (e.g., "Delhi", "Maharashtra")
4. Map should load without errors

### Expected Results:
✅ Google Maps loads successfully (no InvalidKey error)
✅ Crime zones displayed as markers
✅ Heatmap layer visible
✅ Map is interactive (zoom/pan)
✅ No warning banner about API key

### If Issues:
- Check console for errors
- Verify `.env` file exists with API key
- Restart development server
- Click "Custom Map" toggle as fallback

---

## ⏱️ Test 2: Notification Cooldown System

### Steps:
1. Enable "Weapon Detection" toggle
2. Wait for detection on any camera
3. Observe notification behavior
4. Check cooldown badge on camera feed

### Expected Results:
✅ First detection → Alert notification + Alarm sound
✅ Toast shows: "Next alert in 30s"
✅ Yellow cooldown badge appears: "Cooldown: 27s"
✅ Badge counts down every second
✅ No more alerts for 30 seconds
✅ Console log: "⏱️ Cooldown active for Feed X"
✅ After 30s → Badge disappears, next alert allowed

### Verification Console Logs:
```
⏱️ Cooldown active for Feed 3 (27s remaining)
⏱️ Cooldown active for Feed 3 (24s remaining)
⏱️ Cooldown active for Feed 3 (21s remaining)
```

---

## 🚫 Test 3: Duplicate Evidence Prevention

### Steps:
1. Keep weapon detection enabled
2. Let system detect weapons continuously on one camera
3. Go to "Evidence Section"
4. Count evidence entries from same camera

### Expected Results:
✅ Only 1 evidence entry per 60 seconds per camera
✅ Console shows: "🚫 Evidence already submitted for Feed X in current time window (60s)"
✅ Database stays clean
✅ Evidence entries are spaced 1 minute apart

### Before vs After:
**Before:** 50 detections → 50 evidence entries 😵
**After:** 50 detections → 1-2 evidence entries ✅

### Verification Console Logs:
```
✅ Evidence submitted for Feed 2 - ID: 2-123456-weapon-person
🚫 Evidence already submitted for Feed 2 in current time window (60s)
🚫 Evidence already submitted for Feed 2 in current time window (60s)
```

---

## 📸 Test 4: Best Frame Capture

### Steps:
1. Enable weapon detection
2. Watch console for detection logs
3. Look for "Best frame updated" messages
4. When screenshot is captured, check Evidence Section
5. Verify image quality

### Expected Results:
✅ Console shows: "📸 Best frame updated for feed X - Confidence: 0.91"
✅ Screenshot in Evidence Section is clear and high-quality
✅ Weapon and person clearly visible
✅ Bounding boxes and labels visible
✅ Confidence score displayed
✅ 95% JPEG quality

### Verification Console Logs:
```
📸 Best frame updated for feed 2 - Confidence: 0.76
📸 Best frame updated for feed 2 - Confidence: 0.85
📸 Best frame updated for feed 2 - Confidence: 0.91
✅ Best frame captured for feed 2 - Resetting for next detection
```

---

## 🎨 Visual Verification Guide

### Camera Feed with Cooldown:
```
┌──────────────────────────────────────┐
│  🔴 LIVE          HIGH RISK          │
│                                      │
│      [CAMERA VIDEO FEED]             │
│                                      │
│  ⚠ 5 DETECTIONS   Cooldown: 12s 🟡  │
└──────────────────────────────────────┘
        ↑                    ↑
   Detection count      Cooldown timer
```

### Notification Toast:
```
┌────────────────────────────────────────────┐
│  ⚠️ DANGEROUS WEAPON + PERSON DETECTED!    │
│  Main Street Intersection - Conf: 87%      │
│  Next alert in 30s ← CHECK THIS           │
└────────────────────────────────────────────┘
```

### Evidence Entry Quality:
```
┌────────────────────────────────────────────┐
│  [CLEAR, HIGH-QUALITY SCREENSHOT]          │
│  ↑                                         │
│  Should be crystal clear, not blurry       │
│  Weapon and person clearly visible         │
│  Bounding boxes + labels present           │
└────────────────────────────────────────────┘
```

---

## 🔍 Complete Test Scenario

### Full End-to-End Test:

**Time 0:00** - Enable weapon detection
- ✅ System starts monitoring all 6 cameras

**Time 0:30** - Camera 2 detects weapon
- ✅ Alert notification appears
- ✅ Toast: "Next alert in 30s"
- ✅ Alarm sound plays ONCE
- ✅ Yellow cooldown badge appears: "Cooldown: 30s"
- ✅ Evidence captured and saved
- ✅ Console: "✅ Evidence submitted for Feed 2 - ID: 2-123456-weapon-person"

**Time 0:45** - Camera 2 still detecting weapon
- ✅ NO notification (cooldown active)
- ✅ Badge shows: "Cooldown: 15s"
- ✅ Console: "⏱️ Cooldown active for Feed 2 (15s remaining)"
- ✅ NO evidence captured (duplicate prevented)
- ✅ Console: "🚫 Evidence already submitted for Feed 2 in current time window"

**Time 1:00** - Cooldown expires
- ✅ Badge disappears
- ✅ System ready for next alert

**Time 1:05** - Camera 2 detects weapon again
- ✅ Alert notification appears (cooldown expired)
- ✅ NO evidence captured yet (still in 60s window)
- ✅ Console: "🚫 Evidence already submitted for Feed 2 in current time window"

**Time 1:35** - Evidence window expires
- ✅ System ready for new evidence

**Time 1:40** - Camera 2 detects weapon again
- ✅ Alert notification appears
- ✅ Evidence captured and saved (new time window)
- ✅ Console: "✅ Evidence submitted for Feed 2 - ID: 2-123457-weapon-person"

**Time 2:00** - Camera 5 detects weapon
- ✅ Alert notification appears (independent cooldown)
- ✅ Evidence captured and saved (different camera)
- ✅ Both Camera 2 and Camera 5 can alert simultaneously

---

## 📊 Success Criteria Checklist

After testing, verify:

### Google Maps:
- [ ] Map loads without errors
- [ ] Crime markers displayed correctly
- [ ] Heatmap layer visible
- [ ] Map is interactive
- [ ] No API key warnings

### Cooldown System:
- [ ] Notifications appear only every 30s per camera
- [ ] Cooldown badge visible during cooldown
- [ ] Badge counts down correctly
- [ ] Alarm plays only once per cycle
- [ ] Console shows cooldown logs

### Duplicate Prevention:
- [ ] Only 1 evidence per 60s per camera
- [ ] Console shows "Evidence already submitted" for duplicates
- [ ] Database stays clean
- [ ] Evidence entries properly spaced

### Screenshot Quality:
- [ ] Evidence images are clear and high-quality
- [ ] Weapon and person clearly visible
- [ ] Bounding boxes present
- [ ] Confidence scores displayed
- [ ] Console shows "Best frame updated"

### Multi-Camera:
- [ ] Each camera has independent cooldown
- [ ] Multiple cameras can alert simultaneously
- [ ] No cross-camera interference
- [ ] Each camera tracked separately

---

## 🐛 Troubleshooting

### Problem: Map not loading
**Fix:** 
- Check `.env` file exists
- Verify API key is correct
- Restart development server
- Use "Custom Map" toggle as fallback

### Problem: Still getting continuous notifications
**Fix:**
- Check `NOTIFICATION_COOLDOWN` in CCTVFeedSection.tsx
- Ensure it's set to `30000` (30 seconds)
- Restart application
- Clear browser cache

### Problem: Evidence still duplicating
**Fix:**
- Check `EVIDENCE_UNIQUENESS_WINDOW` in CCTVFeedSection.tsx
- Ensure it's set to `60000` (60 seconds)
- Check console for uniqueness logs
- Verify evidence IDs are being tracked

### Problem: Low quality screenshots
**Fix:**
- Check `JPEG_QUALITY` in weapon-detection-server.py
- Should be `95` or higher
- Restart Python server
- Check "Best frame updated" logs

---

## 📈 Performance Monitoring

### Monitor These Metrics:

**Before Improvements:**
- Notifications: 20+ per minute
- Evidence entries: 100+ per 10 minutes
- Database size: 1GB per day
- User experience: Alert fatigue

**After Improvements (Target):**
- Notifications: 2-4 per minute
- Evidence entries: 10-20 per 10 minutes
- Database size: 100-200MB per day
- User experience: Clear, actionable alerts

---

## 🎯 Quick Test Commands

### Test Google Maps:
1. Open browser console
2. Go to Crime Hotspot section
3. Look for: "Google Maps loaded successfully" ✅
4. No errors about InvalidKey ✅

### Test Cooldown:
1. Open browser console
2. Enable weapon detection
3. Look for: "⏱️ Cooldown active for Feed X" ✅
4. Check cooldown badge on UI ✅

### Test Evidence Prevention:
1. Open browser console
2. Keep detection running
3. Look for: "🚫 Evidence already submitted" ✅
4. Count evidence entries in UI ✅

### Test Screenshot Quality:
1. Open Evidence Section
2. Click on any evidence entry
3. Image should be crystal clear ✅
4. Weapon and person visible ✅

---

## ✅ Final Verification

All systems working when:

1. ✅ Google Maps loads without errors
2. ✅ Cooldown badge appears after detection
3. ✅ Only 1 notification per 30 seconds per camera
4. ✅ Only 1 evidence per 60 seconds per camera
5. ✅ Screenshots are high quality
6. ✅ Console logs confirm all systems
7. ✅ Database stays clean
8. ✅ User experience is professional

---

## 📞 Need Help?

Check these files for detailed documentation:
- `/DETECTION-IMPROVEMENTS.md` - Technical details
- `/QUICK-DETECTION-FIX.md` - Quick reference
- `/DETECTION-FIX-SUMMARY.md` - Complete summary
- `/GOOGLE-MAPS-SETUP.md` - Maps setup guide

**Everything is ready for testing! Good luck! 🚀**
