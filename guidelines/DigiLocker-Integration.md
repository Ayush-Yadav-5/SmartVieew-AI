# DigiLocker Authentication Integration Guide

## Overview
This application includes DigiLocker integration for secure, government-verified authentication. DigiLocker is an Indian government service that provides digital document storage and secure identity verification.

## Current Implementation
The current implementation is a **MOCK/SIMULATION** for demonstration purposes. It shows the complete UI/UX flow but does not connect to the real DigiLocker API.

## What's Included

### 1. DigiLocker Service (`/utils/digilocker.ts`)
- OAuth 2.0 flow implementation structure
- PKCE (Proof Key for Code Exchange) for security
- API endpoint definitions
- Mock data simulation
- Comprehensive documentation

### 2. DigiLocker Auth Component (`/components/DigiLockerAuth.tsx`)
- Beautiful authentication modal
- Loading states and animations
- Success/error handling
- Data preview after verification

### 3. Integration with Auth Flow
- "Continue with DigiLocker" button on login/signup pages
- Automatic account creation with verified data
- Profile auto-fill from DigiLocker information
- Skip profile building for DigiLocker users

## Features

### User Benefits
✅ **Instant Verification** - No manual document upload needed
✅ **Government-Backed** - Data verified by Government of India
✅ **Secure** - OAuth 2.0 with PKCE security
✅ **Fast Onboarding** - Profile created automatically
✅ **Pre-filled Data** - Name, DOB, Address, Aadhaar auto-populated

### Data Retrieved from DigiLocker
- Full Name
- Date of Birth
- Gender
- Mobile Number
- Email Address
- Aadhaar Number (last 4 digits only)
- Complete Address
- Profile Photo (optional)

## How to Implement Real DigiLocker

### Step 1: Register Your Application
1. Visit [DigiLocker Developer Portal](https://www.digilocker.gov.in/)
2. Create a developer account
3. Register your application
4. Get your **Client ID** and **Client Secret**

### Step 2: Configure Redirect URIs
Set up authorized redirect URIs in DigiLocker console:
- Development: `http://localhost:3000/auth/digilocker/callback`
- Production: `https://yourdomain.com/auth/digilocker/callback`

### Step 3: Update Configuration
In `/utils/digilocker.ts`, replace mock credentials:

```typescript
const config: DigiLockerConfig = {
  clientId: 'YOUR_ACTUAL_CLIENT_ID',
  clientSecret: 'YOUR_ACTUAL_CLIENT_SECRET', // Store in backend!
  redirectUri: 'https://yourdomain.com/auth/digilocker/callback',
  environment: 'production' // or 'sandbox' for testing
};
```

### Step 4: Implement Backend OAuth Flow
**IMPORTANT:** Never expose client secret on frontend!

Create backend endpoints:

#### `/api/digilocker/authorize`
```javascript
// Backend endpoint to initiate OAuth
app.get('/api/digilocker/authorize', (req, res) => {
  const authUrl = 'https://digilocker.gov.in/public/oauth2/1/authorize';
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: process.env.DIGILOCKER_CLIENT_ID,
    redirect_uri: process.env.DIGILOCKER_REDIRECT_URI,
    state: generateSecureState(),
    code_challenge: generateCodeChallenge(),
    code_challenge_method: 'S256'
  });
  
  res.redirect(`${authUrl}?${params.toString()}`);
});
```

#### `/api/digilocker/callback`
```javascript
// Handle OAuth callback
app.get('/api/digilocker/callback', async (req, res) => {
  const { code, state } = req.query;
  
  // Verify state (CSRF protection)
  if (!verifyState(state)) {
    return res.status(400).json({ error: 'Invalid state' });
  }
  
  try {
    // Exchange code for access token
    const tokenResponse = await fetch('https://api.digitallocker.gov.in/public/oauth2/1/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        client_id: process.env.DIGILOCKER_CLIENT_ID,
        client_secret: process.env.DIGILOCKER_CLIENT_SECRET,
        redirect_uri: process.env.DIGILOCKER_REDIRECT_URI,
        code_verifier: getStoredCodeVerifier(state)
      })
    });
    
    const tokens = await tokenResponse.json();
    
    // Fetch user profile
    const profileResponse = await fetch('https://api.digitallocker.gov.in/public/oauth2/1/user', {
      headers: { 'Authorization': `Bearer ${tokens.access_token}` }
    });
    
    const profile = await profileResponse.json();
    
    // Create session and redirect to frontend
    const sessionToken = createUserSession(profile);
    res.redirect(`/auth/success?token=${sessionToken}`);
    
  } catch (error) {
    res.redirect('/auth/error');
  }
});
```

#### `/api/digilocker/profile`
```javascript
// Get user profile
app.get('/api/digilocker/profile', authenticateToken, async (req, res) => {
  try {
    const response = await fetch('https://api.digitallocker.gov.in/public/oauth2/1/user', {
      headers: { 'Authorization': `Bearer ${req.user.accessToken}` }
    });
    
    const profile = await response.json();
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});
```

### Step 5: Update Frontend Code

In `/utils/digilocker.ts`, update functions to call backend:

```typescript
export const digiLockerService = {
  initiateLogin: () => {
    // Redirect to backend which handles OAuth
    window.location.href = '/api/digilocker/authorize';
  },
  
  handleCallback: async (sessionToken: string) => {
    // Call backend to get user profile
    const response = await fetch('/api/digilocker/profile', {
      headers: { 'Authorization': `Bearer ${sessionToken}` }
    });
    return await response.json();
  }
};
```

### Step 6: Security Considerations

1. **Never expose client secret** on frontend
2. **Use HTTPS** in production
3. **Implement CSRF protection** with state parameter
4. **Use PKCE** for additional security
5. **Store tokens securely** (httpOnly cookies)
6. **Implement token refresh** mechanism
7. **Add rate limiting** to prevent abuse
8. **Validate all data** from DigiLocker
9. **Log authentication events** for audit
10. **Handle token expiration** gracefully

### Step 7: Testing

DigiLocker provides a sandbox environment:
- Sandbox URL: `https://sandbox.digitallocker.gov.in`
- Test with sandbox credentials first
- Verify all OAuth flows work correctly
- Test error scenarios (declined permissions, network failures)

### Step 8: Compliance

Ensure compliance with:
- **IT Act 2000** - Information Technology regulations
- **Aadhaar Act 2016** - Aadhaar data handling
- **DPDPA 2023** - Digital Personal Data Protection
- Store only necessary data
- Implement data deletion on user request
- Maintain audit logs

## API Endpoints Reference

### DigiLocker Production URLs
- **Authorization:** `https://digilocker.gov.in/public/oauth2/1/authorize`
- **Token:** `https://api.digitallocker.gov.in/public/oauth2/1/token`
- **User Profile:** `https://api.digitallocker.gov.in/public/oauth2/1/user`
- **Document List:** `https://api.digitallocker.gov.in/public/oauth2/1/files`
- **Document Fetch:** `https://api.digitallocker.gov.in/public/oauth2/1/file/{uri}`

### DigiLocker Sandbox URLs
Replace `digilocker.gov.in` with `sandbox.digitallocker.gov.in`

## Response Examples

### User Profile Response
```json
{
  "name": "John Doe",
  "dob": "01-01-1990",
  "gender": "M",
  "eaadhaar": "****-****-1234",
  "photo": "base64_encoded_photo",
  "email": "john@example.com",
  "mobile": "9876543210",
  "address": {
    "house": "123",
    "street": "Main Street",
    "landmark": "Near Park",
    "locality": "Downtown",
    "vtc": "Mumbai",
    "district": "Mumbai",
    "state": "Maharashtra",
    "pincode": "400001",
    "country": "India"
  }
}
```

## Error Handling

### Common Errors
- **access_denied:** User declined permission
- **invalid_grant:** Invalid authorization code
- **expired_token:** Access token expired
- **insufficient_scope:** Missing required permissions

### Error Handling Example
```typescript
try {
  const user = await digiLockerService.getUserProfile(token);
} catch (error) {
  if (error.code === 'expired_token') {
    // Refresh token
  } else if (error.code === 'access_denied') {
    // User declined, show alternative auth
  } else {
    // Generic error handling
  }
}
```

## Resources

- **Official Documentation:** https://www.digilocker.gov.in/assets/developers/documentation/
- **Developer Portal:** https://www.digilocker.gov.in/
- **Support Email:** support@digitallocker.gov.in
- **Technical Support:** For technical queries related to API integration

## Support

For implementation help:
1. Check DigiLocker developer documentation
2. Contact DigiLocker technical support
3. Join developer forums
4. Review sample implementations

## Current Status

🟡 **Mock Implementation Active**
- UI/UX flows are complete
- Integration structure is ready
- Replace mock functions with real API calls
- Update configuration with real credentials

Once you configure real DigiLocker credentials and implement the backend, the authentication will work with real government-verified data!
