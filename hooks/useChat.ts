import { useState, useCallback, useRef } from 'react';
import { Message, Role, ChatState } from '../types';
import { geminiService } from '../services/geminiService';

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Ref to track if we should stop generation (basic implementation)
  const abortControllerRef = useRef<AbortController | null>(null);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;

    setIsLoading(true);
    setError(null);

    // 1. Add User Message
    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: Role.USER,
      content: content,
      timestamp: new Date(),
    };

    // 2. Add Placeholder Model Message
    const modelMessageId = crypto.randomUUID();
    const initialModelMessage: Message = {
      id: modelMessageId,
      role: Role.MODEL,
      content: '',
      timestamp: new Date(),
      isStreaming: true,
    };

    setMessages((prev) => [...prev, userMessage, initialModelMessage]);

    try {
      let accumulatedText = '';
      
      // We start streaming
      const stream = geminiService.streamMessage(content);
      
      for await (const chunk of stream) {
        accumulatedText += chunk;
        
        setMessages((prev) => 
          prev.map((msg) => 
            msg.id === modelMessageId 
              ? { ...msg, content: accumulatedText } 
              : msg
          )
        );
      }

      // Finalize message
      setMessages((prev) => 
        prev.map((msg) => 
          msg.id === modelMessageId 
            ? { ...msg, isStreaming: false } 
            : msg
        )
      );

    } catch (err: any) {
      console.error("Chat error:", err);
      setError(err.message || "An error occurred while generating the response.");
      
      setMessages((prev) => 
        prev.map((msg) => 
          msg.id === modelMessageId 
            ? { ...msg, isStreaming: false, isError: true, content: msg.content || "Error generating response." } 
            : msg
        )
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearChat = useCallback(() => {
    setMessages([]);
    geminiService.startNewSession();
    setError(null);
  }, []);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearChat
  };
};