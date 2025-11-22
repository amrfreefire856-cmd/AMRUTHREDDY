import { GoogleGenAI } from "@google/genai";
import { MarkOption } from '../types';

// Initialize GenAI with API Key from environment
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateAnswer = async (
  question: string,
  marks: MarkOption,
  context: string
): Promise<string> => {
  try {
    let instruction = "";

    switch (marks) {
      case MarkOption.TWO:
        instruction = "Provide a concise definition or explanation. Maximum 3-4 sentences. Focus on key terms. Do not use bullet points unless listing distinct items. Keep it brief and accurate.";
        break;
      case MarkOption.FIVE:
        instruction = "Provide a structured explanation. Use a clear introduction, 3-5 bullet points for key concepts, and a brief conclusion. Highlight important keywords in bold. Total length should be moderate.";
        break;
      case MarkOption.EIGHT:
        instruction = "Provide a comprehensive, long-form answer suitable for an 8-mark exam question. Organize into clear sections (Introduction, Core Concepts, Detailed Analysis, Conclusion). You MUST include at least one relevant ASCII art diagram or chart to illustrate the concept. Use headings and bold text for emphasis. The answer should be detailed and cover multiple aspects of the topic.";
        break;
    }

    const prompt = `
      You are AE GPT, an advanced exam assistant.
      
      Task: Generate an exam-style answer for the following question based on the provided context (if any) and general knowledge.
      
      Context/Syllabus Material:
      ${context ? context : "No specific context provided. Use general academic knowledge."}
      
      Question: ${question}
      
      Marks: ${marks}
      
      Style Guide:
      ${instruction}
      
      Format: Markdown.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "Failed to generate answer. Please try again.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error generating answer. Please check your connection or API key.";
  }
};