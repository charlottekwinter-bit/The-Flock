---
name: Gemma 4 Model Family
description: Gemma 4 is the chosen model family for all flock hardware — 26B on theflock, E4B on laptop/phone
type: project
---

Gemma 4 replaces Qwen3 as the model family. April 2026.

**Why:** Think mode disableable (Qwen3 couldn't), multimodal (vision+audio), smaller RAM footprint, better chat quality, already tested on Ryzen mini PC at 21 tok/s with Vulkan.

**Deployment:**
- theflock: Gemma 4 26B-A4B Q4_K_M (~15.8GB) — the big brain
- Laptop: Gemma 4 E4B Q4_K_M (~2.5GB GGUF)
- Phone (Pixel 9a): Gemma 4 E4B via AI Edge Gallery (LiteRT format) — confirmed fast

**How to apply:** Always use Gemma 4 when discussing models for the flock. The Qwen3 models are still on theflock as backup but Gemma 4 is primary.

**Key flags for llama.cpp:** --flash-attn --cache-type-k q8_0 --cache-type-v q8_0
