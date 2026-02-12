# AI Integration Workflow

This project uses Google's Gemini API for generating intelligent responses.

## Architecture
1.  **User Input**: User types a message in the React frontend.
2.  **API Call**: Frontend sends POST request to `/api/chat` with `message` and `history`.
3.  **Context Construction**:
    -   Backend reads `knowledgeBase.json`.
    -   Constructs a **System Prompt** that includes the knowledge base data and strict instructions.
4.  **Google Gemini API**:
    -   The system prompt and chat history are sent to Gemini (`gemini-flash-latest`).
    -   Gemini processes the query within the context of the provided university data.
5.  **Response**: The generated text is sent back to the frontend.

## Configuration
The integration logic is contained in `server/routes/chat.js`.

### Key Dependency
-   `@google/generative-ai`: Official Node.js SDK for Gemini.

### Model Selection
We use `gemini-flash-latest` for low latency. You can switch models in `server/routes/chat.js`:

```javascript
model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
```

### Error Handling
If the API key is missing or invalid, the backend will catch the error and return a "Mock Response" to ensure the application remains usable for demonstration purposes.
