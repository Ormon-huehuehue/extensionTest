import axios from "axios"



export async function fetchGeminiSuggestion(postText: string, apiKey: string): Promise<string> {
    try {
      const response = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}",
        {
          contents: [
            {
              role: "user",
              parts: [{ text: `Suggest a short and engaging LinkedIn comment for this post: ${postText} `}]
            }
          ]
        },
        {
          headers: { "Content-Type": "application/json" }
        }
      );
  
      return response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response from Gemini.";
    } catch (error) {
      console.error("Error fetching suggestion:", error);
      return "Failed to generate suggestion. Please try again.";
    }
  }