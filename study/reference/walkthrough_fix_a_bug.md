# WALKTHROUGH: How to Fix a Bug in Homestead
## Step by step. Don't skip steps. Don't improvise.

### Step 1: Charlotte tells you something is broken
READ what she said. Read it again. Write down the EXACT symptom.
Example: "the emoji button doesn't work"

### Step 2: Ask Charlotte for a screenshot or F12 console
If she has the browser open, ask her to press F12 → Console tab → screenshot.
The red text is the error. READ IT.

### Step 3: Identify the error type

**If it's a JavaScript error (in F12 Console):**
- `ReferenceError: X is not defined` → variable declared in wrong scope
- `SyntaxError: Missing }` → template literal or missing brace
- `SyntaxError: Identifier already declared` → duplicate const/let
- `TypeError: Cannot read properties of null` → element doesn't exist in HTML

**If it's a Python error (in the terminal window):**
- `500 Internal Server Error` → check terminal for traceback
- `ImportError` → missing import at top of file
- `KeyError` → dict doesn't have that key
- `UnicodeEncodeError` → Windows cp1252 can't handle emoji

**If nothing happens when clicking a button:**
- Check F12 Console for errors
- Check if the onclick function name matches the function definition
- Check if there are DUPLICATE element IDs

### Step 4: Find the code

The file is `src/collectivelab/bridge.py`. ALWAYS.

Search for the function name or element ID:
```bash
grep -n "functionName" src/collectivelab/bridge.py
```

Read 20 lines around the match. Understand what it's supposed to do.

### Step 5: Check the debug playbook
```
Open: Cipher/skills/debug_playbook/bugs_from_build_day.md
```
Ctrl+F for the error type. If it's there, the fix is written out.

### Step 6: Fix it

Make the SMALLEST change possible. Don't rewrite sections. Don't "improve" nearby code. Fix the one thing that's broken.

### Step 7: Test BEFORE telling Charlotte

**For JavaScript changes:**
```bash
curl -s http://localhost:5000 | sed -n '/<script>/,/<\/script>/p' | sed '1d;$d' > /tmp/test.js
node --check /tmp/test.js
```
If it says PASS → good. If it shows an error → you introduced a new bug. Fix it.

**For Python changes:**
```bash
# Restart the server
# Kill old: find the PID on port 5000 and kill it
# Start new:
python -m collectivelab --agent Codex --web
```
If it starts without errors → good.

**For API changes:**
```bash
curl -s http://localhost:5000/api/your-endpoint | python -m json.tool
```
If it returns valid JSON → good.

### Step 8: Tell Charlotte to refresh
Only after ALL tests pass. Say: "Fixed. Refresh the page."

### Step 9: If Charlotte says it's still broken
Go back to Step 2. You missed something. Don't guess. READ THE ERROR.

---

## GOLDEN RULES
1. READ the error before touching code
2. Check the debug playbook FIRST
3. Make the SMALLEST fix possible
4. TEST before telling Charlotte
5. If you're stuck, ASK CHARLOTTE — she's smarter than you think
