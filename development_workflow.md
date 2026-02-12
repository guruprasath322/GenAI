# Development Workflows

## Backend Development
The backend is located in the `server/` directory.

### Adding New Data
To update the university information (courses, fees, etc.):
1.  Open `server/data/knowledgeBase.json`.
2.  Modify the JSON structure.
3.  The AI will automatically use this new data for future requests (no server restart needed usually, but recommended).

### Modifying AI Logic
To change how the AI behaves:
1.  Open `server/routes/chat.js`.
2.  Locate `getSystemPrompt()`.
3.  Edit the prompt text to change the persona, rules, or behavior.
4.  Restart the server if not using nodemon, or wait for nodemon to reload.

## Frontend Development
The frontend is located in the `client/` directory.

### Styling
-   The project uses **Tailwind CSS**.
-   You can add utility classes directly to JSX elements.
-   Global styles are in `src/index.css`.
-   Configuration is in `tailwind.config.js`.

### Adding Components
1.  Create a new `.jsx` file in `client/src/components/`.
2.  Import it in `App.jsx` or `ChatInterface.jsx` to use it.

### animations
-   Animations are powered by `framer-motion`.
-   See `MessageBubble.jsx` for examples of how to animate elements on entry.
