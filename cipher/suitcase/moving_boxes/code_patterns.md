# Code Patterns — Templates for Common Changes

## Add a new API endpoint
```python
# In bridge.py, inside run_web() function, after existing routes:
@app.route("/api/myfeature")
def api_myfeature():
    return jsonify({"data": "value"})

@app.route("/api/myfeature", methods=["POST"])
def api_myfeature_save():
    d = request.get_json()
    # process d
    return jsonify({"ok": True})
```

## Add a new right panel tab
1. HTML tab button (find `id="rptabs"`):
```html
<div class="rptab" id="tab-mytab" onclick="rpSwitch('mytab')">Icon Label</div>
```
2. HTML view panel (add before `<!-- Integrations tab -->`):
```html
<div class="rpview" id="rpview-mytab">
  <!-- content here -->
</div>
```
3. JS load hook in rpSwitch():
```javascript
if(tab==='mytab') myTabLoad();
```

## Add a new action tag
1. In execute_actions() (~line 510):
```python
elif cmd=="MY_TAG": res = _act_my_tag(args, agent_name=agent_name)
```
2. Define the function:
```python
def _act_my_tag(args, agent_name="Agent"):
    try:
        # do something
        return f"ok MY_TAG: done"
    except Exception as e: return f"x MY_TAG: {e}"
```

## Add a new setting to voice config
1. HTML input in voice settings panel
2. Read in `voiceCfgChange()`: `voiceCfg.myfield=document.getElementById('vp-myfield').value;`
3. Set in `loadVoiceConfig()`: `document.getElementById('vp-myfield').value=voiceCfg.myfield||'default';`

## Add a new companion editor tab
1. Add tab button: `<div class="comp-tab" onclick="compTab('mytab',this)">My Tab</div>`
2. Add pane: `<div class="comp-pane" id="cp-mytab">...</div>`
3. Load data in `editCompanion()`, save in `saveCompanion()`

## Create a persistent JSON storage
```python
MY_PATH = ROOT / "mydata.json"
def _load_mydata():
    if MY_PATH.exists():
        try: return json.loads(MY_PATH.read_text("utf-8"))
        except: pass
    return {"default": "value"}
def _save_mydata(d):
    MY_PATH.write_text(json.dumps(d, indent=2, ensure_ascii=False), "utf-8")
```

## SSE (Server-Sent Events) stream pattern
```python
@app.route("/api/mystream/events")
def api_mystream_events():
    def _stream():
        seen = 0
        try:
            while True:
                chunk = my_event_list[seen:]
                seen += len(chunk)
                for item in chunk:
                    yield f"data: {json.dumps(item)}\n\n"
                time.sleep(1)
        except GeneratorExit: pass
    return Response(stream_with_context(_stream()),
                    mimetype="text/event-stream",
                    headers={"Cache-Control":"no-cache","X-Accel-Buffering":"no"})
```

## Frontend SSE consumption
```javascript
const es = new EventSource('/api/mystream/events');
es.onmessage = e => {
    try { const d = JSON.parse(e.data); /* handle d */ } catch {}
};
es.onerror = () => setTimeout(startMyStream, 10000);
```

## TTS queue pattern (sentence-by-sentence Kokoro)
See createTTSQueue() in bridge.py JS section.
Key: enqueue sentences during stream, start() when ready to play, await promise for completion.

## Dual-model backend (future: local GGUF + LM Studio)
backends.json supports any OpenAI-compatible endpoint.
Add type:"local" with llama-cpp-python server on a different port.
Each agent could be assigned a preferred backend via companions.json field.
```
