import React, { useEffect, useRef } from 'react';
import { useChat } from './hooks/useChat';
import { ChatInput } from './components/ChatInput';
import { MessageBubble } from './components/MessageBubble';
import { Bot, Trash2, Github, Menu, Plus } from 'lucide-react';

const App: React.FC = () => {
  const { messages, isLoading, sendMessage, clearChat } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex flex-col h-screen bg-background text-text font-sans overflow-hidden">

      {/* Header */}
      <header className="flex-shrink-0 h-16 border-b border-surfaceHighlight bg-background/80 backdrop-blur-md flex items-center justify-between px-4 md:px-8 z-20">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary to-indigo-500 flex items-center justify-center shadow-lg shadow-primary/20">
            <Bot size={20} className="text-white" />
          </div>
          <div>
            <h1 className="font-semibold text-lg tracking-tight">Chat-Bot</h1>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-[10px] text-textMuted uppercase tracking-wider font-medium">Online</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="https://github.com/google-gemini/generative-ai-js"
            target="_blank"
            rel="noreferrer"
            className="p-2 text-textMuted hover:text-text transition-colors hidden sm:block"
          >
            <Github size={20} />
          </a>
          <button
            onClick={clearChat}
            className="p-2 text-textMuted hover:text-red-400 transition-colors rounded-md hover:bg-surfaceHighlight"
            title="Clear Chat"
          >
            <Trash2 size={20} />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-hidden relative flex flex-col">
        {messages.length === 0 ? (
          // Empty State
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center animate-fade-in">
            <div className="w-16 h-16 rounded-2xl bg-surfaceHighlight/50 flex items-center justify-center mb-6">
              <Bot size={32} className="text-primary" />
            </div>
            <h2 className="text-2xl font-bold mb-3 bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent">
              How can I help you today?
            </h2>
            <p className="text-textMuted max-w-md mb-8">
              Experience the power of Gemini 3 Flash. Ask about code, analysis, creative writing, or anything else.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl w-full">
              {[
                "Explain quantum computing in simple terms",
                "Write a Python script to scrape a website",
                "What are the latest trends in UI design?",
                "Debug this React component code"
              ].map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => sendMessage(suggestion)}
                  className="p-4 bg-surface border border-surfaceHighlight rounded-xl text-sm text-left hover:border-primary/50 hover:bg-surfaceHighlight transition-all duration-200 group"
                >
                  <span className="group-hover:text-primary transition-colors">{suggestion}</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          // Messages List
          <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-2">
            <div className="max-w-4xl mx-auto">
              {messages.map((msg) => (
                <MessageBubble key={msg.id} message={msg} />
              ))}
              <div ref={messagesEndRef} className="h-4" />
            </div>
          </div>
        )}
      </main>

      {/* Footer / Input Area */}
      <footer className="flex-shrink-0 bg-background/95 backdrop-blur-sm border-t border-surfaceHighlight p-2 z-20">
        <ChatInput onSend={sendMessage} isLoading={isLoading} />
      </footer>

    </div>
  );
};

export default App;