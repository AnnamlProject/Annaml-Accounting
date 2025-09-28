import { GoogleGenAI } from "@google/genai";
import { CATEGORIES } from '../constants';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const categorizeTransaction = async (description: string): Promise<string> => {
  if (!description) {
    return "Other";
  }

  try {
    const prompt = `Given the transaction description "${description}", categorize it into one of the following categories. Respond with only the category name from the list.
    
    Categories: ${CATEGORIES.join(", ")}
    
    Description: "${description}"
    Category:`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        temperature: 0.1,
        maxOutputTokens: 20,
        thinkingConfig: { thinkingBudget: 0 } 
      }
    });

    const category = response.text.trim();
    
    // Validate if the response is one of the allowed categories
    if (CATEGORIES.includes(category)) {
      return category;
    }

    return "Other";
  } catch (error) {
    console.error("Error categorizing transaction:", error);
    return "Other"; // Fallback category
  }
};
