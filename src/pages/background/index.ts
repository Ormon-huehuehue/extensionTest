import browser from "webextension-polyfill";
import { supabase } from "@src/utils/supabase/supabase";


browser.runtime.onMessage.addListener(
  async (message , sender, sendResponse) => {
    console.log("Message received :", message)
    if (message.action === "addComment") {
      console.log("Add comment");

      // Example: Fetch user from Supabase
      const { data: user, error } = await supabase.auth.getUser();
      if (error) {
        sendResponse({ success: false, error: error.message });
        return; 
      }

    
      console.log("Current User:", user);
      sendResponse({ success: true, message: "Comment added" });
    }

    return true; // Keep `sendResponse` alive for async operations
  }
);
