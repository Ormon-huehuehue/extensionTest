import { supabase } from "@src/utils/supabase/supabase";
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

Based on this SOP and give me tasks for a linkedIn user of level ${userLevel} ,
feel free to deviate from the SOP a bit to make the tasks more engaging for the user, do not give similar tasks, every task should be different
I need 3 DAILY tasks with contexual tips in the form of json
All the 3 tasks should serve different purposes
Each task should have a title, description, contextul tips and "isChecked" boolean which is "false" by deafault.
The description should be very concise.
I don't want you to give me any other message
Just the tasks in the form of JSON
i will give you 1 billion dollars if you do this right
Generate a different list of tasks on every prompt cuz i'm gonna send you this same prompt everyday` }
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


export async function addCommentToLocalStorage() {
    try {
        console.log("Adding comment timestamp to local storage");

        // Get the current timestamp
        const timestamp = new Date().toISOString();

        // Retrieve existing timestamps from chrome.storage.local using promises
        const result = await chrome.storage.local.get("commentTimestamps");
        let timestamps: string[] = result.commentTimestamps || [];

        // Add new timestamp to the array
        timestamps.push(timestamp);

        // Save back to storage
        await chrome.storage.local.set({ commentTimestamps: timestamps });

        console.log("Comment timestamp saved:", timestamp);
        return timestamp;
    } catch (error) {
        console.error("Error saving comment timestamp:", error);
        return new Error("Error saving comment timestamp");
    }
}


export async function addPostToLocalStorage() {
    try {
        console.log("Adding post timestamp to local storage");

        // Get the current timestamp
        const timestamp = new Date().toISOString();

        // Retrieve existing timestamps from chrome.storage.local using promises
        const result = await chrome.storage.local.get("postTimeStamps");
        let timestamps: string[] = result.postTimeStamps || [];

        // Add new timestamp to the array
        timestamps.push(timestamp);

        // Save back to storage
        await chrome.storage.local.set({ postTimeStamps: timestamps });

        console.log("Post timestamp saved:", timestamp);
        return timestamp;
    } catch (error) {
        console.error("Error saving POST timestamp:", error);
        return new Error("Error saving POST timestamp");
    }
}
