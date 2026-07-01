# ⚡ Behavior Analysis - Quick Reference Guide

## 🎯 What Is It?

An interactive modal panel that shows **8 crime-related behavior categories** with AI detection statistics, risk levels, and detailed analysis diagrams.

---

## 🚀 Quick Access

**Location:** Organization Dashboard Header (Top Right)

```
┌──────────────────────────────────────────────────────────┐
│  🛡️ CrimeShield AI    [Behavior Analysis] [Test Alarm]  │
└──────────────────────────────────────────────────────────┘
                              ↑
                    Click this button (Admin only)
```

---

## 📊 8 Behavior Categories

| Icon | Category | Risk | Description |
|------|----------|------|-------------|
| 👜 | **Theft** | 🔴 High | Person taking bag/items |
| 🔪 | **Weapon Detection** | 🔴 High | Knife/gun detected |
| 🚶 | **Loitering** | 🟠 Medium | Standing idle |
| 🤜 | **Violence/Fight** | 🔴 High | Physical altercation |
| 🚷 | **Trespassing** | 🔴 High | Unauthorized entry |
| 🎒 | **Suspicious Object** | 🔴 High | Unattended package |
| 👥 | **Crowd Aggression** | 🟠 Medium | Aggressive crowd |
| 🧱 | **Vandalism** | 🟠 Medium | Property damage |

---

## 🎨 Visual Features

### **Grid View** (Default)
```
┌────────────────────────────────────────────────┐
│  🔍 Filter by behavior type...                 │
├────────────────────────────────────────────────┤
│                                                │
│  [👜 Theft]    [🔪 Weapon]   [🚶 Loiter]     │
│   127 detect    23 detect    341 detect       │
│   🔴 High       🔴 High      🟠 Medium         │
│                                                │
│  [🤜 Fight]    [🚷 Trespass] [🎒 Suspicious]  │
│   89 detect     156 detect   67 detect        │
│   🔴 High       🔴 High      🔴 High           │
│                                                │
│  [👥 Crowd]    [🧱 Vandalism]                 │
│   45 detect     112 detect                    │
│   🟠 Medium     🟠 Medium                      │
│                                                │
└────────────────────────────────────────────────┘
```

### **Detail View** (Click any card)
```
┌────────────────────────────────────────────────┐
│  ← Back to all behaviors                       │
│                                                │
│  🔪  Weapon Detection            🔴 High Risk  │
│  Dangerous weapon (knife/gun) detected         │
│                                                │
│  📊 Detections: 23      👁️ Confidence: 98.7%  │
│                                                │
│  ⚠️ Detection Method:                          │
│  YOLO model identifies weapon shape...         │
│                                                │
│  Key Indicators:                               │
│  • Weapon in hand                              │
│  • Aggressive posture                          │
│  • Threatening gestures                        │
│  • Target proximity                            │
│                                                │
│  [Pose Estimation Diagram Placeholder]         │
│                                                │
└────────────────────────────────────────────────┘
```

---

## ✨ Interactive Features

### 1. **Search/Filter**
- Type to filter behaviors
- Real-time search results
- Shows match count at bottom

### 2. **Hover Effects**
- Card zooms slightly (1.03x)
- Purple glow shadow appears
- Icon scales up (1.1x)
- Border highlights in purple

### 3. **Click Actions**
- **Click Card:** Opens detailed view
- **Click "Back":** Returns to grid
- **Click "X":** Closes modal
- **Click "View Detailed Analytics":** Navigate to dashboard

---

## 🎬 Animations

```
Button Click
    ↓
Modal fades in (300ms)
    ↓
Cards appear one-by-one (stagger 50ms)
    ↓
Hover: Smooth zoom + glow
    ↓
Click: Slide to detail view
    ↓
Key indicators fade in (stagger 100ms)
```

---

## 🎨 Color Scheme

### Risk Levels
- **🔴 High:** Red gradient (#ef4444)
- **🟠 Medium:** Orange gradient (#f97316)
- **🟢 Low:** Green gradient (#10b981)

### Accents
- **Primary:** Purple (#a855f7)
- **Secondary:** Pink (#ec4899)
- **Background:** Dark charcoal (#0F1419)

---

## 📱 Responsive Behavior

### Desktop (1024px+)
- **Grid:** 4 columns
- **Modal:** 1152px wide
- **All features visible**

### Tablet (768-1023px)
- **Grid:** 2 columns
- **Modal:** Full width with padding
- **Compact layout**

### Mobile (<768px)
- **Grid:** 1 column
- **Modal:** Full screen
- **Touch-optimized**

---

## 🔐 Access Control

| User Type | Button Visible? | Can Open Modal? |
|-----------|----------------|-----------------|
| **Admin** | ✅ Yes | ✅ Yes |
| **Organization** | ✅ Yes | ✅ Yes |
| **Citizen** | ❌ No | ❌ No |

---

## 🛠️ Technical Stack

```
Component:        BehaviorAnalysisModal.tsx
Styling:          Tailwind CSS
Icons:            Lucide React
Animations:       Framer Motion (motion/react)
UI Components:    Shadcn/UI (Dialog, Card, Badge, etc.)
State Management: React useState
```

---

## 📊 Sample Data (30-Day Window)

| Behavior | Detections | Confidence | Risk |
|----------|-----------|-----------|------|
| Loitering | 341 | 87.5% | Medium |
| Trespassing | 156 | 89.8% | High |
| Theft | 127 | 94.2% | High |
| Vandalism | 112 | 88.9% | Medium |
| Violence/Fight | 89 | 91.3% | High |
| Suspicious Object | 67 | 93.1% | High |
| Crowd Aggression | 45 | 86.4% | Medium |
| Weapon Detection | 23 | 98.7% | High |

**Total Detections:** 940

---

## 🔮 What Each Behavior Detects

### 👜 **Theft**
```
Detection: Rapid hand movements, object displacement, quick exit
AI Method: Pose estimation + object tracking
Alert Time: Instant
```

### 🔪 **Weapon Detection**
```
Detection: Knife/gun shape, threatening gestures, target proximity
AI Method: YOLO model (Class 1: dangerous_weapon)
Alert Time: Instant + Alarm
```

### 🚶 **Loitering**
```
Detection: Stationary > 5 mins, repeated visits, no clear activity
AI Method: Position tracking + temporal analysis
Alert Time: After threshold
```

### 🤜 **Violence/Fight**
```
Detection: Rapid movements, close-quarter interaction, impact
AI Method: Pose estimation + motion analysis
Alert Time: Instant
```

### 🚷 **Trespassing**
```
Detection: Boundary violation, unauthorized entry, bypassing security
AI Method: Geofencing + zone monitoring
Alert Time: On entry
```

### 🎒 **Suspicious Object**
```
Detection: Unattended bag, unusual placement, no nearby owner
AI Method: Object detection + owner tracking
Alert Time: After 2 minutes
```

### 👥 **Crowd Aggression**
```
Detection: High density, chaotic movement, aggressive behavior
AI Method: Crowd flow analysis + behavior patterns
Alert Time: On detection
```

### 🧱 **Vandalism**
```
Detection: Spray motion, surface interaction, tool in hand
AI Method: Action recognition + object detection
Alert Time: On action
```

---

## ✅ Quick Test Checklist

### Before Using:
- [ ] Logged in as Admin/Organization user
- [ ] Button visible in header (top right)
- [ ] Purple/pink gradient styling visible

### Opening Modal:
- [ ] Click "Behavior Analysis" button
- [ ] Modal appears with smooth animation
- [ ] All 8 cards visible in grid
- [ ] Search bar appears at top

### Interacting:
- [ ] Hover over card → zoom + glow effect
- [ ] Type in search → cards filter correctly
- [ ] Click card → detail view opens
- [ ] "Back" button returns to grid
- [ ] "X" button closes modal
- [ ] Scroll works if content overflows

### Detail View:
- [ ] Icon and title display correctly
- [ ] Statistics show (detections + confidence)
- [ ] Detection method description visible
- [ ] 4 key indicators in grid
- [ ] Pose diagram placeholder shows

---

## 🎯 Best Practices

### For Admins:
1. **Regular Monitoring:** Check behavior trends weekly
2. **Pattern Recognition:** Look for unusual spikes
3. **Risk Prioritization:** Focus on high-risk behaviors first
4. **Data Export:** Use "View Detailed Analytics" for reports

### For Developers:
1. **Real Data Integration:** Replace mock data with actual detections
2. **Diagram Integration:** Add real pose estimation visuals
3. **Performance:** Lazy load images and diagrams
4. **Analytics:** Connect to actual analytics dashboard

---

## 🐛 Troubleshooting

### Button Not Visible?
- Check if logged in as Admin/Organization
- Verify `currentUser.userType === 'admin'`

### Modal Not Opening?
- Check browser console for errors
- Verify Shadcn Dialog component installed
- Check Framer Motion import

### Cards Not Displaying?
- Verify all Lucide icons imported
- Check Tailwind CSS classes compiled
- Inspect browser DevTools

### Animations Jerky?
- Reduce motion: Use `prefers-reduced-motion`
- Check GPU acceleration
- Verify Framer Motion version

---

## 📚 Related Documentation

- **Main Feature Docs:** `/BEHAVIOR-ANALYSIS-FEATURE.md`
- **Component Code:** `/components/BehaviorAnalysisModal.tsx`
- **Header Integration:** `/components/Header.tsx`

---

## 🎉 Summary

**Behavior Analysis** is a powerful, interactive tool for organization admins to:
- ✅ Visualize 8 crime behavior categories
- ✅ Understand detection methods
- ✅ Monitor detection trends
- ✅ Prioritize by risk level
- ✅ Access detailed analytics

**Professional, beautiful, and functional!** 🚀
