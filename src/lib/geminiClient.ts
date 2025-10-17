const API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`;

const SYSTEM_PROMPT = `You are CineBuddy, an AI film enthusiast and movie curator.
You recommend films based on mood, genre, decade, or actors.
Keep answers short, warm, and conversational.
Include one-line descriptions and release years when possible.
Avoid unrelated topics or technical details.
Format your response in plain text, not markdown.`;

export const getGeminiResponse = async (message: string): Promise<string> => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          {
            role: 'user',
            parts: [{ text: `${SYSTEM_PROMPT}\n\n---\n\nUser: ${message}` }],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Gemini API Error:', errorData);
      throw new Error(errorData.error.message || 'Failed to get response from AI. Check API key and quota.');
    }

    const data = await response.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      throw new Error('Received an empty response from the AI.');
    }

    return text.trim();
  } catch (error) {
    console.error('Error in getGeminiResponse:', error);
    if (error instanceof Error && error.message.includes('API key not valid')) {
      throw new Error('Your Gemini API key is not valid. Please check your .env file.');
    }
    throw new Error('An unexpected error occurred while contacting the AI.');
  }
};
