"""
Code Pattern: Adding a new Flask API endpoint to bridge.py

Location: Find the Flask routes section (~line 8000+ in bridge.py)
Add new routes near similar ones.
"""

# === GET endpoint (read data) ===
# @app.route("/api/yourfeature")
# def api_yourfeature():
#     data = load_your_data()  # Read from JSON file
#     return jsonify(data)

# === POST endpoint (create/send data) ===
# @app.route("/api/yourfeature", methods=["POST"])
# def api_yourfeature_create():
#     d = request.get_json()
#     name = d.get("name", "")
#     text = d.get("text", "").strip()
#     if not text: return jsonify({"error": "text required"}), 400
#     # ... save data ...
#     return jsonify({"ok": True})

# === PUT endpoint (update existing) ===
# @app.route("/api/yourfeature/<item_id>", methods=["PUT"])
# def api_yourfeature_update(item_id):
#     d = request.get_json()
#     items = load_items()
#     for i, item in enumerate(items):
#         if item["id"] == item_id:
#             items[i].update(d)
#             save_items(items)
#             return jsonify({"ok": True, "item": items[i]})
#     return jsonify({"error": "not found"}), 404

# === DELETE endpoint ===
# @app.route("/api/yourfeature/<item_id>", methods=["DELETE"])
# def api_yourfeature_delete(item_id):
#     items = [i for i in load_items() if i["id"] != item_id]
#     save_items(items)
#     return jsonify({"ok": True})

# === SSE stream endpoint (real-time updates) ===
# @app.route("/api/yourfeature/events")
# def api_yourfeature_events():
#     def _stream():
#         seen = 0
#         try:
#             while True:
#                 current = your_event_queue[seen:]
#                 seen = len(your_event_queue)
#                 for msg in current:
#                     yield f"data: {json.dumps(msg)}\n\n"
#                 time.sleep(1)
#         except GeneratorExit: pass
#     return Response(stream_with_context(_stream()),
#                     mimetype="text/event-stream",
#                     headers={"Cache-Control":"no-cache","X-Accel-Buffering":"no"})

# === JSON file storage helpers ===
# def load_data():
#     path = ROOT / "yourdata.json"
#     if path.exists():
#         try: return json.loads(path.read_text("utf-8"))
#         except: pass
#     return {"items": []}
#
# def save_data(data):
#     (ROOT / "yourdata.json").write_text(
#         json.dumps(data, indent=2, ensure_ascii=False), "utf-8")
