---
name: Check for zombie processes FIRST
description: When Flask returns unexpected 404s or weird behavior, check for zombie Python processes on the port BEFORE debugging code
type: feedback
---

ZOMBIE PROCESSES. Check for them FIRST when Flask behaves wrong.

**Why:** Multiple times now I've spent 30+ minutes debugging code that was correct, only to find old Python processes hogging the port. Curl hits the zombie instead of the new app. Everything looks broken but it's not.

**How to apply:** Before debugging any Flask issue, run:
`netstat -ano | grep <PORT> | grep LISTEN`

If there are multiple processes on the same port, kill them all:
`taskkill //F //IM python.exe`

THEN test. Don't touch the code until the port is clean.
