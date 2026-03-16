# 🎓 AI-Powered University Admission Chatbot

A full-stack AI-powered virtual assistant designed to help students with university admission queries. Built with **React.js**, **Node.js**, and **Google Gemini AI**.

---

## 🚀 Features

- **AI Integration**: Powered by Google's Gemini Flash model for intelligent, context-aware responses.
- **Dynamic Knowledge Base**: Structured dataset (`knowledgeBase.json`) covering courses, fees, eligibility, hostel details, important dates, and more.
- **Admin Panel**: A dedicated UI at `/admin` for administrators to view and update the chatbot's dataset in real-time — no server restart needed.
- **Modern UI**: Clean, responsive chat interface with typing animations, suggested questions, and markdown rendering.
- **Fallback Mode**: Works in offline demo mode even without an API key using built-in keyword-based responses.
- **Chat History**: Persistent chat history stored in the browser's local storage with the ability to clear it.

---

## 📂 Project Structure

```
University Admission ChatBot/
├── client/          # Frontend (React + Vite + Tailwind CSS)
│   └── src/
│       ├── components/
│       │   ├── ChatInterface.jsx   # Main chat UI
│       │   ├── AdminPanel.jsx      # Admin dataset editor
│       │   ├── MessageBubble.jsx   # Chat message component
│       │   └── InputBox.jsx        # Message input component
│       └── App.jsx                 # Route configuration
├── server/          # Backend (Node.js + Express)
│   ├── routes/
│   │   ├── chat.js                 # AI chat endpoint
│   │   └── knowledge.js            # Dataset read/write endpoints
│   ├── data/
│   │   └── knowledgeBase.json      # Chatbot dataset (editable via Admin Panel)
│   └── server.js
└── docs/            # Detailed documentation and workflow guides
```

---

## 🛠️ Quick Start

### Prerequisites
- Node.js (v16+)
- npm
- Google Gemini API Key (optional — runs in fallback mode without it)

### Installation

1. **Clone the repository**

2. **Install dependencies**
   ```bash
   cd server && npm install
   cd ../client && npm install
   ```

3. **Configure Environment**
   - Copy `server/.env.example` to `server/.env`
   - Add your Gemini API key: `GEMINI_API_KEY=your_key_here`

4. **Run the Application**
   ```bash
   # Terminal 1: Backend (runs on port 5001)
   cd server
   npm run dev

   # Terminal 2: Frontend (runs on port 5173)
   cd client
   npm run dev
   ```

---

## 🌐 Application URLs

| URL | Description |
|-----|-------------|
| `http://localhost:5173/` | Chatbot Interface for students |
| `http://localhost:5173/admin` | Admin Panel for dataset management |
| `http://localhost:5001/api/chat` | Chat API endpoint |
| `http://localhost:5001/api/knowledge-base` | Knowledge Base API (GET/PUT) |

---

## 🔧 Admin Panel Usage

1. Navigate to `http://localhost:5173/admin`
2. The current dataset will be loaded in the JSON editor.
3. Make your changes (e.g., update course fees, add new courses, change important dates).
4. Click **Save Changes** — the chatbot will use the updated data immediately.

---

## 📚 Documentation

For detailed guides, check the `docs/` folder.
