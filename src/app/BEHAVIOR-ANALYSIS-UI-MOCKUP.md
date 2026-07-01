# 🎨 Behavior Analysis - UI Mockup

## Desktop View (1440px)

### Grid View (Default State)

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│                                                                                  │
│  📊 Behavior Analysis                                            [X]             │
│  AI-powered detection and analysis of suspicious criminal behaviors             │
│                                                                                  │
│  ┌────────────────────────────────────────────────────────────────────────┐     │
│  │ 🔍 Filter by behavior type...                                          │     │
│  └────────────────────────────────────────────────────────────────────────┘     │
│                                                                                  │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐           │
│  │             │  │             │  │             │  │             │           │
│  │     👜      │  │     🔪      │  │     🚶      │  │     🤜      │           │
│  │             │  │             │  │             │  │             │           │
│  │   Theft     │  │   Weapon    │  │  Loitering  │  │   Fight     │           │
│  │             │  │  Detection  │  │             │  │             │           │
│  │ Person tak- │  │ Dangerous   │  │ Person sta- │  │ Physical    │           │
│  │ ing bag or  │  │ weapon det- │  │ nding idle  │  │ altercation │           │
│  │ valuable... │  │ ected       │  │ in restri...│  │ detected    │           │
│  │             │  │             │  │             │  │             │           │
│  │ Detections  │  │ Detections  │  │ Detections  │  │ Detections  │           │
│  │    127      │  │     23      │  │    341      │  │     89      │           │
│  │             │  │             │  │             │  │             │           │
│  │ 🔴 High Risk│  │ 🔴 High Risk│  │ 🟠 Med Risk │  │ 🔴 High Risk│           │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘           │
│                                                                                  │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐           │
│  │             │  │             │  │             │  │             │           │
│  │     🚷      │  │     🎒      │  │     👥      │  │     🧱      │           │
│  │             │  │             │  │             │  │             │           │
│  │ Trespassing │  │ Suspicious  │  │   Crowd     │  │ Vandalism   │           │
│  │             │  │   Object    │  │ Aggression  │  │             │           │
│  │ Unauthoriz- │  │ Unattended  │  │ Aggressive  │  │ Property    │           │
│  │ ed entry    │  │ bag/package │  │ crowd be... │  │ damage or   │           │
│  │ into forb...│  │ detected    │  │             │  │ graffiti    │           │
│  │             │  │             │  │             │  │             │           │
│  │ Detections  │  │ Detections  │  │ Detections  │  │ Detections  │           │
│  │    156      │  │     67      │  │     45      │  │    112      │           │
│  │             │  │             │  │             │  │             │           │
│  │ 🔴 High Risk│  │ 🔴 High Risk│  │ 🟠 Med Risk │  │ 🟠 Med Risk │           │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘           │
│                                                                                  │
│  ────────────────────────────────────────────────────────────────────────────  │
│  8 behaviors available         [📊 View Detailed Analytics]                     │
└──────────────────────────────────────────────────────────────────────────────────┘
```

---

### Detail View (After Clicking Card)

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│                                                                                  │
│  📊 Behavior Analysis                                            [X]             │
│  AI-powered detection and analysis of suspicious criminal behaviors             │
│                                                                                  │
│  ┌────────────────────────────────────────────────────────────────────────┐     │
│  │ 🔍 Filter by behavior type...                                          │     │
│  └────────────────────────────────────────────────────────────────────────┘     │
│                                                                                  │
│  ← Back to all behaviors                                                        │
│                                                                                  │
│  ┌────────────────────────────────────────────────────────────────────────┐     │
│  │                                                                        │     │
│  │  ┌─────┐                                                               │     │
│  │  │     │                                                               │     │
│  │  │ 🔪  │  Weapon Detection              🔴 High Risk                  │     │
│  │  │     │                                                               │     │
│  │  └─────┘  Dangerous weapon (knife/gun) detected                       │     │
│  │                                                                        │     │
│  │  ┌──────────────────┐  ┌──────────────────┐                           │     │
│  │  │                  │  │                  │                           │     │
│  │  │ 📈 Detections    │  │ 👁️ Avg. Conf.   │                           │     │
│  │  │                  │  │                  │                           │     │
│  │  │       23         │  │     98.7%        │                           │     │
│  │  │                  │  │                  │                           │     │
│  │  └──────────────────┘  └──────────────────┘                           │     │
│  │                                                                        │     │
│  │  ┌──────────────────────────────────────────────────────────────┐     │     │
│  │  │ ⚠️ Detection Method                                          │     │     │
│  │  │                                                              │     │     │
│  │  │ YOLO model identifies weapon shape in hand, tracks threat-  │     │     │
│  │  │ ening gestures, and monitors proximity to potential victims.│     │     │
│  │  └──────────────────────────────────────────────────────────────┘     │     │
│  │                                                                        │     │
│  │  Key Detection Indicators                                             │     │
│  │                                                                        │     │
│  │  ┌──────────────────────┐  ┌──────────────────────┐                  │     │
│  │  │ • Weapon in hand     │  │ • Aggressive posture │                  │     │
│  │  └──────────────────────┘  └──────────────────────┘                  │     │
│  │                                                                        │     │
│  │  ┌──────────────────────┐  ┌──────────────────────┐                  │     │
│  │  │ • Threatening gest.  │  │ • Target proximity   │                  │     │
│  │  └──────────────────────┘  └──────────────────────┘                  │     │
│  │                                                                        │     │
│  │  ┌──────────────────────────────────────────────────────────────┐     │     │
│  │  │                                                              │     │     │
│  │  │                    📊                                        │     │     │
│  │  │         Pose Estimation Diagram                              │     │     │
│  │  │                                                              │     │     │
│  │  │  Real-time skeletal tracking visualization showing          │     │     │
│  │  │  detected behavior patterns                                  │     │     │
│  │  │                                                              │     │     │
│  │  │  [Diagram renders here in production with CCTV snapshots]   │     │     │
│  │  │                                                              │     │     │
│  │  └──────────────────────────────────────────────────────────────┘     │     │
│  │                                                                        │     │
│  └────────────────────────────────────────────────────────────────────────┘     │
│                                                                                  │
│  ────────────────────────────────────────────────────────────────────────────  │
│  1 behavior available          [📊 View Detailed Analytics]                     │
└──────────────────────────────────────────────────────────────────────────────────┘
```

---

## Mobile View (375px)

### Grid View

```
┌─────────────────────────────┐
│                             │
│ 📊 Behavior Analysis    [X] │
│ AI-powered detection...     │
│                             │
│ ┌─────────────────────────┐ │
│ │ 🔍 Filter...            │ │
│ └─────────────────────────┘ │
│                             │
│ ┌─────────────────────────┐ │
│ │         👜              │ │
│ │       Theft             │ │
│ │                         │ │
│ │ Person taking bag...    │ │
│ │                         │ │
│ │ Detections: 127         │ │
│ │ 🔴 High Risk            │ │
│ └─────────────────────────┘ │
│                             │
│ ┌─────────────────────────┐ │
│ │         🔪              │ │
│ │   Weapon Detection      │ │
│ │                         │ │
│ │ Dangerous weapon...     │ │
│ │                         │ │
│ │ Detections: 23          │ │
│ │ 🔴 High Risk            │ │
│ └─────────────────────────┘ │
│                             │
│ ┌─────────────────────────┐ │
│ │         🚶              │ │
│ │      Loitering          │ │
│ │                         │ │
│ │ Person standing idle... │ │
│ │                         │ │
│ │ Detections: 341         │ │
│ │ 🟠 Medium Risk          │ │
│ └─────────────────────────┘ │
│                             │
│ ... (scroll for more)       │
│                             │
│ ─────────────────────────── │
│ 8 behaviors                 │
│ [📊 View Analytics]         │
└─────────────────────────────┘
```

---

## Color Palette Visual

### Risk Level Colors

```
┌───────────────────────────────────────────┐
│ 🔴 HIGH RISK                              │
│                                           │
│ Background: Linear gradient               │
│   from-red-500/20 to-orange-500/10        │
│                                           │
│ Text: text-red-400 (#f87171)              │
│                                           │
│ Border: border-red-500/30                 │
│                                           │
│ Examples: Theft, Weapon, Fight,           │
│           Trespassing, Suspicious Object  │
└───────────────────────────────────────────┘

┌───────────────────────────────────────────┐
│ 🟠 MEDIUM RISK                            │
│                                           │
│ Background: Linear gradient               │
│   from-orange-500/20 to-yellow-500/10     │
│                                           │
│ Text: text-orange-400 (#fb923c)           │
│                                           │
│ Border: border-orange-500/30              │
│                                           │
│ Examples: Loitering, Crowd Aggression,    │
│           Vandalism                       │
└───────────────────────────────────────────┘

┌───────────────────────────────────────────┐
│ 🟢 LOW RISK                               │
│                                           │
│ Background: Linear gradient               │
│   from-green-500/20 to-cyan-500/10        │
│                                           │
│ Text: text-green-400 (#4ade80)            │
│                                           │
│ Border: border-green-500/30               │
│                                           │
│ Examples: (Reserved for future use)       │
└───────────────────────────────────────────┘
```

### Accent Colors

```
┌───────────────────────────────────────────┐
│ 💜 PRIMARY (Purple)                       │
│                                           │
│ Hex: #a855f7                              │
│ Class: text-purple-500, bg-purple-500     │
│                                           │
│ Usage: Button, borders, hover states      │
└───────────────────────────────────────────┘

┌───────────────────────────────────────────┐
│ 💗 SECONDARY (Pink)                       │
│                                           │
│ Hex: #ec4899                              │
│ Class: text-pink-500, bg-pink-500         │
│                                           │
│ Usage: Gradient accents, highlights       │
└───────────────────────────────────────────┘
```

---

## Animation States

### Card Hover Effect

```
Default State:
┌─────────────┐
│             │
│     👜      │
│   Theft     │
│  127 det.   │
│ 🔴 High     │
└─────────────┘
transform: scale(1)
shadow: none

↓ HOVER

Hover State:
┌─────────────┐
│             │  ← Slightly larger
│     👜      │
│   Theft     │
│  127 det.   │
│ 🔴 High     │
└─────────────┘
transform: scale(1.03)
shadow: 0 20px 25px -5px rgba(168, 85, 247, 0.2)
border: purple glow
```

### Modal Entry Animation

```
Frame 1 (0ms):
  opacity: 0
  scale: 0.95
  backdrop: transparent

Frame 2 (150ms):
  opacity: 0.5
  scale: 0.98
  backdrop: rgba(0,0,0,0.5)

Frame 3 (300ms):
  opacity: 1
  scale: 1
  backdrop: rgba(0,0,0,0.8)
```

### Card Stagger Animation

```
Time  Card 1   Card 2   Card 3   Card 4
─────────────────────────────────────────
0ms   Show     Hidden   Hidden   Hidden
50ms  ✓        Show     Hidden   Hidden
100ms ✓        ✓        Show     Hidden
150ms ✓        ✓        ✓        Show
200ms ✓        ✓        ✓        ✓

Each card fades in + slides up 20px
```

---

## Button States

### Behavior Analysis Button (Header)

```
Default:
┌────────────────────────────┐
│ 📊 Behavior Analysis       │
└────────────────────────────┘
bg-gradient-to-r from-purple-500/20 to-pink-500/20
border-purple-500/30

Hover:
┌────────────────────────────┐
│ 📊 Behavior Analysis       │
└────────────────────────────┘
bg-gradient-to-r from-purple-500/30 to-pink-500/30
shadow-lg shadow-purple-500/10
transform: translateY(-1px)

Active (Click):
┌────────────────────────────┐
│ 📊 Behavior Analysis       │
└────────────────────────────┘
transform: scale(0.98)
```

### View Detailed Analytics Button

```
Default:
┌────────────────────────────┐
│ 📊 View Detailed Analytics │
└────────────────────────────┘
bg-gradient-to-r from-purple-500 to-pink-500
text-white

Hover:
┌────────────────────────────┐
│ 📊 View Detailed Analytics │
└────────────────────────────┘
bg-gradient-to-r from-purple-600 to-pink-600
shadow-lg shadow-purple-500/30
```

---

## Responsive Breakpoints

```
┌──────────────────────────────────────┐
│ Desktop (≥1024px)                    │
│ • Grid: 4 columns                    │
│ • Modal: 1152px (max-w-6xl)          │
│ • Cards: 250px width                 │
│ • Spacing: gap-4                     │
└──────────────────────────────────────┘

┌──────────────────────────────────────┐
│ Tablet (768px - 1023px)              │
│ • Grid: 2 columns                    │
│ • Modal: Full width - 32px padding   │
│ • Cards: ~45% width                  │
│ • Spacing: gap-3                     │
└──────────────────────────────────────┘

┌──────────────────────────────────────┐
│ Mobile (<768px)                      │
│ • Grid: 1 column                     │
│ • Modal: Full screen                 │
│ • Cards: 100% width                  │
│ • Spacing: gap-3                     │
└──────────────────────────────────────┘
```

---

## Icon Mapping

```
Behavior             Icon Component        Lucide Name
─────────────────────────────────────────────────────────
Theft                ShoppingBag          shopping-bag
Weapon Detection     Knife                knife
Loitering            UserX                user-x
Violence/Fight       Swords               swords
Trespassing          DoorClosed           door-closed
Suspicious Object    PackageX             package-x
Crowd Aggression     Users                users
Vandalism            Hammer               hammer
```

---

## Typography

```
Modal Title:          text-2xl (24px)
Card Title:           text-base (16px)
Description:          text-sm (14px)
Statistics:           text-3xl (30px)
Body Text:            text-gray-300
Secondary Text:       text-gray-400
Labels:               text-xs (12px)
```

---

## Spacing System

```
Modal Padding:        px-6 py-4 (24px 16px)
Card Padding:         p-5 (20px)
Card Gap:             gap-4 (16px)
Section Gap:          gap-6 (24px)
Icon Size:            w-7 h-7 (28px)
Large Icon:           w-12 h-12 (48px)
Button Padding:       px-4 py-2 (16px 8px)
```

---

## Z-Index Layers

```
Layer 0:  Base content
Layer 10: Cards
Layer 40: Dropdown backdrops
Layer 50: Modal backdrop (Dialog overlay)
Layer 50: Modal content (Dialog content)
Layer 60: Close button
```

---

## Accessibility Features

```
┌────────────────────────────────────────────┐
│ ✅ Keyboard Navigation                     │
│ • Tab through cards                        │
│ • Enter to open detail view                │
│ • Esc to close modal                       │
│ • Arrow keys in grid                       │
└────────────────────────────────────────────┘

┌────────────────────────────────────────────┐
│ ✅ Screen Reader Support                   │
│ • Semantic HTML (header, nav, section)     │
│ • ARIA labels on interactive elements      │
│ • Alt text for icons (via title)           │
│ • Dialog role on modal                     │
└────────────────────────────────────────────┘

┌────────────────────────────────────────────┐
│ ✅ Focus States                            │
│ • Visible focus ring (ring-2 ring-purple)  │
│ • High contrast borders                    │
│ • Skip to content links                    │
└────────────────────────────────────────────┘
```

---

## Performance Optimizations

```
✅ Code Splitting:     Lazy load modal component
✅ Memoization:        React.memo on BehaviorCard
✅ Virtual Scrolling:  ScrollArea from Radix UI
✅ Image Lazy Load:    loading="lazy" on diagrams
✅ Animation Perf:     GPU-accelerated transforms
✅ Debounced Search:   300ms delay on filter input
```

---

## 🎉 Summary

This mockup demonstrates the **complete visual design** of the Behavior Analysis feature:

- ✅ Desktop and mobile layouts
- ✅ Grid and detail views
- ✅ Color scheme and risk levels
- ✅ Animation states and transitions
- ✅ Button interactions
- ✅ Responsive breakpoints
- ✅ Accessibility features
- ✅ Performance considerations

**Ready to implement in production!** 🚀
