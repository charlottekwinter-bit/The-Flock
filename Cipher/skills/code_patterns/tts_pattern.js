/*
Code Pattern: TTS Integration

The TTS system has 3 layers:
1. speak(text, agentName) — fire-and-forget, auto-detects engine
2. speakAndWait(text, agentName) — returns Promise, resolves when done
3. createTTSQueue(agentName) — sentence-level streaming queue

For Kokoro:
- Server generates WAV: POST /api/voice/speak {text, agent}
- Returns audio/wav blob
- Play via new Audio(URL.createObjectURL(blob))

For Browser TTS:
- Uses window.speechSynthesis
- SpeechSynthesisUtterance with per-companion voice settings

Voice config stored in voice_config.json:
{
  engine: "kokoro" | "browser" | "piper",
  read_responses: true,
  companion_voices: {
    "AgentName": {
      voice_id: "Microsoft David",    // browser voice
      kokoro_voice: "am_fenrir",       // kokoro voice
      rate: 1.0,
      pitch: 1.0,
      volume: 1.0
    }
  }
}

Key flags:
- _ttsSpeaking: true when audio is playing (blocks wake word)
- _recState: 'idle'|'passive'|'active' (voice recognition state)
- Safety timeout: 30s auto-reset on _ttsSpeaking

Sentence queue pattern:
1. As agent streams tokens, detect sentence boundaries (.!?:)
2. Send each sentence to Kokoro immediately
3. Queue audio blobs
4. Play back-to-back when started

Adding a new TTS engine:
1. Add option to voice settings dropdown
2. Add elif branch in speak() function
3. Add server endpoint if needed
4. Add to companion editor voice tab
*/
