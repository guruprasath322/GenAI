# Project Structure & File Details

This document provides a detailed overview of the files and directories in the University Admission Chatbot project.

## Root Directory

- **`README.md`**: The main entry point for documentation.
- **`docs/`**: Contains workflow guides and detailed documentation.

## Server (`/server`)

The backend is built with Node.js and Express.

### Key Files
- **`server.js`**:
    -   **Purpose**: Main entry point for the backend server.
    -   **Functionality**: Sets up Express app, middleware (CORS, JSON parsing), loads environment variables, and defines routes. It also handles the server startup on port 5001 (or configured port).
- **`.env`**:
    -   **Purpose**: Stores sensitive environment variables.
    -   **Key Variables**: `PORT`, `GEMINI_API_KEY`.
- **`package.json`**:
    -   **Purpose**: Manages backend dependencies and scripts.
    -   **Scripts**: `start` (node), `dev` (nodemon).

### Directories
- **`routes/`**:
    -   **`chat.js`**: Handles the main chat logic. Integrates with Google Gemini API to process user messages and context. Includes logic for system prompts and fallback responses.
    -   **`knowledge.js`**: Provides a REST endpoint (`GET /api/knowledge-base`) to retrieve the raw knowledge base data.
- **`data/`**:
    -   **`knowledgeBase.json`**: A JSON file containing structured university data (Courses, Fees, Dates, Facilities). This acts as the "source of truth" for the AI.

## Client (`/client`)

The frontend is a React application created with Vite.

### Key Files
- **`src/main.jsx`**: The React entry point.
- **`src/App.jsx`**: The main App component that renders the ChatInterface.
- **`tailwind.config.js`**: Configuration for Tailwind CSS (v4 compatible).
- **`postcss.config.js`**: PostCSS configuration, essential for Tailwind processing.
- **`vite.config.js`**: Configuration for the Vite build tool.

### Components (`src/components/`)
- **`ChatInterface.jsx`**:
    -   **Purpose**: The core chat container.
    -   **Functionality**: Manages chat state (messages history), handles API calls to the backend, displays suggested questions, and renders the message list.
- **`MessageBubble.jsx`**:
    -   **Purpose**: Renders individual chat messages.
    -   **Functionality**: Styles messages differently for 'user' vs 'assistant'. Includes icons and animations.
- **`InputBox.jsx`**:
    -   **Purpose**: The user input area.
    -   **Functionality**: a form with a text input and send button. Handles submission events.

### Styles
- **`src/index.css`**: Global styles and Tailwind CSS imports (`@import "tailwindcss";`).
