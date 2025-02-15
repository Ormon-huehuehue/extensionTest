import { createClient, SupabaseClient } from "@supabase/supabase-js";
import browser from 'webextension-polyfill';
import { supabase } from ".";



export async function loginWithLinkedIn() {
  try {
    console.log("handle login running");
    const redirectTo = chrome.runtime.getURL("redirect.html");

    console.log("Redirect URL : ", redirectTo)

    // Initiating login with LinkedIn
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'linkedin_oidc',
      options: { redirectTo },
    });

    if (error) throw error;

    console.log("Login initiated:", data);

    // Open the OAuth flow in a popup
    if (data.url) {
      chrome.windows.create({
        url: data.url,
        type: 'popup',
        width: 600, // Set the width of the popup
        height: 800, // Set the height of the popup
      });
    } else {
      throw new Error("No redirect URL found.");
    }

  } catch (error) {
    console.error("Login failed:", error);
  }
}