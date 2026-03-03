# my-api-project

Express API with a React frontend. The API serves users and jobs (MongoDB/Mongoose); the client is a Vite + React app with a jobs landing page that calls the getJobs API.

## Summary of setup

### 1. API

- **CORS** is enabled in `index.js` so the React app can call the API from the browser.
- The **`cors`** package is in `package.json` and installed.

### 2. React app (`client/`)

- **Vite + React** live in the `client/` folder.
- A **proxy** is configured so that `fetch('/jobs')` in the app is sent to `http://localhost:3000/jobs` during development.

### 3. Jobs landing page

- The **JobsLanding** component fetches jobs on mount via `fetch('/jobs')`, shows loading and error states, and renders each job in a card (title, company, location, description, requirements, salary in £, posted date).
- Styling is done with **styled-components** (no separate CSS file for this page).

### 4. Scripts (root `package.json`)

- **`npm run dev:api`** — Run the API only (port 3000).
- **`npm run dev:client`** — Run the React app only (Vite, typically port 5173).
- **`npm run dev:all`** — Run both the API and the client at once (uses `concurrently`).

## Requirements

- **Node 20 LTS or Node 22** is required to run the React client (Vite 7 needs it). The API runs on Node 16+.
- If you see `crypto.getRandomValues is not a function`, you're on an older Node — upgrade with [nodejs.org](https://nodejs.org) or `nvm install 20` then `nvm use 20`.
- Check your version: `node -v`

## How to run

1. **Start the API:**  
   `npm run dev:api`  
   (or `npm run dev`)

2. **Start the client:**  
   In a second terminal: `npm run dev:client`.  
   Or run both from the project root: `npm run dev:all`.

3. Open the URL Vite prints (e.g. `http://localhost:5173`) to view the jobs landing page.

## Note

The API may still run on Node 16; the client (Vite) will not. Use Node 20+ for `npm run dev:all`.
