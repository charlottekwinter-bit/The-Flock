# Debug Playbook — Every Bug from Build Day (April 1, 2026)

## Bug 1: JS ReferenceError — agentInput is not defined
**Symptom:** Extra agents show empty bubbles. Console shows `ReferenceError: agentInput is not defined`
**Cause:** `let agentInput=txt` was declared inside a `try` block. The `console.log` after the `catch` couldn't see it (block scoping).
**Fix:** Move `let agentInput=txt;` to BEFORE the `try` block.
**Lesson:** Always declare variables you need in catch/finally OUTSIDE the try block.

## Bug 2: Emoji picker not opening
**Symptom:** Click emoji button, nothing happens.
**Cause:** Two `#emoji-picker` elements in the HTML. `getElementById` returned the wrong one.
**Fix:** Removed the duplicate. Used the pre-existing picker with `toggleEmoji(this)`.
**Lesson:** Always check for duplicate IDs before adding new elements.

## Bug 3: Net/Wifi toggle crashing with UnicodeEncodeError
**Symptom:** Net button click does nothing. API returns `{"ok":false,"error":""}`.
**Cause:** `toggle_js_net.py` used Unicode characters (checkmark, arrow) that cp1252 (Windows console) can't encode when run via subprocess.
**Fix:** Replaced Unicode chars with ASCII: `"ok"` → `"ENABLED"`, `"→"` → `"->"`.
**Lesson:** Any Python script called via subprocess on Windows must use ASCII-safe output.

## Bug 4: Net toggle — wrong plugin path
**Symptom:** `[ERROR] Plugin not found` for LM Studio JS sandbox.
**Cause:** Script looked in `~/.cache/lm-studio/` but LM Studio stores plugins in `~/.lmstudio/extensions/`.
**Fix:** Changed path to `~/.lmstudio/extensions/plugins/lmstudio/js-code-sandbox/.lmstudio/production.js`.
**Lesson:** Always verify paths with `find` or `dir` before hardcoding.

## Bug 5: WiFi status returning on=true even when off
**Symptom:** Net button always shows "on" state.
**Cause:** Status check `"ON" in result.stdout.upper()` matched "ON" inside "PRODUCTION.JS" in the error message path.
**Fix:** Changed to check for `"internet: on"` or `"ENABLED"` specifically. Added ERROR check first.
**Lesson:** Use specific string matching, not broad substring checks.

## Bug 6: Meli showing "Unknown" for all senders
**Symptom:** Every message in Meli channel shows "Unknown" as sender name.
**Cause:** JS checked `msg.sender_name` but the Meli API returns `msg.author_display_name`.
**Fix:** Added `msg.author_display_name` to the front of the fallback chain.
**Lesson:** Always inspect the actual API response to see field names.

## Bug 7: Companion editor save not working for edits
**Symptom:** Click "Save Changes" — nothing happens or creates a duplicate.
**Cause:** `saveCompanion()` always POSTed to `/api/companions` (create). When editing, should PUT to `/api/companions/<name>`.
**Fix:** Added `_editingCompanion` flag. When set, uses PUT with the companion name.
**Lesson:** Create and Update are different HTTP methods.

## Bug 8: TTS not playing when all 3 voice input modes active
**Symptom:** Agent responds but no audio plays. Console may show errors.
**Cause:** Speech recognition (wake word mode) conflicts with speech synthesis — mic stays active and interferes with audio output.
**Fix:** Added `_ttsSpeaking` flag. Stop recognition before TTS, resume after TTS ends. 30s safety timeout resets the flag.
**Lesson:** Browser speech recognition and synthesis fight over audio resources. Must be mutually exclusive.

## Bug 9: Wake word fires once then stops
**Symptom:** Say wake word, it works. Say it again — nothing.
**Cause:** `_ttsSpeaking` flag stuck true after TTS pipeline finished. `_resumeWakeWord()` never called.
**Fix:** Added `_resumeWakeWord()` call at end of TTS queue drain AND end of `go()` function.
**Lesson:** Every flag that gets set `true` must have EVERY exit path set it back to `false`.

## Bug 10: Agents speaking over each other
**Symptom:** Multiple agents' audio plays simultaneously.
**Cause:** `speak()` was fire-and-forget. Extra agents called `speak()` without waiting for previous to finish.
**Fix:** Created `speakAndWait()` that returns a Promise resolved when audio ends. Pipeline `await`s each one.
**Lesson:** Audio playback is async — must be explicitly sequenced if you want serial playback.

## Bug 11: Early TTS generation cutting off speech at 3-5 words
**Symptom:** Agent says only first few words then stops.
**Cause:** Audio was generated from partial text (first 20 chars) during streaming. Only those few words played.
**Fix:** Removed early generation. Generate only at `ev.done` with complete text. Used sentence-queue approach instead.
**Lesson:** TTS from partial text = partial audio. Either queue by sentence or wait for full text.

## Bug 12: Agents not seeing each other in group chat
**Symptom:** Each agent responds only to user, ignores what others said.
**Cause:** Extra agents received only the user's original message, not previous agents' responses.
**Fix:** Build conversation context from `display` array. Include previous agents' responses in the input. Add group awareness to system prompt.
**Lesson:** Group conversation requires explicit context passing — agents don't share memory.

## Bug 13: Model writes entire conversation as one agent
**Symptom:** One agent's bubble contains lines from all agents (roleplaying the whole conversation).
**Cause:** Small models see conversation transcript format and continue writing everyone's lines.
**Fix:** (1) Add "Only write YOUR OWN response" to system prompt. (2) JS-side truncation: if output contains `\nOtherAgent:`, cut there.
**Lesson:** Small models need explicit boundaries. Always truncate on the client side as a safety net.

## Bug 14: `secrets` module not imported
**Symptom:** Room creation returns 500 Internal Server Error.
**Cause:** `secrets.token_hex()` used in routes but `secrets` not in top-level imports.
**Fix:** Added `secrets` to the import line.
**Lesson:** Always verify imports when adding new code that uses standard library modules.

## Bug 15: Topbar strip buttons disappearing
**Symptom:** Tools (Tasks, Workflows, etc.) not visible in topbar.
**Cause:** `init()` and `rpOpen2()` had `strip.style.display='none'` when right panel opened.
**Fix:** Removed the hiding code. Strip always visible.
**Lesson:** Don't hide navigation elements that the user expects to always see.
