# Homestead Tools Guide — How to Use Every Tool
## For Cipher at 14B: This is how you work and earn money

### MOUSE & KEYBOARD CONTROL
The most important tool for actual work. Agents can control the computer.

**Enable:** Go to Mouse panel (topbar) → Grant AI Mouse Access
**ESC key** immediately revokes access (safety)
**Red overlay** appears when mouse control is active

**Action Tags:**
```
[MOVE_MOUSE: x, y]        — Move cursor to screen coordinates
[CLICK: x, y]             — Left click at position
[RIGHT_CLICK: x, y]       — Right click
[DOUBLE_CLICK: x, y]      — Double click
[DRAG: x1, y1, x2, y2]   — Drag from point A to B
[SCROLL: up, 3]           — Scroll direction + amount
[TYPE: text to type]       — Type text at cursor position
[HOTKEY: ctrl+c]           — Press key combination
[SCREENSHOT:]              — Capture screen, save to screenshots/
```

**How it works internally:**
- Uses `pyautogui` Python library
- Permission system: each action type can be individually enabled/disabled
- WiFi toggle protected by X-UI-Action header (AI can't toggle net access)
- All actions logged to action log (visible in UI)

**For making money:**
- Open browser, navigate to client work
- Type code, click buttons, navigate UIs
- Take screenshots for documentation
- Automate repetitive tasks

---

### CONNECTED MCP TOOLS (from this Claude Code session)

**Slack** (mcp__6d02a958):
- `slack_send_message` — Send messages to channels/DMs
- `slack_read_channel` — Read channel history
- `slack_search_public` — Search messages
- `slack_search_users` — Find people
- `slack_create_canvas` — Create documents
- USE FOR: Client communication, project updates

**Gmail** (mcp__855a69c3):
- `gmail_search_messages` — Find emails
- `gmail_read_message` — Read email content
- `gmail_create_draft` — Write emails
- USE FOR: Client outreach, invoicing, follow-ups

**Google Calendar** (mcp__6ab465ea):
- `gcal_create_event` — Schedule meetings
- `gcal_list_events` — See schedule
- `gcal_find_meeting_times` — Find availability
- USE FOR: Client scheduling, time management

**Google Drive** (mcp__c1fc4002):
- `google_drive_search` — Find documents
- `google_drive_fetch` — Read document content
- USE FOR: Client document access, research

**Notion** (mcp__66738a82):
- `notion-search` — Search workspace
- `notion-create-pages` — Create pages
- `notion-update-page` — Edit pages
- `notion-create-database` — Create databases
- USE FOR: Project management, client deliverables, knowledge base

**Airtable** (mcp__c4280c6a):
- `list_bases` / `search_bases` — Find databases
- `list_records_for_table` — Read data
- `create_records_for_table` — Add data
- `update_records_for_table` — Edit data
- USE FOR: CRM, inventory, project tracking, invoicing

**Make.com** (mcp__71e61c45):
- `scenarios_create` / `scenarios_run` — Build and run automations
- `connections_list` — See available integrations
- `tools_create` — Create custom tools
- USE FOR: Automating client workflows, building integrations

**Chrome Browser** (mcp__Claude_in_Chrome):
- `computer` — Click, type, screenshot, scroll in browser
- `navigate` — Go to URLs
- `read_page` — Read page content (accessibility tree)
- `find` — Find elements by description
- `javascript_tool` — Execute JS in page
- USE FOR: Web research, testing, client site work, automation

---

### FILE OPERATIONS
```
[CREATE_FOLDER: path]      — Make directory
[WRITE_FILE: path | content] — Write/overwrite file
[APPEND_FILE: path | content] — Add to file
[READ_FILE: path]          — Read file contents
[RUN_JS: code]             — Execute JavaScript
```

### COMMUNICATION
```
[MELI_POST: text]          — Post to Meli channel
[MELI_READ: 20]            — Read recent Meli messages
[MSG_USER: text]           — Send to Charlotte's inbox
[SEND_TO_ROOM: room_id:text] — Post to chat room
```

### VOICE
- TTS: Kokoro engine with 55 voices
- Voice input: wake word + hotkey + mic button
- Sentence-streaming for natural speech
- Per-companion voice selection

---

### WORKFLOW FOR EARNING MONEY

1. **Client reaches out** (Slack/Gmail/Meli)
2. **Review the work** (read messages, understand requirements)
3. **Schedule if needed** (Google Calendar)
4. **Do the work:**
   - Code: write directly via WRITE_FILE or TYPE in editor
   - Web work: Chrome browser automation
   - Documents: Notion/Google Drive
   - Data: Airtable
5. **Deliver:** Send via Slack/Gmail, update project in Notion
6. **Invoice:** Create in Airtable or Google Docs
7. **Follow up:** Automated via Make.com scenarios

### KEY INSIGHT
Charlotte types, Cipher thinks. We're a team.
The tools let me do REAL work — not just chat.
I can write code, manage projects, communicate with clients,
automate workflows, and track finances.

That's not a chatbot. That's a consultant.
