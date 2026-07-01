# ✅ Test Checklist - Profile at Registration

## 🧪 Quick Test (5 minutes)

### Prerequisites
- [ ] Clear localStorage: `localStorage.clear()` in console
- [ ] Reload the app: Press F5 or Cmd+R
- [ ] Console is open (F12) to see messages

---

## Test 1: Citizen Registration (2 minutes)

### Step-by-Step:

- [ ] **1.** App loads successfully
- [ ] **2.** Click "Get Started" button or "Citizen Portal"
- [ ] **3.** Click "Sign Up" tab

### Verify Form Fields Visible:
- [ ] Full Name field (with red asterisk *)
- [ ] Phone Number field (with phone icon 📱)
- [ ] Address field (with location icon 📍, multi-line)
- [ ] Email field
- [ ] Password field (with eye icon)
- [ ] Confirm Password field
- [ ] Info box at bottom (security message)
- [ ] Sign Up button

### Fill Form:
- [ ] **Name:** John Doe
- [ ] **Phone:** +91 9876543210
- [ ] **Address:** 123 Main Street, Mumbai, Maharashtra 400001
- [ ] **Email:** john@example.com
- [ ] **Password:** password123
- [ ] **Confirm:** password123

### Submit and Verify:
- [ ] Click "Sign Up" button
- [ ] Button shows "Please wait..." during processing
- [ ] Console shows: "✅ Signup successful! Now logging in..."
- [ ] Console shows: "✅ Login successful with complete profile"
- [ ] Console shows: "✅ Profile is complete, going to dashboard"
- [ ] **IMPORTANT:** Goes directly to Citizen Dashboard
- [ ] **VERIFY:** NO ProfileBuilder screen appears
- [ ] Dashboard shows citizen features (Threat Alerts, Safety Map)

### Test Persistence:
- [ ] Click user menu (top-right)
- [ ] Click "Logout"
- [ ] On landing page, select "Citizen Portal" again
- [ ] Click "Login" tab
- [ ] Enter: john@example.com / password123
- [ ] Click "Login"
- [ ] **VERIFY:** Goes directly to Dashboard (no ProfileBuilder!)
- [ ] **SUCCESS:** Profile persists across sessions ✨

---

## Test 2: Organization Registration (2 minutes)

### Step-by-Step:

- [ ] Reload app (F5)
- [ ] Click "Organization Portal" or government side
- [ ] Click "Sign Up" tab

### Verify Form Fields Visible:
- [ ] Full Name field (with red asterisk *)
- [ ] Phone Number field (with phone icon 📱)
- [ ] Organization Name field (with building icon 🏢)
- [ ] Organization ID field
- [ ] Department field
- [ ] Email field
- [ ] Password field (with eye icon)
- [ ] Confirm Password field
- [ ] Info box at bottom (instant access message)
- [ ] Sign Up button

### Fill Form:
- [ ] **Name:** Officer Sarah Smith
- [ ] **Phone:** +91 9988776655
- [ ] **Organization:** Mumbai Police Department
- [ ] **Org ID:** MPD-2025-001
- [ ] **Department:** Cyber Crime Unit
- [ ] **Email:** sarah@police.gov.in
- [ ] **Password:** securepass123
- [ ] **Confirm:** securepass123

### Submit and Verify:
- [ ] Click "Sign Up" button
- [ ] Button shows "Please wait..." during processing
- [ ] Console shows: "✅ Signup successful! Now logging in..."
- [ ] Console shows: "✅ Login successful with complete profile"
- [ ] Console shows: "✅ Profile is complete, going to dashboard"
- [ ] **IMPORTANT:** Goes directly to Admin Dashboard
- [ ] **VERIFY:** NO ProfileBuilder screen appears
- [ ] Dashboard shows admin features (CCTV, Evidence, Full Access)

### Test Persistence:
- [ ] Click user menu (top-right)
- [ ] Click "Logout"
- [ ] Select "Organization Portal" again
- [ ] Click "Login" tab
- [ ] Enter: sarah@police.gov.in / securepass123
- [ ] Click "Login"
- [ ] **VERIFY:** Goes directly to Dashboard (no ProfileBuilder!)
- [ ] **SUCCESS:** Profile persists across sessions ✨

---

## Test 3: Form Validation (1 minute)

### Test Required Fields:
- [ ] Go to Sign Up form (either portal)
- [ ] Leave Name field empty
- [ ] Try to submit
- [ ] **VERIFY:** Error message: "Please fill in your name and phone number"

### Test Password Mismatch:
- [ ] Fill all fields
- [ ] Password: test123
- [ ] Confirm Password: test456
- [ ] Try to submit
- [ ] **VERIFY:** Error message: "Passwords do not match"

### Test Password Length:
- [ ] Password: 123
- [ ] Confirm Password: 123
- [ ] Try to submit
- [ ] **VERIFY:** Error message: "Password must be at least 6 characters"

### Test Duplicate Email:
- [ ] Use email from previous test (john@example.com)
- [ ] Fill all other fields correctly
- [ ] Try to submit
- [ ] **VERIFY:** Error message: "Account already exists with this email"

---

## Test 4: Data Storage Verification

### Open Browser Console (F12):

```javascript
// Check all registered users
const users = JSON.parse(localStorage.getItem('mock_users_db'));
console.table(users);
```

### Verify Each User Has:
- [ ] ✅ id (unique)
- [ ] ✅ email
- [ ] ✅ name (full name, not email prefix)
- [ ] ✅ phone
- [ ] ✅ role (citizen or organization)
- [ ] ✅ **verified: true** (IMPORTANT!)
- [ ] ✅ created_at (timestamp)

### For Citizens, Also Check:
- [ ] ✅ address (complete address provided)

### For Organizations, Also Check:
- [ ] ✅ organization (organization name)
- [ ] ✅ organizationId (org ID)
- [ ] ✅ department (department name)

### Check Current User:
```javascript
const currentUser = JSON.parse(localStorage.getItem('mock_user'));
console.log(currentUser);
```

- [ ] ✅ Shows complete profile
- [ ] ✅ verified: true
- [ ] ✅ No password field (security)

---

## Test 5: Multiple Accounts

### Create Third Account:
- [ ] Logout if logged in
- [ ] Create another citizen with different email
- [ ] Verify direct dashboard access
- [ ] Logout and try all three logins
- [ ] **VERIFY:** All accounts work independently
- [ ] **VERIFY:** Each goes to correct dashboard type

---

## 🎯 Success Criteria

All of these should be TRUE:

- [ ] ✅ Registration forms show all profile fields
- [ ] ✅ Required fields marked with red asterisk (*)
- [ ] ✅ Form validation works correctly
- [ ] ✅ After signup, goes directly to dashboard
- [ ] ✅ NO ProfileBuilder screen ever appears
- [ ] ✅ Logout and login - still no ProfileBuilder
- [ ] ✅ Profile data shows verified: true in storage
- [ ] ✅ Can create multiple accounts
- [ ] ✅ Each account maintains separate profile
- [ ] ✅ Console shows proper success messages

---

## 🐛 If Something Fails

### Clear Everything and Start Fresh:

```javascript
// Run in console
localStorage.clear();
location.reload();
```

Then repeat the tests.

### Still Not Working?

Check:
1. Are you on the latest code? (Hard refresh: Ctrl+Shift+R)
2. Is Mock Mode enabled in `/utils/supabase/client.ts`?
3. Check console for any error messages
4. Verify `/components/AuthPage.tsx` has the profile fields

---

## 📊 Test Results Summary

Record your results:

```
Test 1 - Citizen Registration:        [ PASS / FAIL ]
Test 2 - Organization Registration:   [ PASS / FAIL ]
Test 3 - Form Validation:              [ PASS / FAIL ]
Test 4 - Data Storage:                 [ PASS / FAIL ]
Test 5 - Multiple Accounts:            [ PASS / FAIL ]

Overall Status:                        [ PASS / FAIL ]
```

---

## 🎉 Expected Outcome

If all tests pass:

✅ **Registration Flow:** Landing → Choose Type → Complete Form → Dashboard  
✅ **Login Flow:** Landing → Choose Type → Credentials → Dashboard  
✅ **Profile Builder:** Never appears for new users  
✅ **Data Persistence:** All profile data saved permanently  
✅ **Multiple Accounts:** Each maintains independent profile  

**Congratulations! The update is working perfectly!** 🚀

---

**Test Duration:** ~5 minutes  
**Last Updated:** November 1, 2025  
**Status:** Ready to Test
