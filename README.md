# Instant Data Storyteller

This is a complete frontend prototype for the Instant Data Storyteller application.

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn

## Getting Started

1.  **Unzip the project** to your desired location.
2.  **Open a terminal** in the project directory.
3.  **Install dependencies**:
    ```bash
    npm install
    ```
4.  **Start the development server**:
    ```bash
    npm run dev:client
    ```
5.  **Open your browser** and navigate to:
    `http://localhost:5000`

## Project Structure

- `client/src/pages`: Main application pages (Landing, Dashboard, Report View).
- `client/src/components`: Reusable UI components.
- `client/src/lib/mock-data.ts`: Mock data and simulation logic.
- `client/src/context`: Authentication state management.

## Features

- **Authentication**: Login with demo users (`gauri`, `kritika`, `user1`).
- **Wizard**: Upload CSV and select Intent Mode.
- **Report View**: Interactive dashboard with charts and dynamic insights.
- **Modes**: Switch between Student, Business, and Research intents.

## Tech Stack

- React + Vite
- TailwindCSS
- Recharts
- Framer Motion
- Wouter (Routing)
