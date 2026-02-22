import React, { useState, useRef, useEffect } from 'react';
import { Send, StopCircle, Sparkles } from 'lucide-react';

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSend, isLoading }) => {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
    }
  };

  useEffect(() => {
    adjustHeight();
  }, [input]);

  const handleSend = () => {
    if (!input.trim() || isLoading) return;
    onSend(input);
    setInput('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="relative flex items-end bg-surface border border-surfaceHighlight rounded-2xl shadow-lg focus-within:ring-2 focus-within:ring-primary/50 transition-all duration-300">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask Gemini anything..."
          className="w-full bg-transparent text-text placeholder-textMuted/50 px-4 py-4 max-h-[200px] resize-none focus:outline-none min-h-[56px] leading-relaxed"
          rows={1}
          disabled={isLoading}
        />
        <div className="pb-3 pr-3">
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className={`p-2.5 rounded-xl transition-all duration-200 flex items-center justify-center
              ${input.trim() && !isLoading
                ? 'bg-primary text-white hover:bg-primaryHover shadow-lg shadow-primary/20'
                : 'bg-surfaceHighlight text-textMuted cursor-not-allowed'
              }
            `}
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Send size={20} />
            )}
          </button>
        </div>
      </div>
      <div className="mt-2 text-center text-xs text-textMuted flex items-center justify-center gap-1.5 opacity-60">
        <Sparkles size={12} className="text-primary" />
        <span>AI can make mistakes.</span>
      </div>
    </div>
  );
};