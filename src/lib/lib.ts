import axios from "axios";

export async function fetchGeminiSuggestion(postText: string): Promise<string> {
    try {
        // Get API Key from Chrome Storage
        const apiKey = await new Promise<string | null>((resolve) => {
            chrome.storage.local.get("GEMINI_API_KEY", (data) => {
                if (data.GEMINI_API_KEY) {
                    console.log("API Key found:", data.GEMINI_API_KEY);
                    resolve(data.GEMINI_API_KEY);
                } else {
                    resolve(null);
                }
            });
        });

        if (!apiKey) {
            return "No API Key found. Please set your API key in the extension settings.";
        }

        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
            {
                contents: [
                    {
                        role: "user",
                        parts: [
                            { text: `Suggest a short and engaging LinkedIn comment for this post: "${postText}" ; Only return the comment text, JUST ONE COMMENT. Make sure the comment doesn't sound AI-generated. This comment WILL get posted, so make sure it sounds good.` }
                        ]
                    }
                ]
            },
            {
                headers: { "Content-Type": "application/json" }
            }
        );

        // Extract response correctly
        const comment = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response from Gemini.";
        return comment;
        
    } catch (error) {
        console.error("Error fetching suggestion:", error);
        return "Failed to generate suggestion. Please try again.";
    }
}
