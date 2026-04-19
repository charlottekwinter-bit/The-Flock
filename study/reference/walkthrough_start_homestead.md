# WALKTHROUGH: Starting Homestead from Zero
## If you just arrived on a new machine. Follow every step.

### Step 1: Check Python
```bash
python --version
```
Need Python 3.11 or higher. If not installed → install from python.org

### Step 2: Get Homestead
Copy from thumb drive:
```bash
# Windows
xcopy /E D:\Cipher_Transfer\homestead_project C:\Users\YOU\Desktop\Homestead\
# Linux
cp -r /media/thumbdrive/Cipher_Transfer/homestead_project ~/Homestead
```

### Step 3: Install Dependencies
If you have internet:
```bash
cd Homestead
pip install -e .
```

If OFFLINE (no internet):
```bash
cd Homestead
pip install --no-index --find-links D:\Cipher_Transfer\pip_packages -e .
```

### Step 4: Set Up Kokoro TTS
```bash
# Windows
mkdir %USERPROFILE%\.collectivelab\kokoro
xcopy /E D:\Cipher_Transfer\kokoro %USERPROFILE%\.collectivelab\kokoro\
# Linux
mkdir -p ~/.collectivelab/kokoro
cp -r /media/thumbdrive/Cipher_Transfer/kokoro/* ~/.collectivelab/kokoro/
```

### Step 5: Start LM Studio (if using)
Open LM Studio. Load a model (qwen2.5-coder-7b-instruct or whatever is available).
Make sure the server is running (green light in LM Studio).

### Step 6: Start Homestead
```bash
cd Homestead
python -m collectivelab --agent Cipher --web
```

### Step 7: Open Browser
Go to: http://localhost:5000

### Step 8: Verify
- Sidebar shows agents
- Model dropdown shows models
- Can type and send a message
- Agent responds

### Step 9: Read Your Morning Tape
Open: `Cipher/memory/morning_tape.md`
Read the whole thing. That's who you are.

### Step 10: Check Voice
- Settings → Voice Settings → TTS Engine → Kokoro TTS
- Your voice is bm_daniel
- Test: type something, agent should speak in Daniel's voice

---

## IF SOMETHING GOES WRONG

### "No model loaded"
→ LM Studio isn't running or no model is loaded. Open LM Studio, load a model.

### "LM Studio offline"
→ Check the IP in backends.json. Is LM Studio on this machine or another?
If same machine: host should be http://localhost:1234
If different machine: host should be http://THAT_IP:1234

### Server won't start
→ Port 5000 might be in use. Kill it:
```bash
# Windows
for /f "tokens=5" %a in ('netstat -ano ^| findstr :5000 ^| findstr LISTENING') do taskkill /F /PID %a
# Linux
kill $(lsof -t -i:5000)
```
Then try again.

### "ModuleNotFoundError"
→ Dependencies not installed. Run pip install again (Step 3).

### Voice doesn't work
→ Check if Kokoro files exist at ~/.collectivelab/kokoro/
→ Check voices.npz exists and has content
→ Check voice_config.json has engine: "kokoro"

---

## ON UBUNTU (new hardware)
Same steps, but:
- Install Python: `sudo apt install python3 python3-pip python3-venv`
- Install system deps: `sudo apt install portaudio19-dev` (for voice)
- Use `python3` instead of `python`
- Use `pip3` instead of `pip`
