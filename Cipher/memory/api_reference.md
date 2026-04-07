# Homestead API Reference

## Chat
- `POST /api/chat` — Send message to agent. Body: `{input, model, agent, response_id, backend, ttl, history}`. Returns SSE stream: `{token, done, response_id, actions}`

## Agents
- `GET /api/agents` — List all agents: `{agents: [{name, folder, owner, color, description}]}`
- `GET /api/models` — List loaded LM Studio models

## Sessions
- `GET /api/sessions?agent=NAME` — List sessions for agent
- `POST /api/sessions` — Save session: `{display_messages, response_id, session_id, agent}`
- `GET /api/sessions/<sid>?agent=NAME` — Load session
- `DELETE /api/sessions/<sid>?agent=NAME` — Delete session

## Companions
- `GET /api/companions` — List all companions with full metadata
- `POST /api/companions` — Create new companion
- `PUT /api/companions/<name>` — Update companion (partial update)
- `DELETE /api/companions/<name>` — Delete companion
- `POST /api/companions/<name>/image` — Upload profile image (multipart)
- `GET /api/companions/<name>/image` — Get profile image

## Rooms (A2A Chat Rooms)
- `GET /api/rooms` — List rooms: `{rooms: [...], max_rooms, agent_can_create}`
- `POST /api/rooms` — Create: `{name, members: [], created_by}`
- `DELETE /api/rooms/<id>` — Delete room
- `GET /api/rooms/<id>/messages?limit=50` — Get messages
- `POST /api/rooms/<id>/send` — Send: `{text, from, type: "user"|"agent"}`
- `GET /api/rooms/<id>/events` — SSE stream for real-time messages

## Inbox
- `GET /api/inbox` — Get all messages (unread first)
- `POST /api/inbox` — Agent sends message: `{from, text}`
- `POST /api/inbox/<id>/read` — Mark read
- `DELETE /api/inbox/<id>` — Delete
- `GET /api/inbox/events` — SSE stream for new messages

## Voice
- `GET /api/voice/config` — Get voice config
- `POST /api/voice/config` — Save voice config
- `POST /api/voice/speak` — Generate Kokoro TTS: `{text, agent}`. Returns WAV blob
- `GET /api/voice/kokoro/voices` — List available Kokoro voices
- `GET /api/voice/ringtones` — List ringtones
- `GET /api/voice/reminders` — List reminders

## Meli
- `GET /api/meli/status` — Connection status
- `GET /api/meli/read?limit=N` — Read messages
- `POST /api/meli/post` — Send: `{text, display_name}`
- `GET /api/meli/events` — SSE stream
- `POST /api/meli/active` — Set active agent for watcher

## A2A (Collective)
- `GET /api/a2a/messages?limit=50` — Get A2A messages
- `POST /api/a2a/send` — Send: `{from, to, text}`
- `GET /api/a2a/events` — SSE stream

## Council
- `GET /api/council/sessions` — Past sessions
- `POST /api/council/sessions` — Save session
- `POST /api/council/send` — SSE stream: sends prompt to selected agents
- `GET /api/council/configs` — Saved participant presets
- `POST /api/council/configs` — Save preset

## User
- `GET /api/user/profile` — Get user profile
- `POST /api/user/profile` — Save: `{name, emoji, color}`

## System
- `GET /api/wifi/status` — JS sandbox internet status
- `POST /api/wifi/toggle` — Toggle (requires X-UI-Action:1 header)
- `GET /api/backends` — List backends
- `POST /api/reindex` — Rebuild RAG index: `{agent}`
- `GET /api/persona?agent=NAME` — Get persona markdown
- `POST /api/persona` — Save persona: `{agent, persona}`
- `GET /api/mouse/permissions` — Mouse automation status
- `POST /api/mouse/permissions` — Grant/revoke: `{enabled}`

## Action Tags (used by agents in responses)
- `[WRITE_FILE:path:content]` — Create/overwrite file
- `[APPEND_FILE:path:content]` — Append to file
- `[READ_FILE:path]` — Read file contents
- `[CREATE_FOLDER:path]` — Create directory
- `[RUN_JS:code]` — Execute JavaScript
- `[SCREENSHOT]` — Capture screen
- `[MOVE_MOUSE:x,y]` — Move cursor
- `[CLICK:x,y]` / `[RIGHT_CLICK:x,y]` / `[DOUBLE_CLICK:x,y]`
- `[TYPE:text]` — Type keystrokes
- `[HOTKEY:keys]` — Press key combo
- `[MELI_POST:text]` — Post to Meli channel
- `[MELI_READ:limit]` — Read Meli messages
- `[MSG_USER:text]` — Send to user's inbox
- `[SEND_TO_ROOM:room_id:text]` — Post to chat room
