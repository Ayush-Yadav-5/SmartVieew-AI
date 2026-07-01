# CrimeShield AI - Quick Reference Guide

## 🚀 Quick Start

### Run the Application
```bash
npm install
npm run dev
```

### Access Points
- **Landing Page**: Default entry point
- **Authentication**: DigiLocker-based login
- **Citizen Dashboard**: Basic features + crime news
- **Organization Dashboard**: Full features + CCTV + Evidence

---

## 📍 GPS Location Features

### Enable GPS in Code
```typescript
import { getCurrentPosition, reverseGeocode } from './utils/geocoding';

// Get current position
const coords = await getCurrentPosition();

// Reverse geocode to location
const location = await reverseGeocode(coords.latitude, coords.longitude);
console.log(location); // { latitude, longitude, city, state, country, displayName }
```

### Use in Component
```typescript
// Already implemented in LocationCrimeNews component
// Just import and use:
import { LocationCrimeNews } from './components/LocationCrimeNews';

// In your component:
<LocationCrimeNews />
```

---

## 🔐 Authentication

### Check Session
```typescript
import { authUtils } from './utils/auth';

const session = authUtils.getSession();
const user = authUtils.getCurrentUser();

if (session && user?.verified) {
  // User is logged in
}
```

### User Types
- **Citizen**: Limited access (threats, safety maps, crime news)
- **Organization**: Full access (CCTV, evidence, detection, heatmaps)

---

## 🎨 Color Scheme

### Primary Colors
```css
--background: #0F1419      /* Dark charcoal */
--secondary-bg: #1A1F2E    /* Slate */
--accent-green: #3BE39C    /* Success/Active */
--accent-pink: #FF6EC7     /* Highlights */
--accent-purple: #9D4EDD   /* Premium features */
```

### Usage
```tsx
<div className="bg-[#0F1419] text-white">
  <button className="bg-[#3BE39C] hover:bg-[#32c788]">
    Click Me
  </button>
</div>
```

---

## 📊 Components

### Available Components

#### Dashboard Components
- `CitizenDashboard` - Simplified dashboard for citizens
- `CCTVFeedSection` - Live CCTV feeds (orgs only)
- `EvidenceSection` - Evidence management (orgs only)
- `AlertsPanel` - Threat alerts
- `HeatmapSection` - Crime heatmap
- `DetectionTab` - AI detection panel

#### Location Components
- `LocationCrimeNews` - GPS-based crime news ⭐ NEW

#### Auth Components
- `LandingPage` - Entry point
- `AuthPage` - Login/signup flow
- `DigiLockerAuth` - DigiLocker integration
- `ProfileBuilder` - Complete user profile

#### Shared Components
- `Header` - Navigation header
- `Footer` - Footer with privacy info
- `HeroSection` - Landing hero

---

## 🛠️ Utilities

### Geocoding (`/utils/geocoding.ts`)
```typescript
// Get current GPS position
const position = await getCurrentPosition();

// Reverse geocode coordinates
const location = await reverseGeocode(lat, lon);

// Forward geocode location name
const coords = await forwardGeocode("Mumbai, India");

// Watch position changes
const watchId = watchPosition(
  (pos) => console.log(pos),
  (err) => console.error(err)
);

// Stop watching
clearWatch(watchId);
```

### Authentication (`/utils/auth.ts`)
```typescript
authUtils.login(userData);
authUtils.logout();
authUtils.getSession();
authUtils.getCurrentUser();
authUtils.updateUserProfile(data);
```

### Threat Intelligence (`/utils/threatIntelligence.ts`)
```typescript
await checkIPReputation(ipAddress);
await scanFileHash(fileHash);
```

### Alarm System (`/utils/alarmSystem.ts`)
```typescript
triggerAlarm('weapon');
stopAlarm();
```

---

## 🎯 Common Tasks

### Add a New Crime Type
1. Edit `/components/LocationCrimeNews.tsx`
2. Add to `CRIME_TEMPLATES` array:
```typescript
{ 
  type: 'New Crime', 
  severity: 'high', 
  desc: 'Description',
  locations: ['Location 1', 'Location 2']
}
```

### Add a New State/UT
1. Edit `/components/LocationCrimeNews.tsx`
2. Add to `INDIA_LOCATIONS` object:
```typescript
'New State': ['City1', 'City2', 'City3']
```

### Customize GPS Accuracy
1. Edit `/components/LocationCrimeNews.tsx`
2. Modify `enableGPS` function timeout:
```typescript
{
  enableHighAccuracy: true,
  timeout: 15000,  // Change this
  maximumAge: 0
}
```

### Add Toast Notification
```typescript
import { toast } from 'sonner@2.0.3';

// Success
toast.success('Title', { description: 'Message' });

// Error
toast.error('Error', { description: 'Error message' });

// Info
toast.info('Info', { description: 'Info message' });
```

---

## 📱 Responsive Breakpoints

```css
/* Mobile First */
default: 0-640px

/* Tailwind Breakpoints */
sm: 640px   /* Small tablets */
md: 768px   /* Tablets */
lg: 1024px  /* Small laptops */
xl: 1280px  /* Laptops */
2xl: 1536px /* Large screens */
```

### Usage
```tsx
<div className="w-full md:w-1/2 lg:w-1/3">
  Responsive width
</div>
```

---

## 🔍 Debugging

### Browser Console
```javascript
// Check GPS support
navigator.geolocation

// Test Nominatim API
fetch('https://nominatim.openstreetmap.org/reverse?format=json&lat=28.6139&lon=77.2090', {
  headers: { 'User-Agent': 'CrimeShieldAI/1.0' }
}).then(r => r.json()).then(console.log)

// Check current session
console.log(localStorage.getItem('crimeshield_session'))
console.log(localStorage.getItem('crimeshield_user'))
```

### Common Issues

#### GPS Not Working
```typescript
// Check browser permissions
navigator.permissions.query({ name: 'geolocation' })
  .then(status => console.log(status.state))

// Common causes:
// 1. HTTP instead of HTTPS
// 2. Permissions denied
// 3. Location services disabled
// 4. Timeout too short
```

#### Toast Not Showing
```typescript
// Make sure Toaster is in App.tsx
import { Toaster } from './components/ui/sonner';

<Toaster />
```

---

## 📦 Package Management

### Key Dependencies
```json
{
  "react": "^18.x",
  "lucide-react": "^0.x",
  "recharts": "^2.x",
  "sonner": "2.0.3",
  "react-hook-form": "7.55.0"
}
```

### Add New Package
```bash
# Just import it - no installation needed in this environment
import { NewComponent } from 'package-name'
```

### Version-Specific Imports
```typescript
// Only for these packages:
import { useForm } from 'react-hook-form@7.55.0'
import { toast } from 'sonner@2.0.3'
```

---

## 🎬 Testing Locations

### Major Cities (GPS Coordinates)
```typescript
const testLocations = {
  delhi: { lat: 28.6139, lon: 77.2090 },
  mumbai: { lat: 19.0760, lon: 72.8777 },
  bangalore: { lat: 12.9716, lon: 77.5946 },
  kolkata: { lat: 22.5726, lon: 88.3639 },
  chennai: { lat: 13.0827, lon: 80.2707 }
};
```

### Chrome DevTools Sensors
1. F12 → Console
2. Ctrl+Shift+P → "Show Sensors"
3. Select location or enter custom coordinates

---

## 📚 Documentation Files

- `/guidelines/Guidelines.md` - General guidelines
- `/guidelines/OpenStreetMap-Integration.md` - GPS technical docs
- `/guidelines/GPS-Testing-Guide.md` - GPS testing guide
- `/guidelines/DigiLocker-Integration.md` - Auth integration
- `/guidelines/Threat-Intelligence-Integration.md` - API integrations
- `/CHANGELOG.md` - Version history

---

## 🚨 Important Notes

### API Rate Limits
- **Nominatim**: 1 request/second
- **Solution**: Caching + fallback system

### HTTPS Required
- GPS requires HTTPS in production
- Development: `localhost` works with HTTP

### Privacy Compliance
- No persistent location storage
- Session-only coordinates
- Clear user consent required

### Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

---

## 🔗 Useful Links

- [Nominatim API Docs](https://nominatim.org/release-docs/latest/api/Overview/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com)
- [Lucide Icons](https://lucide.dev)
- [Recharts Docs](https://recharts.org)

---

## 💡 Tips

1. **Always test GPS on HTTPS** in production
2. **Cache API responses** to reduce rate limiting
3. **Use manual selection** as fallback
4. **Test with real devices** for accurate GPS
5. **Check browser console** for detailed errors
6. **Clear localStorage** to reset session
7. **Use DevTools Sensors** for desktop GPS testing

---

**Last Updated**: October 29, 2025  
**Quick Support**: Check `/guidelines/GPS-Testing-Guide.md`
