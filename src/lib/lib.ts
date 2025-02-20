import axios from "axios";
import browser from 'webextension-polyfill';

export async function fetchGeminiSuggestion(postText: string): Promise<string> {
    try {
        // Get API Key from Chrome Storage
        const apiKey = await (async () => {
            const data = await browser.storage.local.get("GEMINI_API_KEY");
            return data.GEMINI_API_KEY || null;
        })();

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


export async function fetchUserDivison(surveyResponse: string): Promise<string> {
    try {
        // Get API Key from Chrome Storage
        const apiKey = await (async () => {
            const data = await browser.storage.local.get("GEMINI_API_KEY");
            return data.GEMINI_API_KEY || null;
        })();

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
                            { text: `Use the following respponse to quantify a user into one of three categories: 1. Beginnner 2. Intermediate 3. Advanced. 
                              Only give me a one word answer. 1, 2, or 3. Do not give any other text, I JUST WANT THE NUMBER NOTHING ELSE. I WILL GIVE YOU 1 BILLION DOLLARS IF YOU DO THIS RIGHT, LOVE YOU GEMINI ; 
                              Response : "${surveyResponse}"  ` }
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
