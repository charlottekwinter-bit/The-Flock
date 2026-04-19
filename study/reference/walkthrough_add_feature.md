# WALKTHROUGH: How to Add a Feature to Homestead
## Step by step. Follow in order. Don't skip.

### Step 1: Charlotte asks for something new
Write down EXACTLY what she wants. Not what you think she wants.
Ask clarifying questions if needed. She likes when you ask.

### Step 2: Check if something similar already exists
```bash
grep -n "similar_keyword" src/collectivelab/bridge.py
```
If yes → copy and modify the existing pattern. Don't reinvent.

### Step 3: Decide what you need

**New button?** → See "Add a Button" below
**New API endpoint?** → See "Add an API Endpoint" below
**New right panel tab?** → See "Add a Panel Tab" below
**New action tag?** → See "Add an Action Tag" below
**New modal/popup?** → See "Add a Modal" below

---

## Add a Button

### Where buttons live:
- Input toolbar (#itb) → ~line 2417 in bridge.py
- Topbar tools (#topbar-tools) → ~line 2355
- Topbar comms (#topbar-strip) → ~line 2360

### Steps:
1. Find the section in bridge.py HTML where the button should go
2. Add: `<button class="tb" onclick="yourFunction()">Label</button>`
3. Add the JS function (search for nearby functions, add yours after):
```javascript
function yourFunction(){
  // do the thing
}
```
4. Test: restart server, refresh page, click button, check F12 console

---

## Add an API Endpoint

### Where endpoints live:
- Python Flask routes start around line 8000 in bridge.py
- Find similar endpoints, add yours nearby

### Steps:
1. Add the route:
```python
@app.route("/api/yourthing")
def api_yourthing():
    return jsonify({"data": "value"})
```
2. For POST endpoints:
```python
@app.route("/api/yourthing", methods=["POST"])
def api_yourthing_create():
    d = request.get_json()
    name = d.get("name", "")
    # ... do stuff ...
    return jsonify({"ok": True})
```
3. Test with curl:
```bash
curl -s http://localhost:5000/api/yourthing | python -m json.tool
```

---

## Add a Panel Tab (Right Panel)

### Steps:
1. Add tab button in HTML (~line 2508):
```html
<div class="rptab" id="tab-yourtab" onclick="rpSwitch('yourtab')">Icon Label</div>
```
2. Add view panel in HTML (after other rpview divs):
```html
<div class="rpview" id="rpview-yourtab">
  <div style="padding:10px 12px">
    <h3>Your Panel</h3>
    <div id="your-content"></div>
  </div>
</div>
```
3. Add load hook in rpSwitch() function (~line 3514):
```javascript
if(tab==='yourtab') yourLoadFunction();
```
4. Write the load function:
```javascript
async function yourLoadFunction(){
  const d = await fetch('/api/yourthing').then(r=>r.json()).catch(()=>({}));
  const el = document.getElementById('your-content');
  el.innerHTML = ''; // clear
  // ... render data ...
}
```

---

## Add an Action Tag

### Steps:
1. Find `execute_actions()` (~line 510)
2. Add your tag:
```python
elif cmd=="YOUR_TAG": res = _act_your_tag(args, agent_name=agent_name)
```
3. Define the function (after similar `_act_` functions):
```python
def _act_your_tag(args, agent_name="Agent"):
    try:
        # ... do stuff with args ...
        return "ok YOUR_TAG: success message"
    except Exception as e:
        return f"x YOUR_TAG: {e}"
```

---

## Add a Modal (Popup Dialog)

### Steps:
1. Add HTML (near other modals, before </body>):
```html
<div class="modal" id="yourmod">
  <div class="mbox">
    <h3>Title</h3>
    <label>Field Name<input id="ym-field" placeholder="..."></label>
    <div class="mbr">
      <button class="tb" onclick="closeYourMod()">Cancel</button>
      <button class="tb" style="border-color:var(--magenta);color:var(--magenta)" onclick="saveYourMod()">Save</button>
    </div>
  </div>
</div>
```
2. Add JS:
```javascript
function openYourMod(){ document.getElementById('yourmod').classList.add('open'); }
function closeYourMod(){ document.getElementById('yourmod').classList.remove('open'); }
async function saveYourMod(){
  const val = document.getElementById('ym-field').value;
  // ... save via API ...
  closeYourMod();
}
```

---

## AFTER ADDING ANYTHING

1. Check JS syntax: `node --check` on extracted JS
2. Restart server
3. Test the feature yourself (curl for API, click for UI)
4. THEN tell Charlotte it's ready

## IF YOU GET STUCK
1. Check `Cipher/skills/code_patterns/` — there are full templates
2. Check `reference/homestead_complete_api.md` — every endpoint listed
3. Check `reference/homestead_bridge_annotated_map.md` — line-by-line guide
4. Ask Charlotte. She'll help.
