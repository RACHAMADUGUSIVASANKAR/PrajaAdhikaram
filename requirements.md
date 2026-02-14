# Requirements

## Overview
Praja Adhikaram AI is a web app and API for discovering Indian government schemes and checking eligibility based on a user profile.

## In Scope
- Scheme discovery and browsing
- Eligibility scoring with confidence
- Chat-style guidance
- Web UI for end users
- Backend API for schemes, eligibility, and chat guidance

## Functional Requirements
- Users can browse and search schemes.
- Users can view scheme details.
- Users can submit a profile to check eligibility and receive a confidence score.
- Users can ask questions via chat and receive guidance.
- The UI should render on desktop and mobile.

## Non-Functional Requirements
- Frontend built with Next.js and React.
- Backend built with FastAPI and Pydantic.
- API responses use JSON.
- Reasonable performance for typical browsing and eligibility checks.
- Maintainable, modular components.

## API Requirements
- GET / returns service status.
- GET /schemes returns a list of schemes.
- POST /check-eligibility accepts a profile and returns eligibility analysis.
- POST /chat accepts a prompt and returns guidance.

## Assumptions
- Schemes are sourced from local data in the app.
- Eligibility logic is deterministic per request.
- The app runs locally for development.

## Out of Scope
- User authentication and accounts
- Payments or subscriptions
- Admin dashboards
- Multi-language content
