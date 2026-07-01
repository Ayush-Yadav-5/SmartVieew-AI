# GPS Location Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                     CrimeShield AI Dashboard                     │
│                     GPS Location System                          │
└─────────────────────────────────────────────────────────────────┘

┌──────────────┐         ┌──────────────┐         ┌──────────────┐
│   User       │         │   Browser    │         │  OpenStreetMap│
│  Interface   │◄───────►│  Geolocation │◄───────►│   Nominatim  │
└──────────────┘         └──────────────┘         └──────────────┘
       │                        │                         │
       │                        │                         │
       ▼                        ▼                         ▼
┌──────────────┐         ┌──────────────┐         ┌──────────────┐
│  Location    │         │ Coordinates  │         │  Reverse     │
│  Display     │         │  (lat, lon)  │         │  Geocoding   │
└──────────────┘         └──────────────┘         └──────────────┘
       │                                                   │
       │                   ┌──────────────┐              │
       └──────────────────►│  Crime Data  │◄─────────────┘
                          │  Generator   │
                          └──────────────┘
```

## Component Architecture

```
LocationCrimeNews Component
├── State Management
│   ├── selectedState: string
│   ├── selectedDistrict: string
│   ├── useGPS: boolean
│   ├── gpsLocation: Location | null
│   ├── gpsError: string | null
│   ├── isLoadingGPS: boolean
│   ├── crimes: Crime[]
│   └── news: NewsItem[]
│
├── GPS Functions
│   ├── enableGPS()
│   │   ├── Check browser support
│   │   ├── Request permission
│   │   ├── Get coordinates
│   │   ├── Call Nominatim API
│   │   ├── Update state
│   │   └── Start watching
│   │
│   ├── disableGPS()
│   │   ├── Clear watch
│   │   └── Reset state
│   │
│   ├── getLocationFromCoordinates(lat, lon)
│   │   ├── Fetch from Nominatim
│   │   ├── Parse response
│   │   ├── Map to Indian states
│   │   └── Return {state, city}
│   │
│   └── getLocationFromCoordinatesFallback(lat, lon)
│       ├── Check coordinate ranges
│       └── Return best match
│
└── UI Components
    ├── Location Dropdowns
    ├── GPS Enable Button
    ├── GPS Status Display
    ├── Crime History Cards
    └── Safety News Feed
```

## Data Flow Diagram

### GPS Enable Flow

```
User Clicks "Enable GPS"
         │
         ▼
┌─────────────────────────┐
│ Check Browser Support   │
└─────────────────────────┘
         │
         ▼
┌─────────────────────────┐
│ Request GPS Permission  │
└─────────────────────────┘
         │
         ├─── Denied ────────► Show Error Message
         │
         ├─── Timeout ───────► Show Timeout Error
         │
         └─── Granted
                │
                ▼
┌─────────────────────────────┐
│ Get Coordinates             │
│ navigator.geolocation       │
│ .getCurrentPosition()       │
└─────────────────────────────┘
                │
                ▼
┌─────────────────────────────┐
│ Call Nominatim API          │
│ reverseGeocode(lat, lon)    │
└─────────────────────────────┘
                │
                ├─── API Error ─────► Use Fallback
                │
                └─── Success
                       │
                       ▼
┌─────────────────────────────┐
│ Parse Response              │
│ Extract city & state        │
└─────────────────────────────┘
                │
                ▼
┌─────────────────────────────┐
│ Map to Indian States        │
│ Verify against INDIA_LOCS   │
└─────────────────────────────┘
                │
                ▼
┌─────────────────────────────┐
│ Update UI State             │
│ - Set location              │
│ - Generate crime data       │
│ - Show toast notification   │
└─────────────────────────────┘
                │
                ▼
┌─────────────────────────────┐
│ Start Position Watch        │
│ Monitor for changes         │
└─────────────────────────────┘
```

### Fallback System

```
Nominatim API Call
        │
        ▼
   Success? ──── Yes ───► Use API Data
        │
        No
        │
        ▼
┌──────────────────────┐
│ Coordinate Fallback  │
│                      │
│ For Each State:      │
│   Check if coords    │
│   in range          │
└──────────────────────┘
        │
        ▼
┌──────────────────────┐
│ Match Found?         │
└──────────────────────┘
        │
        ├─── Yes ────► Return State/City
        │
        └─── No ─────► Default to Delhi
```

## API Integration

### Nominatim Request Flow

```
┌─────────────────────────────────────────────┐
│ Request                                      │
├─────────────────────────────────────────────┤
│ URL: nominatim.openstreetmap.org/reverse    │
│ Method: GET                                  │
│ Params:                                      │
│   - format: json                             │
│   - lat: 28.6139                            │
│   - lon: 77.2090                            │
│   - addressdetails: 1                        │
│ Headers:                                     │
│   - User-Agent: CrimeShieldAI/1.0           │
└─────────────────────────────────────────────┘
                │
                ▼
┌─────────────────────────────────────────────┐
│ Response                                     │
├─────────────────────────────────────────────┤
│ {                                            │
│   "address": {                               │
│     "city": "New Delhi",                     │
│     "state": "Delhi",                        │
│     "country": "India",                      │
│     ...                                      │
│   },                                         │
│   "display_name": "...",                     │
│   "lat": "28.6139",                          │
│   "lon": "77.2090"                           │
│ }                                            │
└─────────────────────────────────────────────┘
                │
                ▼
┌─────────────────────────────────────────────┐
│ Processing                                   │
├─────────────────────────────────────────────┤
│ 1. Extract address.city                      │
│ 2. Extract address.state                     │
│ 3. Map state names                           │
│ 4. Verify against INDIA_LOCATIONS            │
│ 5. Return {state, city}                      │
└─────────────────────────────────────────────┘
```

## State Management

### Location State Lifecycle

```
Initial State
├── selectedState: ''
├── selectedDistrict: ''
├── useGPS: false
├── gpsLocation: null
└── showData: false

         │
         │ GPS Enabled
         ▼

GPS Active State
├── selectedState: 'Delhi'
├── selectedDistrict: 'New Delhi'
├── useGPS: true
├── gpsLocation: {
│   ├── latitude: 28.6139
│   ├── longitude: 77.2090
│   ├── accuracy: 50
│   ├── city: 'New Delhi'
│   └── state: 'Delhi'
│   }
└── showData: true

         │
         │ Location Changed
         ▼

Updated GPS State
├── selectedState: 'Maharashtra' (updated)
├── selectedDistrict: 'Mumbai' (updated)
├── useGPS: true
├── gpsLocation: {...} (updated)
└── showData: true

         │
         │ GPS Disabled
         ▼

Manual Selection State
├── selectedState: '' (reset)
├── selectedDistrict: '' (reset)
├── useGPS: false
├── gpsLocation: null
└── showData: false
```

## Error Handling Flow

```
GPS Request
     │
     ▼
┌─────────────────┐
│ Error Occurred? │
└─────────────────┘
     │
     ├─── Permission Denied
     │         │
     │         ▼
     │    Set Error: "Location access denied"
     │    Show Instructions
     │    Enable Manual Selection
     │
     ├─── Position Unavailable
     │         │
     │         ▼
     │    Set Error: "Location unavailable"
     │    Suggest: Check GPS enabled
     │    Enable Manual Selection
     │
     ├─── Timeout
     │         │
     │         ▼
     │    Set Error: "Request timeout"
     │    Suggest: Try again
     │    Enable Manual Selection
     │
     └─── API Error
               │
               ▼
          Use Fallback System
          Set Warning: "Using approximate location"
```

## Performance Optimization

### Caching Strategy

```
┌──────────────────────────────────────┐
│ Request Cache (Memory)                │
├──────────────────────────────────────┤
│                                       │
│ Key: `${lat}-${lon}`                  │
│ Value: {state, city, timestamp}       │
│ TTL: 5 minutes                        │
│                                       │
│ Benefits:                             │
│ - Reduce API calls                    │
│ - Faster subsequent requests          │
│ - Respect rate limits                 │
└──────────────────────────────────────┘

Future Enhancement:
┌──────────────────────────────────────┐
│ LocalStorage Cache                    │
├──────────────────────────────────────┤
│ Store recent locations                │
│ Persist across sessions               │
│ Clear on privacy mode                 │
└──────────────────────────────────────┘
```

### Rate Limiting Protection

```
Request Queue
┌─────────────────────────────────┐
│ Time Window: 1 second           │
│ Max Requests: 1                 │
├─────────────────────────────────┤
│                                 │
│ Request 1 ────► Process         │
│ Request 2 ────► Queue (wait 1s) │
│ Request 3 ────► Queue (wait 2s) │
│                                 │
└─────────────────────────────────┘

Protection Mechanisms:
1. Debounce rapid GPS updates
2. Cache recent requests
3. Fallback on rate limit hit
4. User feedback on delays
```

## Security Architecture

```
┌──────────────────────────────────────┐
│ Browser Security Layer                │
├──────────────────────────────────────┤
│ - HTTPS Required (production)         │
│ - Permission API                      │
│ - Same-Origin Policy                  │
│ - CORS Headers                        │
└──────────────────────────────────────┘
              │
              ▼
┌──────────────────────────────────────┐
│ Application Security Layer            │
├──────────────────────────────────────┤
│ - No persistent location storage      │
│ - Session-only coordinates            │
│ - No third-party sharing              │
│ - Clear user consent                  │
└──────────────────────────────────────┘
              │
              ▼
┌──────────────────────────────────────┐
│ API Security Layer                    │
├──────────────────────────────────────┤
│ - User-Agent required                 │
│ - Rate limiting                       │
│ - HTTPS only                          │
│ - No API key needed (public API)      │
└──────────────────────────────────────┘
```

## Mobile vs Desktop Flow

### Desktop Flow
```
Desktop Browser
       │
       ▼
Manual Location Selection
       │
       └─► State Dropdown
       └─► District Dropdown
       └─► Submit Button
             │
             ▼
       Generate Crime Data

Optional:
       │
       ▼
GPS Sidebar (via DevTools)
       │
       └─► Simulated Coordinates
             │
             ▼
       Same as Mobile
```

### Mobile Flow
```
Mobile Device
       │
       ▼
GPS Enable Button
       │
       ▼
Permission Request
       │
       ├─── Granted
       │      │
       │      ▼
       │  Native GPS
       │      │
       │      ▼
       │  Real Coordinates
       │      │
       │      ▼
       │  Nominatim API
       │      │
       │      ▼
       │  Crime Data
       │
       └─── Denied
              │
              ▼
       Manual Selection
```

## Data Storage

### Session Storage
```
No Persistent Storage Used

Runtime State Only:
┌─────────────────────────────┐
│ Component State (React)      │
├─────────────────────────────┤
│ - Current coordinates        │
│ - Detected location          │
│ - GPS active status          │
│ - Watch ID reference         │
└─────────────────────────────┘

Cleared When:
- User disables GPS
- Component unmounts
- Page refresh
- Browser closes
```

### Privacy Compliance
```
GDPR/Privacy Friendly:
✅ No tracking
✅ No cookies for location
✅ No server-side storage
✅ No location history
✅ Clear consent flow
✅ Easy to disable
✅ Data minimization
```

## Monitoring & Debugging

### Debug Information Available
```
GPS Status Panel
├── Location Detected: "Mumbai, Maharashtra"
├── Coordinates: "19.0760°N, 72.8777°E"
├── Accuracy: "±50 meters"
├── API Source: "via OpenStreetMap"
└── Status: "🟢 GPS Active"

Browser Console:
├── API requests/responses
├── Error messages
├── Coordinate updates
└── State changes
```

## Future Enhancements

### Planned Features
```
Phase 1 (Current):
✅ Basic GPS
✅ Nominatim integration
✅ Fallback system
✅ Error handling

Phase 2:
□ Location caching
□ Offline support
□ Route tracking
□ Geofencing

Phase 3:
□ Self-hosted Nominatim
□ Advanced filtering
□ Location history
□ Predictive alerts
```

---

**Architecture Version**: 1.0  
**Last Updated**: October 29, 2025  
**Status**: Production Ready
