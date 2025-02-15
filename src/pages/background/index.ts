import "./checkValidSession"
import { createClient, SupabaseClient } from "@supabase/supabase-js";
// import browser from "webextension-polyfill"

const supabaseUrl: string = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey: string = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey);


console.log("Background script is runnign")

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'OAUTH_SUCCESS') {
      const accessToken = message.accessToken;
      console.log("Access token received:", accessToken);
  
      // Store the access token in chrome.storage
      chrome.storage.local.set({ accessToken }, () => {
        console.log("Access token stored in chrome.storage");
      });
  
      // Optionally, perform additional actions (e.g., update UI, fetch user data)
    }
});;