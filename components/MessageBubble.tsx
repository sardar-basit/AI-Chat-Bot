import React from 'react';
import { Message, Role } from '../types';
import { MarkdownRenderer } from './MarkdownRenderer';
import { Bot, User, Copy, Check, AlertCircle } from 'lucide-react';
import { useState } from 'react';

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.role === Role.USER;
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`group flex w-full ${isUser ? 'justify-end' : 'justify-start'} animate-fade-in mb-6`}>
      <div className={`flex max-w-[85%] md:max-w-[75%] gap-4 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        
        {/* Avatar */}
        <div className={`flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center shadow-md ${
          isUser 
            ? 'bg-surfaceHighlight border border-surfaceHighlight' 
            : 'bg-gradient-to-br from-primary to-indigo-600'
        }`}>
          {isUser ? (
            <User size={18} className="text-textMuted" />
          ) : (
            <Bot size={20} className="text-white" />
          )}
        </div>

        {/* Bubble Content */}
        <div className={`relative flex-1 min-w-0 ${isUser ? 'text-right' : 'text-left'}`}>
          {/* Header Name/Time */}
          <div className={`flex items-center gap-2 mb-1 ${isUser ? 'justify-end' : 'justify-start'}`}>
            <span className="text-xs font-medium text-textMuted">
              {isUser ? 'You' : 'Gemini'}
            </span>
            <span className="text-[10px] text-textMuted/60">
              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>

          <div className={`
            relative rounded-2xl px-5 py-4 shadow-sm overflow-hidden
            ${isUser 
              ? 'bg-surfaceHighlight text-text rounded-tr-sm' 
              : 'bg-transparent border border-surfaceHighlight/50 text-text rounded-tl-sm'
            }
          `}>
            {isUser ? (
              <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
            ) : (
              <>
                 {message.isError ? (
                   <div className="flex items-center gap-2 text-red-400">
                     <AlertCircle size={18} />
                     <span>{message.content}</span>
                   </div>
                 ) : (
                   <MarkdownRenderer content={message.content} />
                 )}
                 {message.isStreaming && (
                   <div className="mt-2 flex gap-1 items-center h-4">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                      <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                      <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce"></span>
                   </div>
                 )}
              </>
            )}

            {/* Actions (Copy) - Only for Model */}
            {!isUser && !message.isStreaming && !message.isError && (
               <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                 <button
                   onClick={handleCopy}
                   className="p-1.5 rounded-lg bg-surface hover:bg-surfaceHighlight text-textMuted hover:text-white transition-colors border border-surfaceHighlight/50"
                   title="Copy to clipboard"
                 >
                   {copied ? <Check size={14} /> : <Copy size={14} />}
                 </button>
               </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};