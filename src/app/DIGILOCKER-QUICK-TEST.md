# 🔐 DigiLocker - Quick Test Guide

## ⚡ 30-Second Test

### **For Citizens:**
1. Go to **Citizen Portal**
2. Click **"DigiLocker"** button (orange-white-green gradient)
3. Click **"Continue with DigiLocker"**
4. Wait ~4 seconds
5. ✅ **Success!** You're logged in with random user data

### **For Organizations:**
1. Go to **Organization Portal**  
2. Click **"DigiLocker"** button
3. Click **"Continue with DigiLocker"**
4. Wait ~4 seconds
5. ✅ **Success!** You're logged in with random user data

---

## 🎬 What You'll See

### **Step 1: Initial Modal**
```
┌────────────────────────────────────┐
│   🛡️ DigiLocker Authentication     │
│   Secure identity verification     │
│   ● Demo Mode - Simulated Auth    │
│                                    │
│   📄 What you'll share:            │
│   • Full Name                      │
│   • Date of Birth                  │
│   • Address                        │
│   • Aadhaar (last 4 digits)        │
│   • Profile Photo                  │
│                                    │
│   [Continue with DigiLocker]       │
│   [Cancel]                         │
└────────────────────────────────────┘
```

### **Step 2: Loading (2 seconds)**
```
┌────────────────────────────────────┐
│   ⏳ Connecting to DigiLocker...   │
│                                    │
│   ● Redirecting to DigiLocker      │
│   ● Fetching verified documents    │
│   ● Verifying identity             │
└────────────────────────────────────┘
```

### **Step 3: Success (2 seconds)**
```
┌────────────────────────────────────┐
│   ✅ Verification Successful!       │
│                                    │
│   Verified Information:            │
│   Name: Priya Sharma               │
│   DOB: 1990-05-15                  │
│   Aadhaar: ****-****-5678          │
│   Mobile: +91 12345 67890          │
│                                    │
│   Proceeding to profile...         │
└────────────────────────────────────┘
```

### **Step 4: Redirected to Dashboard**
```
🎉 You're in!
✅ Account created
✅ Logged in automatically
✅ Profile pre-filled
```

---

## 🐛 Troubleshooting

### **Issue: Error appears immediately**
**Solution:** Clear session storage
```javascript
// In browser console:
sessionStorage.clear();
// Then try again
```

### **Issue: Stuck on loading**
**Solution:** Check console for errors
```javascript
// Should see:
🔐 DigiLocker: Initiating authentication flow...
✅ DigiLocker authentication initiated
// If not, refresh page
```

### **Issue: Modal won't close**
**Solution:** Click Cancel or ESC key

---

## 📊 What Gets Created

### **Sample Citizen Account:**
```json
{
  "email": "priya.sharma@digilocker.gov.in",
  "name": "Priya Sharma",
  "phone": "+91 12345 67890",
  "role": "citizen",
  "aadhaar": "****-****-5678",
  "address": "House No. 123, MG Road, Sector 17, Mumbai, Maharashtra - 400001"
}
```

### **Sample Organization Account:**
```json
{
  "email": "vikram.patel@digilocker.gov.in",
  "name": "Vikram Patel",
  "phone": "+91 98765 43210",
  "role": "organization",
  "aadhaar": "****-****-4321",
  "organization": "DigiLocker Verified Organization",
  "department": "Security",
  "organizationId": "DL-1699123456789"
}
```

---

## ✅ Success Indicators

**You'll know it worked when:**
- ✅ Console shows "✅ DigiLocker authentication complete!"
- ✅ You're redirected to the dashboard
- ✅ Welcome message shows your DigiLocker name
- ✅ Profile is pre-filled with data
- ✅ No errors in console

---

## 🎯 Quick Checklist

Before testing:
- [ ] Page is loaded
- [ ] Console is open (F12)
- [ ] On auth page (citizen or organization)

During test:
- [ ] DigiLocker button visible
- [ ] Modal opens when clicked
- [ ] "Demo Mode" badge visible
- [ ] Loading shows for ~2 seconds
- [ ] Success shows for ~2 seconds
- [ ] Console has logs

After test:
- [ ] Redirected to dashboard
- [ ] Profile shows DigiLocker data
- [ ] Can access all features
- [ ] No errors in console

---

## 🎊 Expected Result

**Time:** ~4 seconds total  
**Result:** ✅ Logged in with random profile  
**Data:** Realistic Indian name, phone, address  
**Status:** Ready to use the dashboard!

---

**Last Updated:** November 5, 2025  
**Status:** ✅ Working Perfectly
