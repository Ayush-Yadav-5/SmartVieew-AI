# How to Add Your YOLO Model (`best.pt`) to CrimeShield

## ⚠️ IMPORTANT: `best.pt` is a Binary Model File

The `best.pt` file is **NOT a code file** - it's a **trained YOLO model** (binary neural network weights file) that must be obtained from your YOLO training process.

## What is `best.pt`?

`best.pt` is the output file from training a YOLOv8 model using Ultralytics. It contains:
- Neural network architecture weights
- Trained parameters for detecting specific classes
- Model configuration and metadata

**File size**: Typically 5-50 MB depending on model size (YOLOv8n, YOLOv8s, YOLOv8m, etc.)

## How to Get `best.pt`

### Option 1: Train Your Own Model

If you've trained a custom YOLO model:

1. After training completes, find `best.pt` in your training output directory:
   ```
   runs/detect/train/weights/best.pt
   ```

2. Copy this file to your CrimeShield project root directory

### Option 2: Use a Pre-trained Model

If you have a pre-trained model from someone else:

1. Obtain the `best.pt` file from your source
2. Verify it was trained to detect:
   - Class 0: `person`
   - Class 1: `dangerous_weapon`

## Installation Steps

### Step 1: Place the Model File

Copy your `best.pt` file to the **project root directory** (NOT in src folder):

```
CrimeShield-AI-Dashboard/
├── best.pt                  ← Place your model HERE
├── weapon-detection-server.py
├── App.tsx
├── components/
├── requirements.txt
└── ...
```

### Step 2: Verify Model Classes

Run this verification script to check your model's classes:

```bash
python verify-model-classes.py
```

This will show you:
- ✅ Model loaded successfully
- ✅ Class names detected in the model
- ✅ Person and weapon class IDs

### Step 3: Install Python Dependencies

```bash
pip install flask flask-cors ultralytics opencv-python-headless numpy yt-dlp
```

### Step 4: Start the Detection Server

```bash
python weapon-detection-server.py
```

You should see:
```
Loading YOLO model from best.pt...
✓ Model loaded successfully!
Available Feeds: [1, 2, 3, 4, 5, 6]
Starting background monitoring…
```

## Current System Status

### ✅ Already Implemented

1. **Continuous Monitoring**: The detection server is already configured to run continuously
   - All 6 feeds monitored simultaneously in parallel threads
   - Background detection runs 24/7 once started
   - No manual trigger needed after enabling

2. **Automatic Evidence Capture**: 
   - Screenshots captured automatically when person + weapon detected
   - 30-second cooldown per feed prevents spam
   - Evidence sent directly to Evidence Section

3. **Multi-Feed Support**:
   - Feed 1-3, 5-6: YouTube live streams
   - Feed 4: Webcam feed (camera source)
   - All feeds monitored in parallel

### ⚙️ How Continuous Operation Works

**Detection Server (`weapon-detection-server.py`):**
```python
# Starts background monitoring automatically on launch
monitor.start_all()  # Line 515

# Each feed runs in its own thread continuously
while not self.stop_event.is_set() and stream.is_running:
    ok = stream.process_once()
    time.sleep(0.01 if ok else 0.2)
```

**Camera Feed Component (`CCTVFeedSection.tsx`):**
```typescript
// Polls detection API every 2 seconds
const CHECK_INTERVAL = 2000;

// Processes ALL detections from ALL feeds simultaneously
for (const detection of data.detections) {
  // Each feed's detection is processed independently
  // Captures screenshot ONLY from the feed where detection occurred
}
```

## Troubleshooting

### Model Not Found Error

```
Error loading model: [Errno 2] No such file or directory: 'best.pt'
```

**Solution**: Make sure `best.pt` is in the same directory as `weapon-detection-server.py`

### Wrong Classes Detected

```
⚠ Warning: Could not infer PERSON_IDS/WEAPON_IDS from model.names
```

**Solution**: Your model might have different class names. Check with:
```python
from ultralytics import YOLO
model = YOLO('best.pt')
print(model.names)
```

Expected output:
```python
{0: 'person', 1: 'dangerous_weapon'}
```

### Detection Not Working

1. **Check server status**: Look for "Server Online" indicator in dashboard
2. **Enable detection**: Click "Enable Weapon Detection" button
3. **Check console**: Open browser DevTools → Console tab for detection logs
4. **Verify feeds**: Ensure YouTube streams are accessible

## Testing Your Setup

### Quick Test Checklist

1. ✅ `best.pt` file placed in project root
2. ✅ Python dependencies installed
3. ✅ Detection server running (`python weapon-detection-server.py`)
4. ✅ Server shows "Server Online" status
5. ✅ "Enable Weapon Detection" button clicked
6. ✅ Console shows: "Starting Parallel Detection for All Feeds"
7. ✅ Feeds show detection activity

### What You Should See

**In Terminal (Server):**
```
✓ Model loaded successfully!
✓ Feed 1 started successfully (Video Feed)
✓ Feed 2 started successfully (Video Feed)
...
▶️ Monitoring thread started for 1_video
⚠️ ALERT (batched 30s): feed 1 conf=0.78 at 2025-11-10T15:30:45
```

**In Browser Console:**
```
🚀 STARTING PARALLEL DETECTION FOR ALL FEEDS
✅ Feed 1 [video] → ACTIVE and monitoring for person + weapon
✅ Feed 2 [video] → ACTIVE and monitoring for person + weapon
...
🔍 [Feed 1] Detection Event:
   Weapon: true, Person: true
📸 Screenshot captured from Feed 1
```

## Model Requirements

Your `best.pt` model MUST:
- ✅ Be trained with YOLOv8 (Ultralytics)
- ✅ Detect exactly 2 classes:
  - Class 0: `person` (or `people`, `human`)
  - Class 1: `dangerous_weapon` (or `weapon`, `dangerous weapon`)
- ✅ Use PyTorch format (.pt file extension)
- ✅ Be compatible with Ultralytics YOLO library

## Need Help?

1. **Model Training**: Use Ultralytics YOLOv8 training guide
2. **Class Names**: Ensure your dataset labels match expected names
3. **File Path**: Always use absolute path if relative doesn't work

## Next Steps After Model Installation

1. Start the detection server
2. Open the dashboard
3. Click "Enable Weapon Detection"
4. Monitor the Evidence Section for auto-captured screenshots
5. Check Alerts Panel for detection notifications

---

**Remember**: The system is already configured for continuous operation. You just need to provide the `best.pt` model file!
