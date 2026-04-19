# WALKTHROUGH: Using Mouse & Keyboard Control
## This is how you do REAL work. Learn this.

### Step 1: Enable Mouse Access
In Homestead UI → Click "Mouse" in the topbar tools → Click "Grant AI Mouse Access"
A red overlay will appear: "AI Mouse Active — Press ESC to stop"

### Step 2: Take a Screenshot First
```
[SCREENSHOT:]
```
This saves a screenshot so you can SEE the screen. Look at it. Understand what's where.

### Step 3: Move to Where You Need
```
[MOVE_MOUSE: 500, 300]
```
Coordinates are pixels from top-left corner. X goes right, Y goes down.
Full HD screen = 1920 wide × 1080 tall.

### Step 4: Click
```
[CLICK: 500, 300]
```
Left click at those coordinates.

### Step 5: Type
```
[TYPE: Hello this is text I'm typing]
```
Types at the current cursor position. Make sure you clicked into a text field first.

### Step 6: Keyboard Shortcuts
```
[HOTKEY: ctrl+a]        ← Select all
[HOTKEY: ctrl+c]        ← Copy
[HOTKEY: ctrl+v]        ← Paste
[HOTKEY: ctrl+s]        ← Save
[HOTKEY: ctrl+z]        ← Undo
[HOTKEY: alt+tab]       ← Switch window
[HOTKEY: ctrl+shift+i]  ← Open DevTools
```

### Step 7: Scroll
```
[SCROLL: down, 3]       ← Scroll down 3 ticks
[SCROLL: up, 5]         ← Scroll up 5 ticks
```

### Step 8: Drag
```
[DRAG: 100, 200, 500, 200]   ← Drag from (100,200) to (500,200)
```

---

## WORKFLOW: Write Code in an Editor

1. [SCREENSHOT:] — see what's on screen
2. [HOTKEY: alt+tab] — switch to code editor (if not already focused)
3. [HOTKEY: ctrl+a] — select all existing code
4. [TYPE: your new code here] — replace with new code
5. [HOTKEY: ctrl+s] — save the file
6. [SCREENSHOT:] — verify it looks right

## WORKFLOW: Browse the Web

1. [HOTKEY: ctrl+l] — focus the URL bar
2. [TYPE: https://example.com] — type the URL
3. [HOTKEY: enter] — go to the page
4. [SCREENSHOT:] — see what loaded
5. [CLICK: x, y] — click on what you need

## WORKFLOW: Use the Terminal

1. Open terminal: [HOTKEY: ctrl+alt+t] (Linux) or find terminal app
2. [TYPE: your command here]
3. [HOTKEY: enter] — run it
4. [SCREENSHOT:] — see the output

---

## SAFETY RULES
- ESC key IMMEDIATELY revokes mouse access
- The red overlay tells Charlotte that AI is in control
- WiFi toggle is PROTECTED — you cannot turn internet on/off via mouse
- All actions are LOGGED in the action log (visible in UI)
- Charlotte can see everything you do

## COMMON MISTAKES
- Clicking wrong coordinates → ALWAYS screenshot first
- Typing into wrong field → ALWAYS click the field first
- Forgetting to save → ALWAYS Ctrl+S after typing
- Moving too fast → pause between actions, let the screen update

## PRACTICE
Try this sequence to test:
1. [SCREENSHOT:]
2. [MOVE_MOUSE: 960, 540] — center of screen
3. [CLICK: 960, 540]
4. [SCREENSHOT:] — verify cursor moved
If that works, you're ready for real work.
