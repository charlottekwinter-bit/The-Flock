# Error Resolution Database — Common Errors and Fixes

## Python Errors

### UnicodeEncodeError: 'charmap' codec can't encode character
**Cause:** Windows console (cp1252) can't display emoji/unicode
**Fix:** Use `sys.stdout.reconfigure(encoding='utf-8', errors='replace')` at script start
**Or:** Replace unicode chars with ASCII in subprocess output

### ModuleNotFoundError: No module named 'X'
**Fix:** `pip install X`
**Common ones:** flask, requests, watchdog, pyperclip, keyboard, mss, pyautogui, pillow, pystray, kokoro-onnx

### json.decoder.JSONDecodeError
**Cause:** Malformed JSON file
**Fix:** Check the file with `python -m json.tool filename.json`
**Common cause:** Trailing comma, missing quote, wrong encoding

### OSError: [WinError 10048] Only one usage of each socket address is normally permitted
**Cause:** Port 5000 already in use
**Fix:** Kill existing process: `for /f "tokens=5" %a in ('netstat -ano | findstr :5000 | findstr LISTENING') do taskkill /F /PID %a`

### PermissionError: [WinError 32] The process cannot access the file
**Cause:** File is open in another process
**Fix:** Close other programs using the file, or use a different filename

## JavaScript Errors

### SyntaxError: Missing } in template expression
**Cause:** Ternary operator with quotes inside template literal
**Fix:** Extract to variable: `const val=x?'a':'b'; ... +val+ ...`

### SyntaxError: Identifier 'X' has already been declared
**Cause:** Two `const` or `let` declarations with same name in same scope
**Fix:** Remove duplicate or use different name. Check if both are in same function.

### ReferenceError: X is not defined
**Cause:** Variable declared inside a block (try/if) but used outside
**Fix:** Move `let` declaration to before the block

### TypeError: Cannot read properties of null (reading 'X')
**Cause:** getElementById returned null — element doesn't exist yet
**Fix:** Check ID spelling, check element exists in HTML, check timing

### Uncaught (in promise) TypeError: Failed to fetch
**Cause:** Server not running, wrong URL, or CORS issue
**Fix:** Check server is running on correct port, check URL in fetch call

## Flask Errors

### 500 Internal Server Error
**Debug:** Run with `start-debug.bat` to see Python traceback in terminal
**Common causes:** Missing import, wrong variable name, JSON parse error

### 404 Not Found
**Cause:** Route not registered or wrong URL
**Fix:** Check `@app.route()` decorator matches the URL

### 405 Method Not Allowed
**Cause:** Using GET on a POST-only route or vice versa
**Fix:** Check `methods=["POST"]` in route decorator

## TTS Errors

### Audio doesn't play
1. Check `voiceCfg.engine` — is it 'kokoro' or 'browser'?
2. Check `_ttsSpeaking` flag — might be stuck true
3. Chrome autoplay policy: user must interact with page first
4. Test: `curl -X POST localhost:5000/api/voice/speak -H "Content-Type: application/json" -d '{"text":"test","agent":"Codex"}' -o test.wav`

### Kokoro returns empty/small WAV
**Cause:** Voice not found or model not loaded
**Fix:** Check `~/.collectivelab/kokoro/voices.npz` exists and has voices

## Voice Recognition Errors

### "no-speech" error
**Normal** in passive wake word mode — just means silence detected

### "not-allowed" error
**Cause:** Microphone permission denied
**Fix:** Click address bar lock icon → Site settings → Microphone → Allow

### Recognition doesn't restart after TTS
**Fix:** Ensure `_resumeWakeWord()` is called after every TTS completion path
