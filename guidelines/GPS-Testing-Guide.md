# GPS Location Testing Guide

## Quick Start

### Enable GPS Location
1. Navigate to the **Crime History & Safety News** section
2. Click the **GPS Location** sidebar (on desktop) or tap the GPS button (on mobile)
3. Click **"Enable GPS Location"** button
4. Grant location permission when prompted by browser
5. Wait for location detection (usually 2-5 seconds)
6. See your detected location and local crime news!

## Browser Permissions

### Chrome/Edge
1. Click the lock icon 🔒 in address bar
2. Find "Location" permission
3. Set to "Allow"
4. Refresh page if needed

### Firefox
1. Click the lock icon 🔒 in address bar
2. Click "Connection secure" → "More information"
3. Go to "Permissions" tab
4. Find "Access Your Location"
5. Uncheck "Use Default" and check "Allow"

### Safari
1. Safari → Settings → Websites → Location Services
2. Find your site
3. Set to "Allow"

## What to Test

### ✅ Basic Functionality
- [ ] GPS button enables without errors
- [ ] Location permission prompt appears
- [ ] Loading indicator shows during detection
- [ ] Success toast appears with location name
- [ ] Detected city and state match your actual location
- [ ] GPS coordinates are displayed correctly
- [ ] Accuracy radius is shown in meters
- [ ] Crime news updates for detected location

### ✅ Real-time Tracking
- [ ] Green pulse indicator shows GPS is active
- [ ] Location updates when you move (if mobile)
- [ ] Crime news auto-updates on location change
- [ ] Coordinates update in real-time

### ✅ Error Handling
- [ ] Permission denied shows clear error message
- [ ] Timeout shows retry option
- [ ] Network error falls back gracefully
- [ ] Can still use manual location selection

### ✅ Disable GPS
- [ ] "Disable GPS" button works
- [ ] Tracking stops
- [ ] Can switch to manual selection
- [ ] No memory leaks (check browser console)

## Expected Behavior

### Success Scenario
```
1. Click "Enable GPS Location"
2. See: "Getting Location..." (2-5 sec)
3. See: Success toast "Location Detected: Mumbai, Maharashtra"
4. See: GPS Active indicator (green pulse)
5. See: Coordinates and accuracy
6. See: Crime news for Mumbai
```

### Permission Denied
```
1. Click "Enable GPS Location"
2. See: Permission prompt
3. Click "Block"
4. See: Error message with instructions
5. Can still use manual dropdowns
```

### No GPS Hardware
```
1. Click "Enable GPS Location"
2. See: Error "GPS is not supported by your browser"
3. Falls back to manual selection
```

## Testing Different Locations

### Desktop (Simulated Locations)
Chrome DevTools method:
1. Press F12 to open DevTools
2. Press Ctrl+Shift+P (Cmd+Shift+P on Mac)
3. Type "sensors"
4. Select "Show Sensors"
5. Choose a preset location or enter custom coordinates

### Test Coordinates (India)

| City | Latitude | Longitude |
|------|----------|-----------|
| Delhi | 28.6139 | 77.2090 |
| Mumbai | 19.0760 | 72.8777 |
| Bangalore | 12.9716 | 77.5946 |
| Kolkata | 22.5726 | 88.3639 |
| Chennai | 13.0827 | 80.2707 |
| Hyderabad | 17.3850 | 78.4867 |
| Pune | 18.5204 | 73.8567 |
| Ahmedabad | 23.0225 | 72.5714 |
| Jaipur | 26.9124 | 75.7873 |
| Lucknow | 26.8467 | 80.9462 |

## Common Issues & Solutions

### Issue: "Location access denied"
**Solution**: 
1. Check browser location permissions
2. Reset site permissions
3. Try incognito/private mode
4. Restart browser

### Issue: "Location unavailable"
**Solution**:
1. Enable location services in OS settings
2. Check WiFi/GPS is enabled
3. Try outdoors for better GPS signal
4. Use manual selection as alternative

### Issue: "Location timeout"
**Solution**:
1. Wait longer (can take 10-15 sec)
2. Restart GPS detection
3. Move to area with better signal
4. Check internet connection

### Issue: Wrong location detected
**Solution**:
1. Wait for GPS accuracy to improve (accuracy < 100m)
2. Disable and re-enable GPS
3. Check browser isn't using VPN location
4. Use manual selection if GPS inaccurate

### Issue: Location not updating
**Solution**:
1. Check GPS is still enabled (green pulse)
2. Move significantly (> 1km) to trigger update
3. Disable and re-enable GPS
4. Check browser console for errors

## Performance Checks

### API Response Time
- ⚡ **Good**: < 2 seconds
- ⚠️ **Acceptable**: 2-5 seconds
- ❌ **Slow**: > 5 seconds (check network)

### GPS Accuracy
- ⚡ **Excellent**: < 50m
- ✅ **Good**: 50-200m
- ⚠️ **Fair**: 200-500m
- ❌ **Poor**: > 500m (consider manual selection)

### Battery Impact (Mobile)
- GPS tracking uses battery
- Recommend disabling when not actively viewing
- Background tracking is NOT implemented (saves battery)

## Security & Privacy

### What is Collected
- GPS coordinates (temporarily, not stored)
- Detected city and state
- GPS accuracy radius

### What is NOT Collected
- Exact coordinates are not stored
- No location history is saved
- No tracking when GPS is disabled
- No third-party tracking

### Data Usage
- Location used only for local crime news
- Processed via OpenStreetMap API
- No data shared with other services
- Session-only storage (cleared on refresh)

## Browser Compatibility

| Browser | GPS Support | Status |
|---------|-------------|--------|
| Chrome 90+ | ✅ Full | Recommended |
| Firefox 88+ | ✅ Full | Recommended |
| Safari 14+ | ✅ Full | Recommended |
| Edge 90+ | ✅ Full | Recommended |
| Opera 76+ | ✅ Full | Supported |
| Mobile Browsers | ✅ Full | Supported |

## Debugging

### Browser Console Commands
```javascript
// Check if geolocation is supported
console.log('Geolocation:', navigator.geolocation ? 'Supported' : 'Not supported');

// Test GPS access
navigator.geolocation.getCurrentPosition(
  pos => console.log('Success:', pos.coords),
  err => console.error('Error:', err)
);

// Test Nominatim API
fetch('https://nominatim.openstreetmap.org/reverse?format=json&lat=28.6139&lon=77.2090', {
  headers: { 'User-Agent': 'CrimeShieldAI/1.0' }
})
  .then(r => r.json())
  .then(d => console.log('API Response:', d));
```

### Network Debugging
1. Open DevTools Network tab
2. Filter by "nominatim"
3. Check API response time
4. Verify 200 status code
5. Inspect response payload

## Reporting Issues

When reporting GPS issues, please include:
1. Browser name and version
2. Operating system
3. Whether permission was granted
4. Error message (if any)
5. Browser console logs
6. Screenshot of the issue
7. Expected vs actual location

---

**Need Help?** Check the OpenStreetMap Integration guide for detailed technical information.

**Last Updated**: October 29, 2025
