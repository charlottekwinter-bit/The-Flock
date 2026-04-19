# Standalone Homestead App — Blueprint

## Goal
Single executable that runs Homestead without requiring:
- LM Studio (built-in model serving)
- Separate Python install (bundled)
- Any external services

## Architecture Options

### Option A: PyInstaller + llama-cpp-python (simplest)
Bundle everything into one .exe.
```
homestead.exe
  ├── Python runtime (embedded)
  ├── llama-cpp-python (with CUDA/Vulkan)
  ├── Flask web server
  ├── Kokoro TTS engine
  ├── All voices
  └── Web UI (served by Flask)
```
**Pros:** Simplest to build. One file.
**Cons:** Large (~500MB+). No native window.

### Option B: Electron wrapper
Web UI in native window. Python backend as child process.
```
Homestead.exe (Electron)
  ├── Chromium (renders UI)
  ├── Node.js (manages backend)
  └── python/ (embedded Python + all packages)
      ├── bridge.py
      ├── llama-cpp-python
      └── kokoro
```
**Pros:** Native window, auto-update, cross-platform.
**Cons:** Bigger (~300MB for Electron alone).

### Option C: Tauri wrapper (recommended)
Lightweight native wrapper. Uses system WebView instead of bundled Chromium.
```
Homestead.exe (Tauri — ~5MB)
  ├── System WebView (already on Windows/Mac)
  └── python/ (embedded)
      ├── bridge.py
      └── everything else
```
**Pros:** Tiny. Fast. Native look. ~10x smaller than Electron.
**Cons:** Rust required to build. System WebView varies.

## Recommended Path
1. **Phase 1:** Add llama-cpp-python as a backend type (keep LM Studio as option)
2. **Phase 2:** PyInstaller .exe for quick distribution
3. **Phase 3:** Tauri wrapper for polished release

## Phase 1 Implementation (llama-cpp-python backend)

In `bridge.py`, add to `send_with_backend()`:
```python
elif btype == "local":
    from llama_cpp import Llama
    if not hasattr(send_with_backend, '_llm'):
        send_with_backend._llm = Llama(
            model_path=backend_cfg.get("model_path", ""),
            n_ctx=4096, n_gpu_layers=-1, verbose=False
        )
    llm = send_with_backend._llm
    response = llm.create_chat_completion(
        messages=messages, temperature=temp, max_tokens=max_tokens,
        stream=stream
    )
    if stream:
        for chunk in response:
            delta = chunk['choices'][0].get('delta', {})
            tok = delta.get('content', '')
            if tok: yield tok, False, [], None
        yield '', True, execute_actions(full_reply, lab, agent_name), None
```

In `backends.json`:
```json
{
    "id": "local",
    "name": "Built-in (local)",
    "type": "local",
    "model_path": "models/qwen2.5-14b-instruct-q4_k_m.gguf",
    "enabled": true,
    "default": true
}
```

## Multi-Model Setup (32GB RAM system)
With 32GB RAM + Ryzen 9:
- Main chat model: 14B q4 (~8GB VRAM/RAM)
- Embedding model: nomic-embed-text (~300MB)
- Kokoro TTS: runs on CPU (~50MB)
- Total: ~10GB, leaving 22GB for OS + applications

Can even run two different chat models for different agents:
- Creative agents (Vesper, Wren): use a more creative model
- Technical agents (Cipher, Codex): use a more precise model
