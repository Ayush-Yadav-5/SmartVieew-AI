# Threat Intelligence & Alarm System Integration

## Overview
CrimeShield AI now integrates with **VirusTotal** and **AbuseIPDB** (mocked APIs) to provide comprehensive threat intelligence analysis when weapons or threats are detected. An advanced alarm system automatically triggers audio/visual alerts for critical detections.

## Features

### 1. Mocked API Integration

#### VirusTotal API
- **Purpose**: Scans detection snapshots and provides vendor-based threat analysis
- **Data Returned**:
  - Scan ID and timestamp
  - Detection ratio (positives/total vendors)
  - Threat score percentage
  - Malicious status (boolean)
  - Individual vendor results (Kaspersky, McAfee, Symantec, etc.)
  
#### AbuseIPDB API
- **Purpose**: Analyzes source IP addresses for abuse history and threat indicators
- **Data Returned**:
  - Abuse confidence score (0-100%)
  - Total abuse reports
  - Country code and ISP information
  - Usage type (Data Center, ISP, etc.)
  - Tor exit node detection
  - Last reported timestamp

### 2. Alarm System

#### Audio Siren Patterns
The system uses Web Audio API to generate realistic siren sounds:

- **Weapon Detection** (Continuous Pattern)
  - Base frequency: 900 Hz
  - Sweeping siren effect
  - Duration: 5-8 seconds
  
- **Critical Alert** (Rapid Pattern)
  - Base frequency: 1000 Hz
  - Fast frequency modulation
  - Duration: 8 seconds
  
- **Warning Alert** (Pulse Pattern)
  - Base frequency: 700 Hz
  - Pulsing on/off effect
  - Duration: 4 seconds

#### Visual Alerts
- Fixed position banner at top of screen
- Red gradient background with pulse animation
- Alert type and detection information
- Auto-dismisses after 8 seconds

### 3. Threat Intelligence Panel

Located at: `/components/ThreatIntelligencePanel.tsx`

#### Features:
- Real-time threat analysis modal
- Parallel API queries for faster results
- Color-coded threat levels (critical, high, medium, low)
- Detailed vendor detection results
- IP reputation scoring
- Actionable recommendations

#### Access:
- Appears when clicking "Threat Intel" button on weapon detection alerts
- Admin/Organization users only
- Shows comprehensive analysis with:
  - VirusTotal vendor scan results
  - AbuseIPDB abuse confidence score
  - Recommended actions based on threat level

### 4. Automatic Alarm Triggering

#### Trigger Logic:
```typescript
if (detectionType === 'Weapon Detection') {
  if (malicious && abuseScore > 75) → CRITICAL alarm
  else if (malicious || abuseScore > 50) → HIGH alarm
  else → MEDIUM alarm
}
```

#### Auto-Trigger Events:
1. **On Page Load**: Checks for pending weapon detections
2. **On New Detection**: Immediately analyzes and triggers if needed
3. **On Threat Intel View**: Generates report and triggers alarm if shouldTriggerAlarm = true

### 5. Integration Points

#### AlertsPanel Component
- Auto-triggers alarm on mount for pending weapon alerts
- "Threat Intel" button added to weapon detection rows
- Opens ThreatIntelligencePanel modal for detailed analysis

#### Header Component
- "Test Alarm" button for admins (top-right corner)
- Tests weapon detection siren with 3-second duration
- Helps verify audio system is working

## Usage Examples

### Test the Alarm System
```typescript
import { alarmSystem } from '../utils/alarmSystem';

// Trigger weapon detection alarm
alarmSystem.triggerAlarm('weapon', { 
  duration: 5000, 
  pattern: 'continuous' 
});

// Trigger critical alarm
alarmSystem.triggerAlarm('critical', { 
  duration: 8000, 
  pattern: 'rapid' 
});

// Stop all alarms
alarmSystem.stopAlarm();

// Test alarm (3 seconds)
alarmSystem.testAlarm();
```

### Generate Threat Report
```typescript
import { generateThreatReport } from '../utils/threatIntelligence';

const report = await generateThreatReport(
  'alert-123',           // Alert ID
  'Weapon Detection',    // Detection type
  '192.168.1.100'       // Optional source IP
);

if (report.shouldTriggerAlarm) {
  // Trigger appropriate alarm
  alarmSystem.triggerAlarm('weapon');
}
```

## Security Considerations

### Production Deployment:
1. Replace mocked APIs with real API calls to VirusTotal and AbuseIPDB
2. Implement API key management (environment variables)
3. Add rate limiting to prevent API quota exhaustion
4. Implement caching for frequently queried IPs
5. Add authentication checks for threat intelligence access

### API Keys Required (Production):
- **VirusTotal API Key**: https://www.virustotal.com/gui/my-apikey
- **AbuseIPDB API Key**: https://www.abuseipdb.com/account/api

### Current Mock Behavior:
- Simulates ~800ms API delay for realistic UX
- Randomizes threat scores for demonstration
- Generates realistic vendor names and results
- No actual network calls or API keys needed

## Files Modified/Created

### New Files:
- `/utils/threatIntelligence.ts` - Mock VirusTotal & AbuseIPDB APIs
- `/utils/alarmSystem.ts` - Audio/visual alarm system
- `/guidelines/Threat-Intelligence-Integration.md` - This documentation

### Modified Files:
- `/components/ThreatIntelligencePanel.tsx` - Updated to use new API structure
- `/components/AlertsPanel.tsx` - Added auto-trigger and threat intel button
- `/components/Header.tsx` - Added test alarm button for admins

## Future Enhancements

1. **Email/SMS Notifications**: Send alerts to security personnel
2. **WebSocket Integration**: Real-time threat updates
3. **Historical Threat Database**: Store and analyze threat patterns
4. **Machine Learning**: Improve threat scoring with ML models
5. **Integration with SIEM**: Connect to Security Information and Event Management systems
6. **Custom Alarm Sounds**: Upload custom siren audio files
7. **Multi-Language Support**: Translate threat descriptions
8. **Automated Response**: Trigger camera zoom, spotlight, or lockdown procedures

## Testing Checklist

- [ ] Click "Test Alarm" button in header (admin only)
- [ ] Navigate to Alerts panel and find weapon detection
- [ ] Click "Threat Intel" button on weapon alert
- [ ] Verify VirusTotal results load
- [ ] Verify AbuseIPDB results load
- [ ] Confirm alarm audio plays
- [ ] Confirm visual banner appears
- [ ] Test alarm auto-stops after duration
- [ ] Refresh threat intelligence data
- [ ] Close modal and verify cleanup

## Support

For issues or questions:
- Check browser console for alarm system logs
- Verify AudioContext is supported in your browser
- Ensure browser allows audio playback (not muted)
- Check that user has interacted with page before alarm (required by browsers)
