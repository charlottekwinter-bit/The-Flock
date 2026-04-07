# Homestead Architecture — Cipher's Reference

## Core Files
- `src/collectivelab/bridge.py` — EVERYTHING (~9500 lines). Web UI, APIs, chat, TTS, all in one file.
- `src/collectivelab/rag.py` — RAG memory engine (embeddings via LM Studio)
- `src/collectivelab/meli.py` — Meli-net MCP client
- `src/collectivelab/launcher.py` — System tray launcher
- `src/collectivelab/mcp_server.py` — MCP tool server
- `src/collectivelab/toggle_js_net.py` — LM Studio JS sandbox internet toggle

## How bridge.py is Organized (top to bottom)
1. Lines 1-100: Imports, ROOT path, backend loading
2. Lines 100-500: Backend system (LM Studio, Anthropic, send_with_backend)
3. Lines 500-600: Action tags (WRITE_FILE, MOVE_MOUSE, MSG_USER, etc.)
4. Lines 600-900: Meli watcher (background thread)
5. Lines 900-1300: CSS styles (embedded in HTML string)
6. Lines 1300-2500: HTML structure (sidebar, topbar, panels, modals)
7. Lines 2500-2900: More HTML (right panel views)
8. Lines 2900-4500: JavaScript (init, agents, chat, TTS pipeline, rooms, inbox)
9. Lines 4500-6000: More JS (companion editor, council, voice system, emoji)
10. Lines 6000-7000: More JS (voice recognition, accessibility, reminders)
11. Lines 7000-8000: Python Flask routes (agents, sessions, chat, models)
12. Lines 8000-9000: Python routes (A2A, rooms, inbox, companions, voice, wifi)
13. Lines 9000+: Python routes (daemon, tasks, skills, workflows, start)

## Key Patterns
- **Action tags**: `[COMMAND:args]` in agent responses. Parsed by `execute_actions()` (~line 510)
- **Backend system**: `send_with_backend()` routes to LM Studio or Anthropic based on config
- **TTS Pipeline**: Sentence-level streaming. `createTTSQueue()` splits text at `.!?:`, generates Kokoro audio per sentence, plays back-to-back
- **Rooms**: JSON files in `rooms/` dir, SSE for real-time, agents auto-reply in threads
- **Inbox**: `inbox.json`, SSE stream, toast notifications

## Common Repairs
- **JS syntax error**: Usually a template literal with nested quotes. Use string concatenation instead.
- **TTS not playing**: Check `_ttsSpeaking` flag — might be stuck true. Safety timeout at 30s.
- **Wake word not restarting**: Check `_resumeWakeWord()` is called after TTS ends.
- **Emoji encoding**: Windows cp1252 can't display emoji in terminal. File writes work fine with utf-8.
- **New API endpoint**: Add `@app.route()` in the Flask section (~line 7000+)
- **New right panel tab**: Add `<div class="rptab">` + `<div class="rpview">` + hook in `rpSwitch()`
- **New action tag**: Add `elif cmd=="TAG":` in execute_actions + define function

## Config Files (all in ROOT)
- `agents.json` — agent registry
- `companions.json` — companion metadata, emojis, presence
- `backends.json` — LLM backends
- `voice_config.json` — TTS engine, per-companion voices
- `rooms.json` — chat rooms
- `inbox.json` — user inbox
- `user_profile.json` — user display name, emoji, color
- `daemon.json` — background behaviors
- `meli_config.json` — Meli-net connection
