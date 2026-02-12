# Setup & Installation Workflow

This workflow guides you through setting up the project from scratch.

## 1. Prerequisites
Ensure you have the following installed:
- **Node.js**: Version 16 or higher (`node -v`)
- **npm**: Node Package Manager (`npm -v`)
- **Code Editor**: VS Code (recommended)

## 2. API Key Configuration
To enable AI features, you need a Google Gemini API Key.
1.  Visit [Google AI Studio](https://aistudio.google.com/).
2.  Create an API Key.
3.  You will add this to the backend configuration in step 4.

## 3. Clone and Install
(Assuming you have the project files)

### Backend Setup
1.  Open your terminal.
2.  Navigate to the `server` directory:
    ```bash
    cd server
    ```
3.  Install dependencies:
    ```bash
    npm install
    ```
    *This installs `express`, `cors`, `dotenv`, and `@google/generative-ai`.*

### Frontend Setup
1.  Open a new terminal tab.
2.  Navigate to the `client` directory:
    ```bash
    cd client
    ```
3.  Install dependencies:
    ```bash
    npm install
    ```
    *This installs `react`, `vite`, `tailwindcss`, `axios`, `framer-motion`, etc.*

## 4. Environment Variables
1.  In the `server` directory, create a file named `.env`.
2.  Add the following content:
    ```
    PORT=5001
    GEMINI_API_KEY=your_actual_api_key_here
    ```
    *Replace `your_actual_api_key_here` with they key you got in step 2.*

## 5. Running the Application
1.  **Start Backend**: Inside `server/` run `npm run dev`.
    -   You should see: `Server is running on port 5001`
2.  **Start Frontend**: Inside `client/` run `npm run dev`.
    -   You should see a local URL (e.g., `http://localhost:5173`).
3.  Open the frontend URL in your browser.
