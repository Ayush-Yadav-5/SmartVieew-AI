# ✅ Enable Google Maps - Quick Checklist

**⏱️ Total Time: 5-10 minutes**

---

## Step 1: Enable Billing (Required) ⚠️

Even if you're using the free tier, Google requires billing to be enabled to prevent abuse.

### Instructions:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click **"Select a project"** at the top
3. Select your project (or create a new one)
4. Click **Billing** in the left menu (or top search bar)
5. Click **"Link a billing account"**
6. If you don't have a billing account:
   - Click **"Create billing account"**
   - Enter your name and address
   - Add a credit/debit card
   - Accept terms and click **"Start my free trial"**

### Important:

- ✅ You get **$200/month FREE credit**
- ✅ This app uses ~$0-5/month (well within free tier)
- ✅ Set up billing alerts at $10 to be safe
- ✅ No automatic charges without your permission

**Status:** ☐ Billing Enabled

---

## Step 2: Enable Maps JavaScript API ✅

1. Go to [APIs & Services → Library](https://console.cloud.google.com/apis/library)
2. In the search box, type: **"Maps JavaScript API"**
3. Click on **"Maps JavaScript API"**
4. Click the blue **"Enable"** button
5. Wait for it to enable (takes ~30 seconds)

**Status:** ☐ Maps JavaScript API Enabled

---

## Step 3: Verify API Key ✅

1. Go to [Credentials](https://console.cloud.google.com/apis/credentials)
2. Look for your API key in the list
3. Click on the key name
4. Verify the key from your environment configuration

### Check Settings:

**Application restrictions:**

- ☐ For testing: Set to **"None"**
- ☐ For production: Set to **"HTTP referrers"** and add your domain

**API restrictions:**

- ☐ Set to **"Restrict key"**
- ☐ Check ✅ **Maps JavaScript API**
- ☐ Click **Save**

**Status:** ☐ API Key Configured

---

## Step 4: Wait for Propagation ⏳

After enabling billing and APIs, changes take time to propagate across Google's servers.

- ⏰ **Wait time:** 5 minutes (sometimes up to 15 minutes)
- ☕ Grab a coffee or tea!
- 🔄 Don't keep refreshing - it won't speed it up

**Status:** ☐ Waited 5+ minutes

---

## Step 5: Clear Cache & Test 🧪

1. **Clear browser cache:**
   - Chrome: Press `Ctrl+Shift+Delete` (or `Cmd+Shift+Delete` on Mac)
   - Select "Cached images and files"
   - Click "Clear data"

2. **Open diagnostic tool:**
   - Navigate to `/test-google-maps.html` in your browser
   - Should see all green checkmarks ✅
   - Map should load with no errors

3. **Test in your app:**
   - Go to "Crime Hotspot & Threat Map" section
   - Select "Delhi" from dropdown
   - Map should load with markers
   - No console errors (press F12 to check)

**Status:** ☐ Map Loading Successfully

---

## Troubleshooting

### ❌ Still seeing "ApiProjectMapError"?

**Double-check:**

1. ☐ Billing is **enabled** (not just added)
2. ☐ Maps JavaScript API shows **"Enabled"** in console
3. ☐ Waited at least 5 minutes
4. ☐ Cleared browser cache completely
5. ☐ Using the correct Google Cloud project

**Try:**

- Sign out and back into Google Cloud Console
- Disable and re-enable the Maps JavaScript API
- Check [Google Cloud Status](https://status.cloud.google.com/) for outages
- Try from incognito/private window

### ❌ Still seeing "InvalidKey"?

**Check `.env` file:**

```bash
# Should be in project root (same folder as App.tsx)
VITE_GOOGLE_MAPS_API_KEY=<set in your .env file>
```

**Verify:**

- ☐ No spaces before/after the `=`
- ☐ No quotes around the key
- ☐ Key starts with `AIza`
- ☐ Restarted development server after creating/editing

### ❌ Map shows grey screen?

**Try:**

1. Open browser console (F12)
2. Look for specific error message
3. Google the error code
4. Check API restrictions aren't blocking localhost
5. Switch to "Custom Map" as temporary fallback

---

## Quick Reference

### Your API Key:

```
import.meta.env.VITE_GOOGLE_MAPS_API_KEY
```

### Important Links:

- [Google Cloud Console](https://console.cloud.google.com/)
- [Billing Dashboard](https://console.cloud.google.com/billing)
- [API Library](https://console.cloud.google.com/apis/library)
- [Credentials](https://console.cloud.google.com/apis/credentials)
- [Billing Calculator](https://cloud.google.com/products/calculator)

### Diagnostic Tool:

- Local: `/test-google-maps.html`

### Documentation:

- Setup Guide: `GOOGLE-MAPS-SETUP.md`
- Fixes Applied: `GOOGLE-MAPS-ERRORS-FIXED.md`

---

## Need Help?

### Option 1: Use Custom Map (No Setup Required)

The app includes a custom SVG map that works without Google Maps:

- Click **"Custom Map"** button in map controls
- All features work (filters, zones, alerts)
- Zero cost, zero setup
- Perfect for development/testing

### Option 2: Contact Support

If you're still stuck after following this checklist:

1. Check all checkboxes above are ✅
2. Run `/test-google-maps.html` and note any errors
3. Check browser console (F12) for error messages
4. Include error messages when asking for help

---

## Success Criteria ✨

You know Google Maps is working when:

- ✅ No console errors (F12)
- ✅ Map loads with dark theme
- ✅ Delhi shown at center
- ✅ Can zoom and pan
- ✅ Markers appear when location selected
- ✅ Info windows open on marker click
- ✅ No warning banner at top of map

**Congratulations! Google Maps is now fully integrated! 🎉**
