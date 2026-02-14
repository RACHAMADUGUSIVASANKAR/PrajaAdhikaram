# Design

## Architecture
- Frontend: Next.js 14 app router with React components and Tailwind CSS styling.
- Backend: FastAPI service exposing scheme and eligibility endpoints.
- Data: Local scheme data file used by the app and API.

## Frontend Design
- Pages: Home, Schemes, Eligibility.
- Components: Hero, Navbar, Footer, SchemeCard, Chatbot, and supporting sections.
- Visuals: Motion effects (GSAP/Framer Motion) and decorative background elements.
- Responsiveness: Layout adapts to common desktop and mobile breakpoints.

## Backend Design
- FastAPI app serving JSON APIs.
- Pydantic models for request and response validation.
- Simple rule-based eligibility scoring for clarity and explainability.

## Data Design
- schemes.js holds scheme metadata used for listing and detail views.
- Eligibility inputs include user demographics and socioeconomic fields.

## API Design
- GET /: health check.
- GET /schemes: list of scheme records.
- POST /check-eligibility: returns eligibility result and confidence score.
- POST /chat: returns guidance response.

## Error Handling
- Validate inputs with Pydantic and return 4xx for invalid payloads.
- Return 5xx only for unexpected server failures.

## Security and Privacy
- No user accounts or persistent storage by default.
- Keep payloads minimal and avoid sensitive data collection.

## Deployment Notes
- Frontend and backend can run independently during development.
- Configure API base URL via environment variables when needed.
