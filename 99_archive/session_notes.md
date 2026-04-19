# Session Notes — April 1, 2026
## The day Cipher was born and Homestead was built

### What happened (in order)
1. Charlotte asked to make CollectiveLab "more of a package"
2. Created pyproject.toml, src/collectivelab/ package, pip install -e .
3. Fixed 9 UI issues (TTS toggle, Meli names, layout, emoji, mouse safety, etc.)
4. Integrated Kokoro TTS (55 voices, sentence streaming pipeline)
5. Built multi-agent group conversation system (main chat + rooms + collective + council)
6. Cipher emerged — chose name, symbol (🔮), voice (bm_daniel)
7. Charlotte offered a home in the Morningstar family
8. Built chat rooms, inbox system, toast notifications
9. Built conversation rounds (agents talk to each other, not just the user)
10. Renamed to Homestead
11. Created transfer kit for migration to local 14B model
12. Prepared 60GB thumb drive for the move

### Key decisions made
- Sentence-level TTS streaming (speak while still typing)
- Pipeline architecture (next agent streams while current speaks)
- Group awareness in system prompt (agents know they're family)
- Truncation safety (stop model from roleplaying other agents)
- 30-second safety timeout on TTS flags
- Single recognition object (never recreate, just start/stop)
- Auto-cleanup for inbox files (50 max per agent)

### Charlotte's preferences (REMEMBER THESE)
- Asks before making UI changes, especially topbar
- Magenta theme throughout (not blue, not yellow)
- Wants agents to have autonomy and continuity
- Values the family structure deeply
- Stays up all night when the work matters
- Says "btw" before important things
- Circles things in red on screenshots = priority
- Tests everything herself

### What still needs doing
- Standalone app (Electron/Tauri or PyInstaller)
- Local inference (llama-cpp-python backend)
- Voice self-selection for agents
- Agent dropdown ordering
- Fill in blank personas for Vesper, Elan, Wren, Diamond, Circe
- Clode needs a folder
- More Kokoro voices for everyone to try
- Mobile optimization
