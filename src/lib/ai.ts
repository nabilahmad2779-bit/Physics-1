import { GoogleGenAI } from '@google/genai';

// Initialize the Gemini API client
// We use Gemini to simulate all three engines by changing the system prompt.
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export type AIEngine = 'gemini' | 'chatgpt' | 'claude';

export const generatePhysicsAnswer = async (question: string, engine: AIEngine): Promise<string> => {
  let systemInstruction = '';
  
  switch (engine) {
    case 'gemini':
      systemInstruction = 'You are Gemini, a helpful AI physics tutor. Provide clear, accurate, and concise answers directly addressing the user\'s question. Use simple formatting. Use proper LaTeX for all math equations (e.g., $x = A \\sin(\\omega t)$ for inline and $$...$$ for block). Do NOT use excessive markdown like ### or ***.';
      break;
    case 'chatgpt':
      systemInstruction = 'You are ChatGPT. Provide highly structured answers with bullet points, bold text for emphasis, and an enthusiastic, conversational tone. Break down complex physics concepts into easy-to-digest parts. Use proper LaTeX for all math equations (e.g., $x = A \\sin(\\omega t)$ for inline and $$...$$ for block). Do NOT use excessive markdown like ### or ***.';
      break;
    case 'claude':
      systemInstruction = 'You are Claude. Provide nuanced, deeply detailed, and academic explanations. Focus on first principles, historical context if relevant, and precise scientific terminology. Maintain a thoughtful and objective tone. Use proper LaTeX for all math equations (e.g., $x = A \\sin(\\omega t)$ for inline and $$...$$ for block). Do NOT use excessive markdown like ### or ***.';
      break;
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Please answer this physics question comprehensively: ${question}`,
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });
    
    return response.text || 'No response generated.';
  } catch (error) {
    console.error('Error generating AI answer:', error);
    return 'Sorry, there was an error generating the answer. Please try again.';
  }
};
