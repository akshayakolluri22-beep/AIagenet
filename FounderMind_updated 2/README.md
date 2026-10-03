# FounderMind UI Upgrade

This package adds a jury-ready dashboard UI inspired by the sample design.

## Included
- Dashboard overview
- Validate Idea page connected to your existing FastAPI endpoint
- New Ideas
- Market & Competition
- Government Funding Navigator
- Funding Planner
- 90-Day Action Plan
- Validation History using browser localStorage
- JSON report export
- Founder Guide
- Responsive dark SaaS UI

## Run
1. Keep FastAPI running:
   `python -m uvicorn main:app --reload --port 8000`
2. Open `index.html` with Live Server.
3. Use the Validate Idea page to test the API.

## Important
Government funding cards are intentionally phrased as "potentially relevant" and "verify eligibility". For a real deployment, connect the Funding Navigator to current official government data and show source/date information.
