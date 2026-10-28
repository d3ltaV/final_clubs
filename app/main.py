import os
from flask import Flask, request, jsonify, send_from_directory, abort
from dotenv import load_dotenv

load_dotenv()
from utils.workjobs import get_workjobs
from utils.classes import CLASSES
from utils.cocurriculars import COCURRICULARS
from utils.clubs import get_clubs


APP_DIR = os.path.dirname(os.path.abspath(__file__))
REPO_ROOT = os.path.dirname(APP_DIR)
DIST_DIR = os.path.join(REPO_ROOT, "frontend", "dist")
DIST_ASSETS = os.path.join(DIST_DIR, "assets")


app = Flask(
    __name__,
    static_folder="static",
    static_url_path="/static",
)


@app.route("/api/config")
def api_config():
    return jsonify({"mapsApiKey": os.getenv("API")})


@app.route("/api/workjobs/<location>")
def api_workjobs(location):
    loc = location.lower().strip()
    for key, jobs in get_workjobs().items():
        if key.lower().strip() == loc:
            return jsonify([job.to_dict() for job in jobs])
    return jsonify({"error": "No workjobs found"}), 404


@app.route("/api/search")
def api_search():
    query = request.args.get("q", "").lower().strip()
    search_type = request.args.get("s", "").lower().strip()

    if search_type == "workjobs":
        all_jobs = [j.to_dict() for jobs in get_workjobs().values() for j in jobs]
        if not query:
            return jsonify(all_jobs)
        return jsonify([
            j for j in all_jobs
            if query in f"{j.get('name', '')} {j.get('location', '')} {j.get('description', '')}".lower()
        ])

    if search_type == "classes":
        rows = [c.to_dict() for c in CLASSES]
        if not query:
            return jsonify(rows)
        keys = ("name", "code", "dpt", "credit", "prereq", "desc")
        return jsonify([
            r for r in rows
            if query in " ".join(str(r.get(k) or "") for k in keys).lower()
        ])

    if search_type == "clubs":
        rows = [c.to_dict() for c in get_clubs()]
        if not query:
            return jsonify(rows)
        return jsonify([
            r for r in rows
            if query in " ".join([
                str(r.get("Name of Club", "")),
                str(r.get("Type of Club", "")),
                str(r.get("Description of Club", "")),
                str(r.get("Club Meeting Time and Location", "")),
                str(r.get("Student Leaders (and contact info)", "")),
            ]).lower()
        ])

    if search_type == "cocurriculars":
        rows = [c.to_dict() for c in COCURRICULARS]
        if not query:
            return jsonify(rows)
        return jsonify([
            r for r in rows
            if query in " ".join([
                str(r.get("name", "")),
                str(r.get("category", "")),
                str(r.get("season", "")),
                str(r.get("prerequisites", "")),
                str(r.get("location", "")),
                str(r.get("schedule", "")),
            ]).lower()
        ])

    return jsonify({"error": "unknown search type"}), 400


@app.route("/assets/<path:filename>")
def spa_assets(filename):
    if not os.path.isdir(DIST_ASSETS):
        abort(500, "frontend/dist/ is missing")
    return send_from_directory(DIST_ASSETS, filename)


@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def spa(path):
    if not os.path.isdir(DIST_DIR):
        return ("React bundle not built.", 500)
    if path:
        candidate = os.path.join(DIST_DIR, path)
        if os.path.isfile(candidate):
            return send_from_directory(DIST_DIR, path)
    return send_from_directory(DIST_DIR, "index.html")


if __name__ == "__main__":
    app.run(debug=True, port=int(os.getenv("PORT", "3000")))
