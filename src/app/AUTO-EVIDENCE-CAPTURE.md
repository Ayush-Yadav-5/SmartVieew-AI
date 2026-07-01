# 📸 Auto-Evidence Capture System - Complete Guide

## 🎯 Overview

The Auto-Evidence Capture System automatically takes screenshots of detected threats (weapons, persons, etc.) from live CCTV feeds and sends them directly to the Evidence Section with complete detection metadata. **The live video feeds continue monitoring without interruption.**

---

## ✨ Key Features

### 1. **Automatic Screenshot Capture**
- ✅ Captures frame when weapon/person detected
- ✅ No interruption to live video monitoring
- ✅ Instant screenshot generation with detection overlay
- ✅ Sent directly to Evidence Section

### 2. **Rich Detection Metadata**
Each auto-captured evidence includes:
- 📍 Camera location & ID
- ⏰ Exact timestamp of detection
- 🎯 Confidence score for each detected object
- 🏷️ Detection class (weapon type, person, etc.)
- 📊 Bounding box coordinates
- 🔖 Auto-tagged as "auto-captured" + "high-priority"

### 3. **Continuous Monitoring**
- ✅ CCTV feeds run uninterrupted
- ✅ Multiple detections captured automatically
- ✅ Real-time updates to Evidence Section
- ✅ Toast notifications for each capture

---

## 🚀 How It Works

### **Flow Diagram**

```
Live CCTV Feed
    ↓
AI Detection (Weapon/Person)
    ↓
Alarm Sound + Alert Banner
    ↓
Screenshot Captured (Frame)
    ↓
Evidence Item Created
    ├─ Screenshot Image
    ├─ Detection Details
    ├─ Timestamp
    ├─ Location Info
    └─ Confidence Score
    ↓
Sent to Evidence Section
    ↓
Toast Notification: "📸 Screenshot Captured"
    ↓
CCTV Feed Continues Monitoring ✅
```

---

## 📋 Technical Implementation

### **Components Updated**

#### 1. **App.tsx** - State Management
```typescript
// Auto-captured evidence storage
const [autoCapturedEvidence, setAutoCapturedEvidence] = useState<any[]>([]);

// Handler for new evidence
const handleNewEvidence = (evidence: any) => {
  setAutoCapturedEvidence(prev => [evidence, ...prev]);
};
```

#### 2. **CCTVFeedSection.tsx** - Detection & Capture
```typescript
// When detection occurs:
1. Capture screenshot via API or generate placeholder
2. Create evidence item with full metadata
3. Call onNewEvidence callback
4. Show success toast
5. Continue video monitoring
```

#### 3. **EvidenceSection.tsx** - Display & Management
```typescript
// Merge auto-captured with static evidence
const allEvidence = [...autoCapturedEvidence, ...evidenceClips];

// Display with special badges
- "AUTO-CAPTURED" badge
- 📸 Camera icon
- Detection details section
- Updated storage stats
```

---

## 🎨 UI Features

### **Evidence Card Enhancements**

1. **Auto-Capture Badge**
   - Blue badge in top-right: "AUTO-CAPTURED"
   - Camera emoji 📸 in title

2. **Detection Details Section**
   - Shows all detected objects
   - Confidence percentage for each
   - Color-coded by confidence level

3. **Special Styling**
   - Screenshot thumbnails with detection overlay
   - Timestamp shows exact capture time
   - Duration shows "Screenshot" instead of video length

---

## 📊 Evidence Data Structure

```typescript
{
  id: 1730927345000,
  title: "Weapon Detection - Main Street Intersection",
  type: "weapon",
  location: "Downtown District",
  cameraId: "CAM-001",
  timestamp: "2024-11-05 14:23:45",
  duration: "Screenshot",
  confidence: 0.92,
  tags: ["weapon", "auto-captured", "high-priority"],
  thumbnail: "data:image/png;base64,...", // Base64 screenshot
  size: "N/A",
  detectionDetails: [
    {
      class: "handgun",
      confidence: "92.0%",
      bbox: [120, 45, 230, 180]
    }
  ],
  autoCapture: true
}
```

---

## 🔧 API Integration

### **Screenshot Capture Endpoint**
```
GET /api/capture/{feedId}
```

**Response:** Image blob (PNG)

**Fallback:** If API fails, generates canvas-based placeholder with:
- Dark background (#1a1f2e)
- Detection info overlay
- Timestamp and confidence

---

## 🎯 User Experience

### **For Organizations (Admin View)**

#### **During Detection:**
1. 🚨 Alarm sound plays
2. 🔴 Red alert banner shows detection info
3. 📸 Screenshot captured automatically
4. ✅ Toast: "📸 Screenshot Captured - Evidence saved to Evidence Section"
5. 📹 Video continues monitoring

#### **In Evidence Section:**
1. New evidence appears at top of list
2. "AUTO-CAPTURED" badge visible
3. Full detection details displayed
4. Storage stats updated
5. Can view, download, or share

---

## 📱 Testing the Feature

### **Method 1: With Weapon Detection Server**

1. **Start Flask Server:**
   ```bash
   python weapon-detection-server.py
   ```

2. **Enable Weapon Detection:**
   - Go to Live CCTV section
   - Click "Enable Weapon Detection"
   - Wait for server to be online

3. **Trigger Detection:**
   - Detection happens automatically from video feed
   - Screenshot captured immediately
   - Check Evidence Section

### **Method 2: Without Server (Mock Mode)**

Currently uses placeholder images when API unavailable. You can:
- Add mock detection trigger button
- Simulate detections at intervals
- Test with static data

---

## 🛠️ Configuration

### **Capture Settings** (in CCTVFeedSection.tsx)

```typescript
const WEAPON_DETECTION_API = 'http://localhost:5000';
const CHECK_INTERVAL = 3000; // Check every 3 seconds
```

### **Screenshot Quality**
```typescript
canvas.width = 640;  // Adjust resolution
canvas.height = 360;
canvas.toDataURL('image/png'); // Format: png, jpg, webp
```

---

## 📈 Storage Management

### **Auto-Captured Evidence Stats**
- Total Evidence: Shows all clips (static + auto)
- Auto-Captured: Shows only auto-captured count
- Storage tracking
- Filter by "auto-captured" tag

### **Archive Management**
Auto-captured evidence can be:
- ✅ Exported to ZIP
- ✅ Included in reports
- ✅ Archived after 90 days
- ✅ Filtered separately

---

## 🔐 Security Features

1. **Evidence Integrity**
   - Timestamps are immutable
   - Detection metadata preserved
   - Screenshot includes watermark (optional)

2. **Access Control**
   - Only Organizations can see Evidence Section
   - Citizens don't have access
   - Role-based filtering

---

## 🚨 Notifications

### **Toast Notifications:**

1. **Detection Alert:**
   ```
   ⚠️ WEAPON DETECTED!
   Main Street Intersection - Confidence: 92%
   ```

2. **Screenshot Captured:**
   ```
   📸 Screenshot Captured
   Evidence saved to Evidence Section
   ```

3. **Server Status:**
   ```
   ✅ Weapon Detection Enabled
   AI is now monitoring all feeds
   ```

---

## 🎨 Visual Indicators

### **CCTV Feed:**
- 🔴 LIVE badge (red, pulsing)
- ⚡ AI SCAN badge (when detection enabled)
- 🟢 Server Online indicator

### **Evidence Section:**
- 🔵 AUTO-CAPTURED badge (blue)
- 📸 Camera icon
- 🔴 High-priority indicator
- ⏰ Real-time timestamp

---

## 🔄 Continuous Improvement

### **Future Enhancements:**

1. **Video Recording:**
   - Instead of screenshot, capture 10-second clip
   - Include pre-roll (5 seconds before detection)

2. **Multi-Detection:**
   - Track same person across multiple cameras
   - Create evidence trail

3. **AI Analysis:**
   - Automatic threat assessment
   - Pattern recognition
   - Behavioral analysis

4. **Cloud Storage:**
   - Upload to Supabase Storage
   - Signed URLs for sharing
   - Automatic backup

---

## 🐛 Troubleshooting

### **Issue: Screenshots not appearing**
**Solution:**
- Check if onNewEvidence callback is connected
- Verify autoCapturedEvidence prop is passed
- Check console for errors

### **Issue: Black screenshots**
**Solution:**
- API endpoint may be failing
- Fallback canvas generation activates
- Check Flask server status

### **Issue: CCTV feed stops during capture**
**Solution:**
- This shouldn't happen!
- Capture is asynchronous
- Check for blocking code in detection loop

---

## 📝 Summary

### **What Changed:**

✅ **No more interruptions** - CCTV feeds run continuously  
✅ **Auto-capture** - Screenshots taken automatically on detection  
✅ **Rich metadata** - Full detection details included  
✅ **Seamless integration** - Evidence appears instantly  
✅ **Professional UI** - Special badges and indicators  

### **Old Behavior:**
- Detection shows in feed
- No automatic evidence capture
- Manual screenshot needed

### **New Behavior:**
- Detection captured automatically
- Sent to Evidence Section
- Video continues monitoring
- Full metadata preserved

---

## 🎯 Quick Reference

| Feature | Status | Location |
|---------|--------|----------|
| Auto-Capture | ✅ Enabled | CCTVFeedSection.tsx |
| Evidence Display | ✅ Enhanced | EvidenceSection.tsx |
| State Management | ✅ Centralized | App.tsx |
| Notifications | ✅ Active | Toast system |
| Detection Details | ✅ Shown | Evidence cards |
| Storage Stats | ✅ Updated | Sidebar |

---

## 🎉 Result

**Your CrimeShield AI Dashboard now has a fully automated evidence capture system that works seamlessly with your weapon detection AI, capturing critical moments without interrupting surveillance operations.**

🚀 **Ready to use!** Just enable weapon detection and watch the evidence collect automatically! 📸
