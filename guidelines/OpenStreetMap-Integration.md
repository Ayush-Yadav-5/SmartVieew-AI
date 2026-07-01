# OpenStreetMap + Nominatim GPS Integration

## Overview

The CrimeShield AI Dashboard now uses **OpenStreetMap's Nominatim API** for accurate GPS location detection and reverse geocoding. This provides significantly more accurate location data compared to the previous coordinate range-based approach.

## Features

### 1. **Reverse Geocoding**
- Converts GPS coordinates (latitude, longitude) into accurate location names
- Provides detailed address information including city, state, and country
- Automatically maps location data to Indian states and union territories

### 2. **Fallback System**
- Primary: OpenStreetMap Nominatim API
- Fallback: Coordinate range detection for all 28 Indian states and 8 union territories
- Ensures location detection always works even if API is temporarily unavailable

### 3. **Real-time Tracking**
- Continuously monitors user location changes
- Auto-updates crime news and safety alerts when location changes
- Shows accuracy radius for GPS coordinates

## Technical Implementation

### API Endpoint
```
https://nominatim.openstreetmap.org/reverse
```

### Query Parameters
- `format=json` - Response format
- `lat={latitude}` - Latitude coordinate
- `lon={longitude}` - Longitude coordinate
- `addressdetails=1` - Include detailed address components
- `zoom=10` - Detail level (10 = city level)

### Required Headers
```javascript
{
  'User-Agent': 'CrimeShieldAI/1.0', // Required by Nominatim usage policy
  'Accept': 'application/json'
}
```

## Usage Policy

### Nominatim API Requirements
1. **User-Agent Header**: Always include a valid User-Agent identifying your application
2. **Rate Limiting**: Maximum 1 request per second
3. **Bulk Requests**: Use the official Nominatim instance sparingly
4. **Attribution**: OpenStreetMap data is © OpenStreetMap contributors

### Best Practices
- Cache results when possible to reduce API calls
- Implement exponential backoff for failed requests
- Use the fallback coordinate detection system for high-traffic scenarios
- Consider self-hosting Nominatim for production applications with high volume

## Location Detection Flow

```
1. User clicks "Enable GPS"
   ↓
2. Browser requests GPS permission
   ↓
3. Get coordinates from navigator.geolocation
   ↓
4. Call Nominatim API for reverse geocoding
   ↓
5. Parse response and extract city/state
   ↓
6. Map to Indian state/district database
   ↓
7. Display location and load crime data
   ↓
8. Watch for location changes (continuous monitoring)
```

## Error Handling

### GPS Errors
- **Permission Denied**: User blocked location access in browser
- **Position Unavailable**: GPS hardware disabled or unavailable
- **Timeout**: Location request took too long

### API Errors
- **Network Error**: No internet connection
- **Rate Limit**: Too many requests to Nominatim
- **Invalid Response**: Malformed API response
- **No Data**: Coordinates don't match any known location

All errors automatically fall back to manual location selection.

## State Mapping

The system includes comprehensive mapping for:
- **28 Indian States**: From Andhra Pradesh to West Bengal
- **8 Union Territories**: Including Delhi, Chandigarh, Puducherry, etc.
- **500+ Cities/Districts**: Major and minor cities across India

### Special Cases
```javascript
{
  'NCT' → 'Delhi',
  'National Capital Territory of Delhi' → 'Delhi',
  'Andaman and Nicobar' → 'Andaman and Nicobar Islands',
  'Dadra and Nagar Haveli' → 'Dadra and Nagar Haveli and Daman and Diu'
}
```

## User Experience

### Loading States
1. **Initial**: "Enable GPS Location" button
2. **Loading**: "Getting Location..." with spinner
3. **Success**: Shows detected location with green indicator
4. **Error**: Shows error message with troubleshooting tips

### Visual Indicators
- 🟢 **Green pulse**: GPS active and tracking
- 📍 **Coordinates**: Displayed in latitude/longitude format
- 🎯 **Accuracy**: Shows GPS accuracy radius in meters
- 🗺️ **Location**: Shows detected city and state

### Toast Notifications
- Success notification shows when location is detected
- Includes city, state, and "via OpenStreetMap" attribution

## Components

### LocationCrimeNews Component
- Main component using GPS functionality
- Handles GPS enable/disable
- Displays location-based crime news
- Manages real-time location tracking

### Geocoding Utility (`/utils/geocoding.ts`)
Reusable utility functions:
- `reverseGeocode(lat, lon)` - Convert coordinates to location
- `forwardGeocode(query)` - Convert location name to coordinates
- `getCurrentPosition(options)` - Get user's GPS position
- `watchPosition(callback)` - Monitor position changes
- `clearWatch(watchId)` - Stop position monitoring

## Testing

### Test Locations (Indian Coordinates)
```javascript
// Delhi
{ lat: 28.6139, lon: 77.2090 }

// Mumbai
{ lat: 19.0760, lon: 72.8777 }

// Bangalore
{ lat: 12.9716, lon: 77.5946 }

// Kolkata
{ lat: 22.5726, lon: 88.3639 }

// Chennai
{ lat: 13.0827, lon: 80.2707 }
```

### Browser Console Testing
```javascript
// Test reverse geocoding
const result = await fetch(
  'https://nominatim.openstreetmap.org/reverse?format=json&lat=28.6139&lon=77.2090',
  { headers: { 'User-Agent': 'CrimeShieldAI/1.0' } }
);
console.log(await result.json());
```

## Future Enhancements

1. **Self-hosted Nominatim**: For higher rate limits and better performance
2. **Location History**: Track and visualize user's movement patterns
3. **Geofencing**: Set up alerts when entering/leaving specific areas
4. **Offline Mode**: Cache location data for offline access
5. **Place Search**: Allow users to search for specific locations
6. **Route Tracking**: Monitor crime data along a travel route

## Resources

- [Nominatim API Documentation](https://nominatim.org/release-docs/latest/api/Overview/)
- [OpenStreetMap Attribution](https://www.openstreetmap.org/copyright)
- [Browser Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API)

## Support

For issues with GPS functionality:
1. Check browser location permissions
2. Ensure GPS/location services are enabled on device
3. Verify internet connection for API calls
4. Review browser console for detailed error messages
5. Try manual location selection as alternative

---

**Last Updated**: October 29, 2025  
**API Version**: Nominatim v1  
**Status**: ✅ Production Ready
