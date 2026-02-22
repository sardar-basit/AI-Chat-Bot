# 🤖 Chat-Bot — Powered by Google Gemini

A sleek, real-time AI chat application built with **React**, **TypeScript**, and the **Google Gemini API**. Features a modern dark UI, streaming responses, and Markdown rendering.

![Tech Stack](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=flat-square&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=flat-square&logo=vite)
![Gemini](https://img.shields.io/badge/Google%20Gemini-API-4285F4?style=flat-square&logo=google)

---

## ✨ Features

- 💬 **Real-time Streaming** — Responses appear word-by-word as they stream from the Gemini API
- 📝 **Markdown Rendering** — Full Markdown support including code blocks with syntax highlighting
- 🎨 **Modern Dark UI** — Clean, responsive interface with smooth animations
- 💡 **Prompt Suggestions** — Quick-start suggestions on empty state
- 🗑️ **Clear Chat** — Reset conversation with a single click
- ⚡ **Blazing Fast** — Powered by Vite for instant HMR during development

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 |
| Language | TypeScript 5.8 |
| Build Tool | Vite 6 |
| AI API | Google Gemini (`gemini-2.0-flash-preview`) |
| Styling | Tailwind CSS (CDN) |
| Markdown | `react-markdown` + `remark-gfm` |
| Syntax Highlighting | `react-syntax-highlighter` |
| Icons | `lucide-react` |

---

## 📁 Project Structure

```
Chat-Bot/
├── components/
│   ├── ChatInput.tsx        # User input field component
│   ├── MessageBubble.tsx    # Renders individual messages (user & model)
│   └── MarkdownRenderer.tsx # Safely renders Markdown in chat bubbles
├── hooks/
│   └── useChat.ts           # Chat state and streaming logic
├── services/
│   └── geminiService.ts     # Google Gemini API integration
├── App.tsx                  # Root component (layout, routing between states)
├── index.tsx                # React DOM entry point
├── index.html               # HTML shell with Tailwind CDN
├── types.ts                 # TypeScript interfaces & enums
├── vite.config.ts           # Vite config
└── .env.local               # API key (not committed)
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- A [Google Gemini API key](https://aistudio.google.com/apikey)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/Chat-Bot.git
   cd Chat-Bot
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up your API key:**

   Create a `.env.local` file in the project root:
   ```env
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

   Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🔄 How It Works

```
User types message
       ↓
  ChatInput.tsx
       ↓
  useChat hook  →  geminiService.ts  →  Gemini API
       ↓                                     ↓
  State updates  ←←←←←  Streamed response chunks
       ↓
  App.tsx re-renders
       ↓
  MessageBubble with Markdown
```

1. User submits a message via `ChatInput`
2. `useChat` hook adds the user message to state and creates a placeholder model message
3. `geminiService` opens a streaming request to the Gemini API
4. As text chunks arrive, the model's message updates in real-time
5. `react-markdown` renders the final Markdown-formatted response

---

## 📦 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |

---

## 🔐 Environment Variables

| Variable | Description |
|---|---|
| `VITE_GEMINI_API_KEY` | Your Google Gemini API key |

> ⚠️ Never commit your `.env.local` file. It is already listed in `.gitignore`.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
