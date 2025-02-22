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


export async function fetchDailyTasks(userLevel: string): Promise<string> {
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
                            { text: ` Daily LinkedIn Tasks (1 Hour/Day, Mon-Sat)
(15 min) Engagement with Network

    Beginner (1): Engage with 3-5 posts from connections by writing thoughtful comments (15+ words). Avoid generic responses.
    Intermediate (2): Prioritize engaging with posts from key industry professionals, providing actionable insights.
    Advanced (3): Filter feed to engage with decision-makers (e.g., Fortune 1000 executives), adding expert-level commentary.

(20 min) Engagement Beyond Network

    Beginner (1): Find and comment on 2-3 relevant posts using industry hashtags. Send 2-3 personalized connection requests.
    Intermediate (2): Target high-engagement posts in niche communities. Engage with content creators and potential clients.
    Advanced (3): Use LinkedIn Sales Navigator (if available) to find and engage with high-value prospects. Send strategic DMs where relevant.

(15 min) Content Curation & Creation

    Beginner (1): Share curated content with a brief commentary. Avoid external links in the post body.
    Intermediate (2): Post original content 2-3 times/week (short text, polls, or industry insights). Optimize for engagement (hooks, questions).
    Advanced (3): Publish high-value content (articles, videos, LinkedIn newsletters). Include clear CTAs for lead generation.

(10 min) Content Nurturing

    Beginner (1): Respond to all comments on your posts.
    Intermediate (2): Engage with comments by adding follow-up questions.
    Advanced (3): Proactively nurture high-value interactions with personalized DMs and community engagement.

Saturday (Content Creation & Planning - 1.5 Hours Total)

    Beginner (1): Plan posts for next week, ensuring relevance to niche.
    Intermediate (2): Create 2-3 original posts and schedule them.
    Advanced (3): Produce long-form thought leadership content (articles, newsletters, videos).

Based on  this SOP and give me tasks for a linkedIn user of level ${userLevel} ,
I need 3 DAILY tasks with contexual tips in the form of json
All the 3 tasks should serve different purposes
Each task should have a title, description, contextul tips and "isChecked" boolean which is "false" by deafault.
I don't want you to give me any other message
Just the tasks in the form of JSON
i will give you 1 billion dollars if you do this right` }
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

        console.log("Tasks :", comment)
        return comment;
        
    } catch (error) {
        console.error("Error fetching suggestion:", error);
        return "Failed to generate suggestion. Please try again.";
    }
}
