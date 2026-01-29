# Bun + Elysia.js + Vite + Tambo Template 🥁⚡️

A high-performance, full-stack starter template for building Generative AI applications. Combines the speed of **Bun**, the elegance of **Elysia.js** backend, **Vite** frontend, and **Tambo SDK** for AI-powered generative interfaces.

## ✨ Key Features

- **⚡ Bun Monorepo**: Lightning-fast JavaScript runtime
- **🚀 Elysia.js Backend**: Type-safe API with chart and todo endpoints
- **⚛️ Vite + React Frontend**: Lightning-fast HMR
- **🎙️ Voice Input**: Native `useTamboVoice` hook for speech-to-text
- **🧩 Backend-Connected Components**: Chart and TodoList fetch from Elysia
- **✨ Streaming Animations**: Items animate in with staggered effects
- **🛡️ Graceful Error Handling**: Friendly setup when API key missing
- **📦 Type-Safe**: Full TypeScript support with Zod validation

## 🎯 Architecture

```
User → Tambo React → AI renders component → Component fetches from Elysia backend
```

**Example**: "Show me a sales chart" → Tambo renders `SimpleChart` → fetches data from `/api/chart`

## 🛠️ Quick Start

1. **Install**: `bun install`
2. **Configure**: Copy `.env.example` to `.env` and add your `VITE_TAMBO_API_KEY`
3. **Run**: `bun dev` (Frontend: :5173, Backend: :3000)

## 📁 Project Structure

```
apps/
├── server/src/
│   ├── index.ts      # API routes
│   └── handlers.ts   # Chart & todo handlers
└── web/src/
    ├── components/   # SimpleChart, TodoList, ApiKeyError
    └── tambo/        # Provider & registry
```

## 🔌 Backend Endpoints

| Endpoint                   | Method | Description                   |
| -------------------------- | ------ | ----------------------------- |
| `/api/chart?topic=<topic>` | GET    | Generate chart data for topic |
| `/api/todos?listId=<id>`   | GET    | Fetch saved todos             |
| `/api/todos`               | POST   | Save todos to server          |

## 🧩 Components

### SimpleChart (Backend-Integrated)

Fetches data from `/api/chart` based on topic.

```
Try: "Show me a chart of user growth"
```

### TodoList (Backend-Persisted)

Items saved to backend with "Saving..." indicator. Staggered animations.

```
Try: "Create a todo list for my project launch"
```

## 🚨 Troubleshooting

**"API Key Missing"** - Add `VITE_TAMBO_API_KEY` to `.env` and restart

**Chart shows "Unable to load"** - Ensure backend is running on port 3000

## 📖 Documentation

- [Tambo Docs](https://docs.tambo.co/)
- [Elysia.js](https://elysiajs.com/)
- [Bun](https://bun.sh/docs)

---

**Happy building! 🚀**
