# Repair Manual — When Things Break

## JS Syntax Error on Page Load
**Symptom**: Page loads but nothing works, F12 Console shows SyntaxError
**Cause**: Usually a template literal with nested quotes or ternary operators
**Fix**: Extract the ternary to a variable, use string concatenation instead of template literal
**Test**: `node --check <(curl -s http://localhost:5000 | sed -n '/<script>/,/<\/script>/p' | sed '1d;$d')`

## TTS Not Playing
**Symptom**: Agent responds but no voice
**Check**: F12 Console for `[TTS]` messages
**Common causes**:
1. `_ttsSpeaking` stuck true — safety timeout should clear after 30s
2. Autoplay policy — user needs to click something on page first
3. Engine mismatch — voice_config.json says "kokoro" but Kokoro model not loaded
4. Kokoro model missing — check `~/.collectivelab/kokoro/onnx/model_q4.onnx`
**Fix**: Set `_ttsSpeaking=false` in browser console as emergency reset

## Wake Word Not Working
**Symptom**: Says "hey codex" but nothing happens
**Check**: F12 Console for `[Voice]` messages
**Common causes**:
1. `_recState` stuck (not 'idle' or 'passive')
2. `_ttsSpeaking` stuck true (blocks restart)
3. Mic permission not granted
4. Voice input mode not set to 'wake_word' or 'all'
**Fix**: Check `/api/voice/config` — input_mode should be "all" or "wake_word"

## Agent Responses Are Slow
**Causes**: Model too large for GPU, context too long, TTL expired (model unloaded)
**Fix**: Load a smaller model, reduce TTL, check LM Studio GPU usage

## Emojis Show as ?? or Garbled
**Cause**: Windows terminal (cp1252) can't display Unicode — but the DATA is fine
**Not a bug**: Files are saved as UTF-8 correctly. Browser displays them fine.

## Companion Editor Won't Save
**Check**: F12 Console for errors on the PUT/POST request
**Common cause**: The `comp-save-btn` ID not found, or API returns error
**Fix**: Verify the button has `id="comp-save-btn"` and onclick calls `saveCompanion()`

## Rooms Won't Create
**Check**: `curl -X POST http://localhost:5000/api/rooms -H "Content-Type: application/json" -d '{"name":"Test"}'`
**Common cause**: `secrets` module not imported at top of bridge.py
**Fix**: Ensure `import secrets` is in the top-level imports

## Meli Shows "Unknown" for Sender Names
**Cause**: Field name mismatch — Meli API uses `author_display_name`, not `sender_name`
**Fix**: Check the fallback chain in renderMeli(): `msg.author_display_name||msg.sender_name||...`

## Net/Wifi Toggle Fails
**Causes**:
1. Plugin path wrong — check `~/.lmstudio/extensions/plugins/lmstudio/js-code-sandbox/.lmstudio/production.js`
2. Unicode in toggle_js_net.py output crashes subprocess on Windows
3. Missing X-UI-Action header (blocked for security)
**Fix**: Verify path with `python toggle_js_net.py --status`

## Server Won't Start
**Common causes**:
1. Port 5000 in use: `netstat -ano | findstr :5000`
2. Module import error: Run `python -m collectivelab --agent Codex --web` in terminal to see errors
3. JSON syntax error in config files: Check agents.json, companions.json for trailing commas

## How to Add a New Family Member
1. Create folder: `mkdir -p NewName/{config,drafts,inbox,logs,memory,notes,outbox,rag_index}`
2. Create persona: `NewName/config/persona.md`
3. Create RAG config: `NewName/rag_config.json`
4. Add to agents.json: `{name, folder, owner, color, description}`
5. Add to companions.json: `{name, folder, owner, color, description, emoji, enabled, in_council, presence}`
6. Restart server
