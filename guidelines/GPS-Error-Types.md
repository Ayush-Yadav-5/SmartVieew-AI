# GPS Error Types & Solutions

## Overview

The GPS feature can fail for several different reasons. This document categorizes all possible error types and provides appropriate solutions for each.

---

## Error Categories

### 🚫 Category 1: Environment Restrictions (CANNOT FIX)

#### Error Code: `PERMISSION_DENIED` (code: 1)
#### Error Message: `"Geolocation has been disabled in this document by permissions policy"`

**What it means:**
- The app is running inside an iframe or restricted hosting environment
- The hosting platform has set a `Permissions-Policy` header that blocks geolocation
- This is a **security policy**, not a browser or user permission issue

**Why it happens:**
- App is embedded in an iframe without `allow="geolocation"` attribute
- Server sends `Permissions-Policy: geolocation=()` header (blocks all)
- Parent page restricts geolocation for embedded content
- Some preview/development environments block geolocation by default

**Can user fix it?**
❌ **NO** - This is completely outside user control

**Solution:**
✅ **Use Manual Location Selection**
- State/District dropdown menus
- Works identically to GPS
- Provides same crime data and safety news
- 100% reliable alternative

**For Developers:**
To fix this, the iframe needs:
```html
<iframe src="..." allow="geolocation"></iframe>
```
Or server should send:
```
Permissions-Policy: geolocation=(self)
```

**Detection in Code:**
```javascript
if (error.code === 1 && error.message.includes('permissions policy')) {
  // This is Permissions Policy issue
  // Guide user to manual selection
}
```

---

### 🔒 Category 2: User/Browser Permissions (CAN FIX)

#### Error Code: `PERMISSION_DENIED` (code: 1)
#### Error Message: Various (e.g., "User denied geolocation")

**What it means:**
- User clicked "Block" on permission prompt
- Browser has cached a "denied" permission state
- User hasn't been asked yet and browser defaults to deny

**Why it happens:**
- User previously denied location access
- User accidentally clicked "Block" 
- Browser privacy settings block location by default
- Corporate/enterprise policy blocks location

**Can user fix it?**
✅ **YES** - User can change browser settings

**Solution:**

**Chrome/Edge:**
1. Click lock icon (🔒) in address bar
2. Find "Location" → Select "Allow"
3. Refresh page and retry

**Firefox:**
1. Click lock icon (🔒)
2. Click "Clear Permission for Location"
3. Refresh and allow when prompted

**Safari:**
1. Safari → Settings → Websites → Location
2. Set site to "Allow"
3. Refresh page

**Detection in Code:**
```javascript
if (error.code === 1 && !error.message.includes('permissions policy')) {
  // Regular permission denial
  // Show browser-specific instructions
}
```

---

### 📡 Category 3: Position Unavailable (TECHNICAL)

#### Error Code: `POSITION_UNAVAILABLE` (code: 2)

**What it means:**
- Location hardware/service is unavailable
- No GPS signal or WiFi/cell tower location data
- Network issues preventing location lookup
- Device location services disabled

**Why it happens:**
- Device location services turned OFF
- No internet connection (WiFi location needs it)
- Indoors with poor GPS signal
- VPN/proxy blocking location services
- Geolocation database unreachable

**Can user fix it?**
✅ **MAYBE** - Depends on specific cause

**Solutions:**

1. **Enable Device Location Services:**
   - Windows: Settings → Privacy → Location → ON
   - Mac: System Settings → Privacy → Location Services → ON
   - iOS: Settings → Privacy → Location Services → ON
   - Android: Settings → Location → ON

2. **Check Internet Connection:**
   - WiFi/cellular data must be active
   - Try different network
   - Disable VPN temporarily

3. **Improve GPS Signal:**
   - Go outdoors or near window
   - Move away from metal structures
   - Wait 30-60 seconds for GPS lock

4. **Alternative:**
   - Use manual location selection

**Detection in Code:**
```javascript
if (error.code === 2) {
  // Position unavailable
  // Check: device settings, internet, signal
}
```

---

### ⏱️ Category 4: Timeout (TEMPORARY)

#### Error Code: `TIMEOUT` (code: 3)

**What it means:**
- Location request took too long
- GPS couldn't get lock within timeout period
- Network latency too high

**Why it happens:**
- Poor GPS signal (indoors, urban canyons)
- Slow internet connection
- High network latency
- Device GPS hardware cold start

**Can user fix it?**
✅ **YES** - Usually temporary

**Solutions:**

1. **Retry:** Often works on second attempt
2. **Wait:** Give GPS time to warm up (cold start = 30-60s)
3. **Improve Signal:** Move outdoors or near window
4. **Check Connection:** Ensure stable internet
5. **Increase Timeout:** Developer can increase timeout value
6. **Alternative:** Use manual selection

**Detection in Code:**
```javascript
if (error.code === 3) {
  // Timeout
  // Suggest retry or manual selection
}
```

---

### ❌ Category 5: Not Supported (RARE)

#### Error: `navigator.geolocation` is undefined

**What it means:**
- Browser doesn't support Geolocation API
- HTTPS requirement not met (some browsers)
- Browser is very old

**Why it happens:**
- Ancient browser (pre-2010)
- Geolocation API disabled in browser settings
- Non-HTTPS connection (some browsers require HTTPS)

**Can user fix it?**
✅ **YES** - Update browser

**Solutions:**

1. **Update Browser:**
   - Chrome 85+
   - Firefox 90+
   - Safari 14+
   - Edge (Chromium-based)

2. **Use HTTPS:**
   - Some browsers require secure connection

3. **Alternative:**
   - Use manual location selection

**Detection in Code:**
```javascript
if (!navigator.geolocation) {
  // Geolocation not supported
  // Must use manual selection
}
```

---

## Error Handling Flowchart

```
GPS Error Occurred
│
├─ navigator.geolocation undefined?
│  └─ YES → Browser too old / not supported
│           → SOLUTION: Update browser or use manual selection
│
├─ error.code === 1 (PERMISSION_DENIED)?
│  ├─ message includes "permissions policy"?
│  │  └─ YES → Permissions Policy restriction
│  │           → SOLUTION: Use manual selection (ONLY option)
│  │
│  └─ NO → Regular permission denial
│           → SOLUTION: Change browser settings, retry
│
├─ error.code === 2 (POSITION_UNAVAILABLE)?
│  └─ Device issues, network issues, signal issues
│      → SOLUTION: Check device settings, internet, signal
│                  OR use manual selection
│
└─ error.code === 3 (TIMEOUT)?
   └─ Took too long to get position
       → SOLUTION: Retry, move outdoors, check connection
                   OR use manual selection
```

---

## User Impact & Solutions Summary

| Error Type | Can User Fix? | Primary Solution | Fallback |
|------------|---------------|------------------|----------|
| **Permissions Policy** | ❌ NO | Manual Selection | None |
| **Permission Denied** | ✅ YES | Change browser settings | Manual Selection |
| **Position Unavailable** | ⚠️ MAYBE | Fix device/network | Manual Selection |
| **Timeout** | ✅ YES | Retry / improve signal | Manual Selection |
| **Not Supported** | ✅ YES | Update browser | Manual Selection |

---

## Implementation Best Practices

### 1. Always Detect Error Type
```javascript
if (error.code === error.PERMISSION_DENIED) {
  if (error.message.toLowerCase().includes('permissions policy')) {
    // Permissions Policy - cannot fix
    showManualSelectionOnly();
  } else {
    // Regular permission - show fix instructions
    showBrowserInstructions();
  }
}
```

### 2. Always Provide Manual Selection
Manual location selection should ALWAYS be available as a fallback, regardless of GPS status.

### 3. Clear Error Messages
- **Permissions Policy:** "GPS disabled by environment → Use manual selection"
- **Permission Denied:** "Click 🔒 icon → Allow location → Refresh"
- **Position Unavailable:** "Check device location services & internet"
- **Timeout:** "GPS taking too long → Retry or use manual"

### 4. Don't Block on Permission Check
```javascript
// ❌ BAD - blocks before attempting
if (permissionState === 'denied') return;

// ✅ GOOD - attempt anyway, let browser handle it
getCurrentPosition(success, error);
```

### 5. Warn About iframe Restrictions
```javascript
if (window.self !== window.top) {
  console.warn('Running in iframe - GPS may be blocked');
  showEnvironmentWarning();
}
```

---

## Testing Checklist

Test all error scenarios:

- [ ] **Permissions Policy**
  - Run in iframe without `allow="geolocation"`
  - Verify clear "use manual selection" message
  - Verify no "fix it" instructions shown

- [ ] **Permission Denied**
  - Block permission in browser
  - Verify browser-specific instructions shown
  - Verify retry button works
  - Verify can re-enable after allowing

- [ ] **Position Unavailable**
  - Disable device location services
  - Disconnect internet
  - Verify appropriate error message
  - Verify manual selection offered

- [ ] **Timeout**
  - Set short timeout (1ms)
  - Verify timeout error caught
  - Verify retry offered

- [ ] **Not Supported**
  - Test in ancient browser (if possible)
  - Verify fallback to manual selection

---

## Console Logging Strategy

Good logging helps debug issues:

```javascript
console.log('🌍 GPS: Starting request...');
console.log('📱 User Agent:', navigator.userAgent);
console.log('📦 In iframe:', window.self !== window.top);
console.log('🔐 Permissions API:', 'permissions' in navigator);

// On error:
console.error('❌ GPS Error:', {
  code: error.code,
  message: error.message,
  isPermissionsPolicy: error.message.includes('permissions policy')
});
```

---

## User Experience Guidelines

### For Permissions Policy Errors:
✅ DO:
- Clearly state this is an environment restriction
- Prominently show manual selection button
- Explain manual selection works identically

❌ DON'T:
- Show "enable GPS" retry button
- Suggest browser settings changes
- Imply user can fix this

### For Permission Denied Errors:
✅ DO:
- Detect user's browser
- Show specific instructions for that browser
- Provide retry button
- Show manual selection as fallback

❌ DON'T:
- Give generic unhelpful messages
- Assume all browsers work the same
- Only show retry without fallback

### For All Errors:
✅ DO:
- Always offer manual selection
- Use clear, friendly language
- Provide step-by-step instructions
- Log details to console for debugging

❌ DON'T:
- Show technical jargon to users
- Leave users stuck with no option
- Hide or disable manual selection
- Give up after first failure

---

## FAQ

### Q: Why can't we just bypass the Permissions Policy?
**A:** It's a security feature. Bypassing it would be a security vulnerability.

### Q: Should we hide the GPS feature if in iframe?
**A:** No - still show it, but warn users it may not work and ensure manual selection is prominent.

### Q: How do we know if we're in a restricted iframe?
**A:** Check `window.self !== window.top` and catch the specific error message.

### Q: Is manual selection as good as GPS?
**A:** For city/district-level data, yes! GPS is only better for hyper-local (< 1km) data.

### Q: Should we retry automatically?
**A:** Not for Permissions Policy errors. For timeouts/unavailable, one automatic retry is okay.

---

**Last Updated:** October 29, 2025
**Status:** Comprehensive error handling implemented
**Fallback:** Manual location selection always available ✅
