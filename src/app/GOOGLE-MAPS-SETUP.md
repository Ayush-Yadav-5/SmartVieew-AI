# Google Maps Integration Setup

## 🚨 Quick Start - Fix API Key Errors

If you're seeing `NoApiKeys` or `InvalidKey` errors in the console, follow these steps:

### Option 1: Environment Variable (Recommended)

1. Create a `.env` file in your project root (same level as `App.tsx`)
2. Add your API key:
   ```bash
   VITE_GOOGLE_MAPS_API_KEY=<your Google Maps key>
   ```
3. Restart your development server
4. The map will automatically load with your API key

### Option 2: Use Custom Map (No API Key Required)

The app automatically switches to a custom SVG map if no API key is detected. This map:

- ✅ Works immediately without any setup
- ✅ Shows all crime zones and safe areas
- ✅ Supports all filters
- ✅ No API costs or limits

You can toggle between Google Maps and Custom Map using the button in the map controls.

---

## ✅ Features Implemented

### 1. **All Areas Filter Working**

The "All Areas" dropdown filter now shows ALL crime zones including:

- **Gang Areas** - Gang territories (⚔️)
- **Theft Zones** - Theft hotspots (🦹)
- **Drug Activity** - Drug trafficking areas (💊)
- **Danger Zones** - High-risk danger zones (⚠️)
- **Vandalism Areas** - Vandalism zones (🎨)
- **Crowded Areas** - High-traffic zones (👥)
- **Historical Crime** - Historical crime data (📊)
- **Safe Zones** - Protected safe areas (✅)

Each filter shows the count: e.g., "Gang Areas (3)"

### 2. **Google Maps Integration**

- Real Google Maps with custom dark theme
- Interactive markers for all crime zones
- Info windows on marker click
- Heatmap layer showing crime density
- Animated bounce effect for high-severity zones
- Toggle between Google Maps and Custom SVG Map

### 3. **How It Works**

1. User selects a location (state/UT)
2. Map loads centered on that region
3. All crime zones display as colored markers:
   - 🔴 Red = High Severity
   - 🟠 Orange = Medium Severity
   - 🟢 Green = Low Severity/Safe
4. Click markers to view details
5. Use filter to show specific crime types
6. Toggle map view with "Custom Map" button

---

## 🔑 Setup Instructions

### Step 1: Get Google Maps API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable these APIs:
   - **Maps JavaScript API**
   - **Maps SDK for Android** (optional for mobile)
   - **Geocoding API** (for address lookup)
4. Go to **Credentials** → Create **API Key**
5. Copy your API key

### Step 2: Restrict Your API Key (Important for Security)

1. In Google Cloud Console → **Credentials**
2. Click on your API key
3. Under **Application restrictions**:
   - Select "HTTP referrers (web sites)"
   - Add your domain: `yourdomain.com/*`
   - For development: `localhost:*`
4. Under **API restrictions**:
   - Select "Restrict key"
   - Choose: Maps JavaScript API, Visualization Library

### Step 3: Add API Key to Code

Open `/components/HeatmapSectionWithGoogleMaps.tsx` and find line ~1150:

```tsx
<script
  async
  src={`https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&libraries=visualization`}
></script>
```

Use the value from your environment variable:

```tsx
<script
  async
  src={`https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&libraries=visualization`}
></script>
```

### Step 4: Alternative - Environment Variable (Recommended)

Create a `.env` file in your project root:

```bash
VITE_GOOGLE_MAPS_API_KEY=<your Google Maps key>
```

Then update the script tag:

```tsx
<script
  async
  src={`https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&libraries=visualization`}
></script>
```

---

## 📊 Features Overview

### Interactive Markers

- **Click** markers to see crime details
- **Hover** for quick preview
- **Animated** pulse for high-severity zones

### Heatmap Layer

- Shows crime density visualization
- Color gradient:
  - 🔵 Cyan → Low density
  - 🟢 Green → Medium density
  - 🟠 Orange → High density
  - 🔴 Pink → Critical density

### Filters Work With Both Maps

- All filters work on both Google Maps and Custom SVG map
- "All Areas" shows every crime zone and safe zone
- Count displayed next to each filter option

### Map Toggle Button

- Click "Custom Map" to switch to SVG fallback
- Click "Google Maps" to return to interactive map
- Useful if API key not configured yet

---

## 🎯 Usage Guide

### For Citizens:

1. Select your state/city from dropdown
2. View safety score and active alerts
3. Click "Safe Zones" to find secure areas
4. Click "Active Alerts" to see danger zones
5. Use map filters to find specific crime types

### For Organizations:

- Full access to all crime data
- Can view gang territories, drug zones, theft hotspots
- Access to heatmap layer for density analysis
- Click markers for detailed crime information

---

## 🚨 Troubleshooting

### Map Not Loading?

1. Check browser console for errors
2. Verify API key is correct
3. Ensure Maps JavaScript API is enabled
4. Check domain restrictions
5. Use "Custom Map" toggle as fallback

### Markers Not Showing?

1. Select a location first
2. Check if filters are active
3. Try "All Areas" filter
4. Clear highlighted zones (click Active Alerts/Safe Zones again)

### Billing Alerts?

- Google Maps has **$200/month free credit**
- Crime Shield uses:
  - Map loads: ~0.007 per load
  - Marker interactions: Free
  - Heatmap: Free with Maps JavaScript API
- Should stay within free tier for moderate usage

---

## 💡 Tips

1. **Start with Custom Map** if you haven't set up API key yet
2. **Use filters** to reduce markers and improve performance
3. **Click Safe Zones** card to quickly find secure areas
4. **Click Active Alerts** card to view only dangerous zones
5. **Toggle between maps** to compare visualizations

---

## 📈 What's New

### ✅ All Areas Filter Fixed

- Now shows ALL crime types when selected
- Displays count for each category
- Works with both Google Maps and Custom Map

### ✅ Google Maps Integration

- Real interactive Google Maps
- Custom dark cybersecurity theme
- Heatmap layer for crime density
- Clickable markers with info windows
- Smooth animations and transitions

### ✅ Dual Map System

- Toggle between Google Maps and Custom Map
- Custom map works without API key
- Both maps support all filters
- Seamless switching

---

## 🔒 Security Notes

1. **Never commit API key to GitHub**
2. Use environment variables
3. Restrict API key to your domain
4. Enable only required APIs
5. Monitor usage in Google Cloud Console

---

## Support

If you encounter issues:

1. Check Google Cloud Console for API status
2. Verify billing is enabled (free tier is fine)
3. Check browser console for errors
4. Use Custom Map as fallback
5. Ensure location is selected before viewing map

**Map loads perfectly after location selection with complete crime data visualization!** 🗺️✨
