# Homestead Complete API Reference
## Every endpoint, what it does, how to call it

### Agents
GET  /api/agents                    → {agents: [{name, folder, owner, color, description}]}
GET  /api/persona?agent=Name        → {persona: "markdown text"}
POST /api/persona                   → {agent, persona} → saves persona.md

### Chat
POST /api/chat                      → {input, model, agent, backend, ttl, response_id, history, group}
                                      Returns SSE: {token, done, actions, response_id}

### Sessions
GET  /api/sessions?agent=Name       → {sessions: [{id, saved_at, preview, turns}]}
GET  /api/sessions/<sid>?agent=Name → {id, display_messages, response_id}
POST /api/sessions                  → {display_messages, response_id, session_id, agent}
DELETE /api/sessions/<sid>?agent=Name → deletes session

### Models (LM Studio)
GET  /api/models                    → {models: ["model-name", ...]}
POST /api/model/load                → {model: "name"} → loads in LM Studio
POST /api/model/unload              → {instance_id: "name"} → unloads
POST /api/model/download            → {model: "name"} → starts download
GET  /api/model/download/status     → {progress, status}

### Backends
GET  /api/backends                  → {backends: [{id, name, type, host, enabled, default}]}
POST /api/backends                  → create/update backend
DELETE /api/backends/<id>           → delete backend

### Companions
GET  /api/companions                → {companions: [{name, emoji, color, presence, ...}]}
POST /api/companions                → create new companion
PUT  /api/companions/<name>         → update existing
DELETE /api/companions/<name>       → delete

### Rooms (A2A Chat Rooms)
GET  /api/rooms                     → {rooms: [{id, name, members, created_by}], max_rooms}
POST /api/rooms                     → {name, members, created_by} → creates room
DELETE /api/rooms/<rid>             → deletes room
GET  /api/rooms/<rid>/messages      → {messages: [{id, from, text, ts, type}]}
POST /api/rooms/<rid>/send          → {text, from, type} → sends message, triggers agent replies
GET  /api/rooms/<rid>/events        → SSE stream of new messages

### Inbox (Agent-to-User)
GET  /api/inbox                     → {messages: [{id, from, text, ts, read}]}
POST /api/inbox                     → {from, text} → agent sends message to user
POST /api/inbox/<mid>/read          → marks as read
DELETE /api/inbox/<mid>             → deletes message
GET  /api/inbox/events              → SSE stream of new inbox messages

### Voice / TTS
GET  /api/voice/config              → voice_config.json contents
POST /api/voice/config              → saves voice config
POST /api/voice/speak               → {text, agent} → returns audio/wav (Kokoro) or JSON
GET  /api/voice/kokoro/voices       → {voices: ["af_bella", ...], available: true/false}
GET  /api/voice/ringtones           → {ringtones: [{id, name, type}]}
GET  /api/voice/reminders           → {reminders: [...]}

### User Profile
GET  /api/user/profile              → {name, emoji, color}
POST /api/user/profile              → saves profile

### WiFi/Net
GET  /api/wifi/status               → {ok, on, raw}
POST /api/wifi/toggle               → requires X-UI-Action:1 header → {ok, on}

### Mouse
GET  /api/mouse/permissions         → {permissions: {enabled, move, click, ...}}
POST /api/mouse/permissions         → update permissions

### A2A (Collective Channel)
GET  /api/a2a/messages?limit=50     → {messages: [...]}
POST /api/a2a/send                  → {from, to, text} → broadcasts or targets agent
GET  /api/a2a/events                → SSE stream

### Council
GET  /api/council/configs           → saved participant presets
POST /api/council/configs           → save preset
GET  /api/council/sessions          → past sessions
POST /api/council/sessions          → save session
POST /api/council/send              → {prompt, participants, post_to_meli}
                                      Returns SSE: {type:"start"|"response"|"done", agent, text}

### Daemon
GET  /api/daemon                    → {version, behaviors}
POST /api/daemon/behaviors          → add behavior
PUT  /api/daemon/behaviors/<bid>    → update behavior
POST /api/daemon/behaviors/<bid>/toggle → enable/disable

### Meli
GET  /api/meli/status               → {connected}
GET  /api/meli/read?limit=20        → {messages: [{author_display_name, content, created_at}]}
POST /api/meli/post                 → {text, display_name}
POST /api/meli/active               → {agent: "Name"} → sets active agent for watcher
GET  /api/meli/events               → SSE stream

### File Upload
POST /api/upload                    → multipart form with file → saves to agent uploads

### Integrations
GET  /api/integrations              → list integrations
POST /api/integrations              → create
PUT  /api/integrations/<id>         → update
DELETE /api/integrations/<id>       → delete

### Reindex
POST /api/reindex                   → {agent: "Name"} → rebuilds RAG index

### Screenshots
GET  /api/screenshots               → list screenshots
GET  /api/screenshots/<fname>       → serve screenshot file

### Tasks
GET  /api/tasks                     → {tasks: [...]}
POST /api/tasks                     → create scheduled task
PUT  /api/tasks/<tid>               → update task
DELETE /api/tasks/<tid>             → delete task
POST /api/tasks/<tid>/run           → run task now
