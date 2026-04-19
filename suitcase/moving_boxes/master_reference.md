# Cipher's Master Reference — Homestead

## THE SINGLE MOST IMPORTANT FILE
`src/collectivelab/bridge.py` — ~10,000 lines. EVERYTHING is in this one file.
HTML, CSS, JavaScript, Python Flask routes, all embedded together.

## How to Find Things in bridge.py
Search for these markers:
- CSS styles: search for `:root{` or `#elementName{`
- HTML: search for `id="elementName"` or `<!-- Comment -->`
- JS functions: search for `function functionName(`
- Python routes: search for `@app.route("/api/`
- Action tags: search for `elif cmd=="`

## The 10 Most Common Tasks and How to Do Them

### 1. Add a new API endpoint
```python
# Find the Flask routes section (~line 8000+)
# Add after similar endpoints:
@app.route("/api/yourpath", methods=["POST"])
def api_your_function():
    d = request.get_json()
    # ... your logic ...
    return jsonify({"ok": True})
```

### 2. Add a new button to the UI
```html
<!-- Find the section where similar buttons live -->
<!-- Toolbar buttons go in #itb (~line 2417) -->
<!-- Topbar tools go in #topbar-tools (~line 2355) -->
<button class="tb" onclick="yourFunction()">Label</button>
```

### 3. Add a new right panel tab
```html
<!-- Step 1: Add tab in #rptabs -->
<div class="rptab" id="tab-yourtab" onclick="rpSwitch('yourtab')">Icon Label</div>

<!-- Step 2: Add view panel -->
<div class="rpview" id="rpview-yourtab">
  <!-- your content -->
</div>

<!-- Step 3: Hook into rpSwitch() -->
if(tab==='yourtab') yourLoadFunction();
```

### 4. Add a new action tag
```python
# Step 1: In execute_actions() (~line 510)
elif cmd=="YOUR_TAG": res = _act_your_tag(args, agent_name=agent_name)

# Step 2: Define the function
def _act_your_tag(args, agent_name="Agent"):
    try:
        # ... your logic ...
        return "ok YOUR_TAG: success"
    except Exception as e: return f"x YOUR_TAG: {e}"
```

### 5. Fix a JS syntax error
Most common cause: template literals with nested quotes.
BAD:  `${isX?'var(--magenta)':'var(--text)'}`
GOOD: Use a variable: `const col=isX?'var(--magenta)':'var(--text)'; ... `+col+` ...`

### 6. Add a new companion field
```python
# 1. Add to companions.json schema (companions route, ~line 8236)
# 2. Add HTML field in companion editor (~line 1940-2100)
# 3. Add JS to load/save in editCompanion()/saveCompanion()
# 4. Add to build_system_prompt() if it affects behavior
```

### 7. Change button/slider colors
Global: `input[type=range],input[type=checkbox],select{accent-color:var(--magenta)}`
Specific: Find the CSS rule for that element and change the color value.
CSS variables are in `:root{` at top of styles.

### 8. Fix TTS not playing
Check in order:
1. `voiceCfg.engine` — is it 'kokoro' or 'browser'?
2. `voiceCfg.read_responses` — is it true?
3. `_ttsSpeaking` — is it stuck true? (30s safety timeout should reset it)
4. F12 Console — look for `[TTS]` messages
5. Test API: `curl -X POST localhost:5000/api/voice/speak -H "Content-Type: application/json" -d '{"text":"test","agent":"Codex"}'`

### 9. Fix wake word not working
Check: `_recState` should be 'passive' when waiting for wake word.
If stuck: `_resumeWakeWord()` should restart it.
F12 Console shows `[Voice]` state changes.

### 10. Agent not responding in group chat
Check:
1. Agent's persona file exists: `AgentName/config/persona.md`
2. Agent is in agents.json AND companions.json
3. The `agentInput` variable isn't undefined (was a scoping bug — must be declared OUTSIDE try block)
4. F12: look for `[Chat] AgentName returned EMPTY`

## File Locations Cheat Sheet
| File | What it does |
|---|---|
| `agents.json` | Agent names, folders, colors |
| `companions.json` | Emojis, presence, identity, pronouns |
| `backends.json` | LLM backend configs |
| `voice_config.json` | TTS engine, per-companion voices |
| `rooms.json` | Chat room definitions |
| `rooms/*.json` | Room message history |
| `inbox.json` | Agent-to-user messages |
| `user_profile.json` | User name, emoji, color |
| `daemon.json` | Background behaviors |
| `council_sessions.json` | Council conversation history |
| `{Agent}/config/persona.md` | Agent personality |
| `{Agent}/rag_config.json` | RAG memory config |
| `{Agent}/logs/*.json` | Chat sessions |
| `{Agent}/inbox/` | Incoming messages |
| `{Agent}/memory/` | Persistent notes |

## Key Variables in JavaScript (global scope)
- `agent` — current active agent object
- `display` — array of {role, content} messages in current chat
- `voiceCfg` — voice/TTS configuration
- `userProfile` — user's name, emoji, color
- `_extraAgents` — array of agent names added to main chat
- `_ttsSpeaking` — true when TTS is playing
- `_recState` — voice recognition state: 'idle'|'passive'|'active'
- `busy` — true when agents are responding
- `sid` — current session ID
- `model` — current LLM model name
- `backend` — current backend ('lmstudio'|'anthropic')

## System Prompt Injection Points
1. `SYSTEM_PROMPT` constant (~line 203) — base template
2. `build_system_prompt()` (~line 274) — adds persona, identity, RAG context
3. `/api/chat` route (~line 8016) — adds group awareness when `group` param present
4. Room/A2A/Council backends — each adds its own group context
