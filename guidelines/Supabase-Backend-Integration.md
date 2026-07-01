# Supabase Backend Integration Guide

## Overview

Your CrimeShield AI Dashboard now has a complete Supabase backend with authentication, database storage, and secure API endpoints.

## Backend Architecture

### Database Structure (Key-Value Store)

All data is stored in Supabase's PostgreSQL database using a key-value pattern:

#### User Data
- **Key Pattern**: `user:{userId}`
- **Data**: User profile with role (citizen/organization), contact info, verification status

#### Crime Alerts
- **Key Pattern**: `alert:{timestamp}:{random}`
- **Data**: Alert type, severity, location, coordinates, status, timestamps

#### Evidence
- **Key Pattern**: `evidence:{timestamp}:{random}`
- **Data**: Evidence metadata, type, category, location, image URLs, tags

#### CCTV Feeds
- **Key Pattern**: `cctv:{timestamp}:{random}`
- **Data**: Feed name, location, coordinates, stream URL, status

#### Detection Events
- **Key Pattern**: `detection:{timestamp}:{random}`
- **Data**: Feed ID, detection type, confidence, timestamp, metadata

#### Threat Intelligence
- **Key Pattern**: `threat:ip:{timestamp}:{random}` or `threat:hash:{timestamp}:{random}`
- **Data**: Check results from AbuseIPDB and VirusTotal

## API Endpoints

All endpoints are prefixed with: `/make-server-cfc8313f`

### Authentication Endpoints

#### Sign Up
```typescript
POST /auth/signup
Body: {
  email: string,
  password: string,
  name: string,
  role: 'citizen' | 'organization',
  aadhaar?: string,
  phone?: string,
  organization?: string
}
```

#### Get Profile
```typescript
GET /auth/profile
Headers: { Authorization: 'Bearer {access_token}' }
```

#### Update Profile
```typescript
PUT /auth/profile
Headers: { Authorization: 'Bearer {access_token}' }
Body: { ...profile_fields }
```

### Crime Alerts Endpoints

#### Create Alert
```typescript
POST /alerts
Headers: { Authorization: 'Bearer {access_token}' }
Body: {
  type: string,
  severity: 'high' | 'medium' | 'low',
  description: string,
  location: string,
  latitude?: number,
  longitude?: number,
  state?: string,
  district?: string
}
```

#### Get Alerts
```typescript
GET /alerts?state={state}&district={district}&severity={severity}
Headers: { Authorization: 'Bearer {access_token}' }
```

#### Update Alert
```typescript
PUT /alerts/{id}
Headers: { Authorization: 'Bearer {access_token}' }
Body: { ...update_fields }
```

### Evidence Endpoints

#### Store Evidence
```typescript
POST /evidence
Headers: { Authorization: 'Bearer {access_token}' }
Body: {
  title: string,
  type: string,
  category: string,
  description: string,
  location: string,
  imageUrl: string,
  tags?: string[]
}
```

#### Get Evidence
```typescript
GET /evidence?category={category}&type={type}
Headers: { Authorization: 'Bearer {access_token}' }
```

### CCTV Endpoints (Organizations Only)

#### Register Feed
```typescript
POST /cctv/feeds
Headers: { Authorization: 'Bearer {access_token}' }
Body: {
  name: string,
  location: string,
  latitude?: number,
  longitude?: number,
  status?: string,
  streamUrl?: string
}
```

#### Get Feeds
```typescript
GET /cctv/feeds
Headers: { Authorization: 'Bearer {access_token}' }
```

#### Record Detection
```typescript
POST /cctv/detections
Headers: { Authorization: 'Bearer {access_token}' }
Body: {
  feedId: string,
  detectionType: string,
  confidence: number,
  timestamp?: string,
  metadata?: any
}
```

### Threat Intelligence Endpoints

#### Check IP Address
```typescript
POST /threat/check-ip
Headers: { Authorization: 'Bearer {access_token}' }
Body: { ip: string }
```

#### Check File Hash
```typescript
POST /threat/check-hash
Headers: { Authorization: 'Bearer {access_token}' }
Body: { hash: string }
```

### Statistics Endpoint

#### Get Dashboard Stats
```typescript
GET /stats
Headers: { Authorization: 'Bearer {access_token}' }
```

## Client Usage

### Import the API Client

```typescript
import { 
  authAPI, 
  alertsAPI, 
  evidenceAPI, 
  cctvAPI, 
  threatAPI, 
  statsAPI 
} from './utils/supabase/client';
```

### Authentication Examples

```typescript
// Sign up
const result = await authAPI.signUp({
  email: 'user@example.com',
  password: 'password123',
  name: 'John Doe',
  role: 'citizen',
  phone: '+91 9876543210'
});

// Sign in
const session = await authAPI.signIn('user@example.com', 'password123');

// Get profile
const { profile } = await authAPI.getProfile();

// Sign out
await authAPI.signOut();
```

### Creating Alerts

```typescript
const alert = await alertsAPI.create({
  type: 'Theft',
  severity: 'high',
  description: 'Vehicle theft reported',
  location: 'MG Road, Bengaluru',
  state: 'Karnataka',
  district: 'Bengaluru'
});
```

### Fetching Data

```typescript
// Get alerts for a specific location
const { alerts } = await alertsAPI.getAll({
  state: 'Karnataka',
  district: 'Bengaluru',
  severity: 'high'
});

// Get evidence
const { evidence } = await evidenceAPI.getAll({
  category: 'Weapons'
});

// Get statistics
const { stats } = await statsAPI.getStats();
```

### CCTV Integration

```typescript
// Register CCTV feed (organizations only)
const feed = await cctvAPI.registerFeed({
  name: 'Main Gate Camera',
  location: 'Building Entrance',
  latitude: 12.9716,
  longitude: 77.5946
});

// Record weapon detection
const detection = await cctvAPI.recordDetection({
  feedId: feed.id,
  detectionType: 'weapon',
  confidence: 0.95,
  metadata: { weapon_type: 'knife' }
});
```

### Threat Intelligence

```typescript
// Check suspicious IP
const ipResult = await threatAPI.checkIP('192.168.1.1');

// Check file hash with VirusTotal
const hashResult = await threatAPI.checkHash('abc123def456...');
```

## Environment Variables Required

### For Threat Intelligence APIs

Add these API keys to your Supabase environment:

1. **AbuseIPDB API Key**
   - Variable: `ABUSEIPDB_API_KEY`
   - Get from: https://www.abuseipdb.com/api

2. **VirusTotal API Key**
   - Variable: `VIRUSTOTAL_API_KEY`
   - Get from: https://www.virustotal.com/gui/my-apikey

## Role-Based Access Control

### Citizens
- ✅ View threat alerts
- ✅ View safety maps
- ✅ Submit crime reports
- ✅ Access location-based news
- ❌ Access CCTV feeds
- ❌ Access evidence section
- ❌ Access AI detection features

### Organizations
- ✅ All citizen features
- ✅ Access live CCTV feeds
- ✅ Manage evidence
- ✅ Access crime hotspot heatmaps
- ✅ Use AI detection features
- ✅ Manage CCTV feed registry

## Security Features

1. **Authentication Required**: All endpoints require valid JWT tokens
2. **Role Verification**: CCTV endpoints check user role
3. **Service Role Key**: Protected backend operations use service role key
4. **Auto Email Confirmation**: Users are auto-verified (since email server not configured)
5. **Secure Password Storage**: Handled by Supabase Auth
6. **API Key Protection**: External API keys stored in environment variables

## Session Management

Sessions are cookie-based and managed by Supabase:

```typescript
// Check current session
const session = await authAPI.getSession();

// Session contains:
// - access_token: For API authentication
// - user: User object with ID and metadata
// - expires_at: Token expiration timestamp
```

## Error Handling

All API calls return standardized error responses:

```typescript
try {
  const result = await alertsAPI.create({...});
} catch (error) {
  console.error('Error:', error.message);
  // Handle error appropriately
}
```

## Next Steps

1. **Set API Keys**: Configure AbuseIPDB and VirusTotal API keys in Supabase dashboard
2. **Test Authentication**: Try signing up and logging in
3. **Create Sample Data**: Add some alerts and evidence to test
4. **Integrate Components**: Update your components to use the new API
5. **Monitor Usage**: Check server logs for any issues

## Migration from Local Storage

Your app was previously using local storage (`authUtils`). The new Supabase backend provides:

- ✅ Persistent data across devices
- ✅ Real-time capabilities
- ✅ Secure authentication
- ✅ Scalable storage
- ✅ API-based architecture
- ✅ Production-ready infrastructure

All authentication functions have been updated to use the Supabase backend automatically.
