import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { Message, Role } from "../types";

// Initialize the API client
// We must use the process.env.API_KEY directly as per guidelines
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export class GeminiService {
  private chatSession: Chat | null = null;
  private modelName: string = 'gemini-3-flash-preview'; // Optimized for speed/latency

  constructor() {
    this.startNewSession();
  }

  public startNewSession() {
    this.chatSession = ai.chats.create({
      model: this.modelName,
      config: {
        systemInstruction: "You are a helpful, professional, and precise AI assistant. You answer concisely and accurately. Use Markdown for formatting code, lists, and emphasis.",
      },
    });
  }

  /**
   * Sends a message to the model and yields chunks of the response.
   */
  public async *streamMessage(content: string): AsyncGenerator<string, void, unknown> {
    if (!this.chatSession) {
      this.startNewSession();
    }

    if (!this.chatSession) {
      throw new Error("Failed to initialize chat session");
    }

    try {
      const responseStream = await this.chatSession.sendMessageStream({ message: content });

      for await (const chunk of responseStream) {
        const responseChunk = chunk as GenerateContentResponse;
        if (responseChunk.text) {
          yield responseChunk.text;
        }
      }
    } catch (error) {
      console.error("Error in streamMessage:", error);
      throw error;
    }
  }
}

export const geminiService = new GeminiService();