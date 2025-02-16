import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Gemini API client
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || "");

// Create a chat model instance
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

export async function chatWithGemini(message: string, excelData?: any) {
  try {
    // Start a chat session
    const chat = model.startChat({
      history: [],
      generationConfig: {
        maxOutputTokens: 2048,
      },
    });

    // Prepare context about the Excel data if available
    let prompt = message;
    if (excelData) {
      prompt = `Context: Working with Excel data:\n${JSON.stringify(excelData, null, 2)}\n\nUser Query: ${message}`;
    }

    // Generate response
    const result = await chat.sendMessage(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw error;
  }
}
