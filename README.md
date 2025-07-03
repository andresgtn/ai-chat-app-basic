# AI Chat App (FastAPI + Groq + Next.js)

A minimal full-stack chatbot using:
- **Frontend:** Next.js + React + TypeScript
- **Backend:** FastAPI (Python)
- **LLM API:** Groq (e.g. LLaMA 3, Mixtral — free to use)

---

## Features
- Clean React-based UI
- FastAPI backend with Groq API integration
- Environment-configurable API endpoint
- Runs fully on localhost for development

---

## Project Structure
```
ai-chat-app-basic/
├── backend/
│   ├── main.py                # FastAPI server
│   ├── .env                   # Groq API key (not committed)
│   └── requirements.txt       # Python dependencies
│
├── frontend/
│   ├── pages/index.tsx        # React frontend (Next.js)
│   ├── .env.local             # Frontend environment variables
│   ├── package.json           # npm config
│   ├── tsconfig.json          # TypeScript config
│   └── next-env.d.ts          # Auto-generated TS types
```

---

## Setup Instructions

### 1. Backend (FastAPI)
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Create your .env file with your Groq API key
echo "GROQ_API_KEY=sk-..." > .env

# Start the backend server
uvicorn main:app --reload
```

### 2. Frontend (Next.js + TypeScript)
```bash
cd frontend
npm install

# Create a .env.local file for your frontend API endpoint
echo "NEXT_PUBLIC_API_URL=http://localhost:8000" > .env.local

# Start the frontend server
npm run dev
```

Then open: http://localhost:3000

---

## Environment Variables

### Backend (`backend/.env`)
```env
GROQ_API_KEY=your-groq-api-key-here
```

### Frontend (`frontend/.env.local`)
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

These values are critical for local development. Do **not** commit your actual `.env` or `.env.local` files — only `.env.local.example`.

---

## Customization Ideas
- Add model selector (Mixtral, Gemma, etc.)
- Deploy backend to Railway or Render
- Deploy frontend to Vercel
- Add streaming and chat history

---

## License
MIT – feel free to use and modify.

