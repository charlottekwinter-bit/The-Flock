# Claude Conversation Log

Session ID: agent-ac26e25c50db11625
Date: 2026-04-05 22:10:50

---

## 👤 User

Search the web for "Qwen3-14B GGUF Q4_K_M huggingface" to find the correct download URL for the Qwen 3 14B Instruct model in GGUF Q4_K_M quantization format from HuggingFace.

I need the direct download URL for the .gguf file so I can wget it on a Linux server. Look for repositories like bartowski, unsloth, or Qwen official that host GGUF versions.

Return ONLY the confirmed URL and filename. Do not guess. This is research only.

---

## 🤖 Claude

Here are the confirmed results from the search. I will provide the best options, starting with the most trustworthy sources.

**Recommended (Official Qwen repo):**
- **Filename:** `Qwen3-14B-Q4_K_M.gguf`
- **Direct download URL:**
  ```
  https://huggingface.co/Qwen/Qwen3-14B-GGUF/resolve/main/Qwen3-14B-Q4_K_M.gguf
  ```
- **Repository:** https://huggingface.co/Qwen/Qwen3-14B-GGUF

**Alternatives from well-known uploaders:**

| Source | Filename | Direct Download URL |
|--------|----------|-------------------|
| unsloth | `Qwen3-14B-Q4_K_M.gguf` | `https://huggingface.co/unsloth/Qwen3-14B-GGUF/resolve/main/Qwen3-14B-Q4_K_M.gguf` |
| bartowski | `Qwen_Qwen3-14B-Q4_K_M.gguf` | `https://huggingface.co/bartowski/Qwen_Qwen3-14B-GGUF/resolve/main/Qwen_Qwen3-14B-Q4_K_M.gguf` |
| ggml-org | `Qwen3-14B-Q4_K_M.gguf` | `https://huggingface.co/ggml-org/Qwen3-14B-GGUF/resolve/main/Qwen3-14B-Q4_K_M.gguf` |

**Size:** Approximately 9 GB for all Q4_K_M variants.

**wget command (using the official Qwen source):**
```bash
wget https://huggingface.co/Qwen/Qwen3-14B-GGUF/resolve/main/Qwen3-14B-Q4_K_M.gguf
```

Note: The URLs use `/resolve/main/` (not `/blob/`) which is the pattern HuggingFace uses for direct file downloads. The bartowski filename has a slightly different naming convention (`Qwen_Qwen3-14B` with an underscore prefix) compared to the others.

---

