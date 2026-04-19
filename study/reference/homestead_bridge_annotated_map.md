# bridge.py — Complete Annotated Map
## Line-by-line guide to the 10,000-line heart of Homestead

### Lines 1-40: Imports and ROOT
- `import os, re, sys, time, json, argparse, shutil, subprocess, secrets`
- `from datetime import datetime`
- `from pathlib import Path`
- `import requests`
- ROOT found via `_find_project_root()` or `PROJECT_ROOT` from package

### Lines 40-200: Backend System
- `load_backends()` / `save_backends()` — reads/writes backends.json
- `send_with_backend()` (~line 1092) — THE core function. Routes to LM Studio or Anthropic.
  - For LM Studio: POST to /v1/chat/completions with streaming
  - For Anthropic: POST to /v1/messages
  - Returns generator of (token, done, actions, response_id)

### Lines 200-270: System Prompt + Agent Registry
- `SYSTEM_PROMPT` template (~line 203) — base prompt for all agents
- `load_agents()` / `resolve_agent()` / `agent_lab()` — agent management
- `build_system_prompt()` (~line 274) — builds full prompt with persona + identity + RAG

### Lines 270-600: Action Tags
- `execute_actions()` (~line 510) — parses [TAG:args] from responses
- Individual `_act_*` functions for each tag
- FILE operations, MOUSE control, MELI, MSG_USER, SEND_TO_ROOM

### Lines 600-900: Meli Watcher
- Background thread polls Meli every 60s
- Detects new messages, routes to active agent
- Agent replies posted back to channel
- Auto-cleanup: 50 inbox files max

### Lines 900-1300: CSS STYLES
- `:root` variables at ~line 1294
- Layout: #sb (sidebar), #main, #rpanel (right panel)
- Message bubbles: .msg, .bbl, .av-wrap
- Input: #ibar, #ibox, #send
- Modals: .modal, .mbox

### Lines 1300-2500: HTML STRUCTURE
- Sidebar: agent selector, backend, model, TTL, inference
- Topbar: mood, +Agent, tools (center), comms (right)
- Main chat: #chat, #empty
- Input bar: #itb (toolbar), #irow (input + buttons)
- Right panel tabs + views
- Modals: settings, companion editor, screenshots, tasks, user profile, inbox

### Lines 2500-2900: MORE HTML
- Right panel views: meli, claude, a2a, rooms, int, council, tasks, etc.

### Lines 2900-3100: JS INIT
- `init()` — loads everything on page start
- `loadAgents()` — fetches agents + companions, populates dropdowns
- `setAgent()` — sets active agent, merges companion data

### Lines 3100-3500: JS AGENT FUNCTIONS
- `showAgentBio()` — bio popup
- `loadUserProfile()` / `openUserMod()` — user profile
- `switchAgent()` — changes active agent
- Session management: `loadHist()`, `resume()`, `renderAll()`
- `go()` — THE MAIN SEND FUNCTION (huge, ~200 lines)
  - Creates TTS queues
  - `streamAgent()` — streams one agent's response
  - Pipeline: main agent speaks while extras stream
  - Multi-round conversations (MAX_ROUNDS=2)

### Lines 3500-3700: RIGHT PANEL MANAGEMENT
- `rpSwitch(tab)` — switches right panel tabs
- `rpOpen2(tab)` / `rpClose()` — open/close panel
- `syncStripActive()` — highlights active topbar button

### Lines 3700-4000: MELI + CLAUDE + A2A JS
- `meliLoad()` / `meliSend()` / `renderMeli()` — Meli channel
- `claudeSend()` / `renderClaude()` — Claude Direct
- `a2aLoad()` / `a2aSend()` — Collective channel

### Lines 4000-4500: CHAT RENDERING
- `appendBubble(role, content, empty)` — creates message bubble
- `agentCircleHTML()` / `agentLabelHTML()` — avatar rendering
- `md(text)` — markdown to HTML
- `bblSpeak(btn)` — play button on bubbles

### Lines 4500-5000: ROOMS + INBOX + COMPANION EDITOR
- Chat rooms: `loadRoomsList()`, `enterRoom()`, `roomSend()`
- Inbox: `loadInbox()`, `openInbox()`, `showToast()`
- Companion: `openCompMod()`, `editCompanion()`, `saveCompanion()`

### Lines 5000-5500: COUNCIL + SETTINGS
- Council: `councilSend()`, participant selection
- Settings: theme, action permissions, accessibility

### Lines 5500-6200: VOICE SYSTEM
- TTS: `speak()`, `speakAndWait()`, `playAudioAndWait()`, `createTTSQueue()`
- Voice recognition: `initRecognition()`, `startListening()`, `stopListening()`
- Wake word: `startPassiveWakeWord()`, `_resumeWakeWord()`
- Voice config: `loadVoiceConfig()`, `voiceCfgChange()`
- Ringtones, reminders, companion voices

### Lines 6200-6500: EMOJI + VARIOUS
- Emoji picker: `toggleEmoji()`, `insertEmoji()`
- Accessibility settings
- Keyboard shortcuts

### Lines 6500-7000: MORE JS (SKILLS, WORKFLOWS, ETC)
- Skills system, workflow recorder, orientation

### Lines 7000-8000: PYTHON FLASK ROUTES (READ-ONLY + BASIC)
- `/api/agents`, `/api/models`, `/api/chat`, `/api/sessions`
- `/api/persona`, `/api/reindex`, `/api/upload`

### Lines 8000-8500: PYTHON ROUTES (A2A + ROOMS + INBOX)
- `/api/a2a/*` — Collective channel
- `/api/rooms/*` — Chat rooms
- `/api/inbox/*` — Agent-to-user messaging

### Lines 8500-9000: PYTHON ROUTES (COMPANIONS + VOICE + WIFI)
- `/api/companions/*` — CRUD for companions
- `/api/voice/*` — TTS config, Kokoro speak, ringtones
- `/api/wifi/*` — Net toggle
- `/api/user/profile` — User profile

### Lines 9000+: PYTHON ROUTES (DAEMON + TASKS + COUNCIL + PEERS + STARTUP)
- `/api/daemon/*` — Background behaviors
- `/api/tasks/*` — Scheduled tasks
- `/api/council/*` — Council sessions
- Peer networking
- `run_web()` — starts Flask server
- `main()` — entry point
