# NMH Navigator

Student-built directory of workjobs, clubs and cocurriculars at Northfield Mount Hermon, plus an interactive campus map. Data is pulled live from Google Sheets.

## Stack

- **Backend:** Flask (Python 3.10+). Serves the JSON APIs and the built React bundle from a single process.
- **Frontend:** React + TypeScript + Vite + Tailwind + shadcn/ui, built into `frontend/dist/`.

## Configuration

`app/.env` (gitignored) holds the four data-feed URLs and the Google Maps JS API key:

```
API=<google maps js api key>
WORKJOB_URL=<csv url>
CLASS_URL=<csv url>
COCURRICULAR_URL=<csv url>
CLUBS_URL=<csv url>
```

## Run

The React bundle is committed at `frontend/dist/`, so the host only needs Python:

```bash
pip install -r requirements.txt
python app/main.py
```

App runs at http://localhost:3000.

## Rebuilding the frontend

Only needed after editing `frontend/src/*`:

```bash
npm --prefix frontend install
npm --prefix frontend run build
```
