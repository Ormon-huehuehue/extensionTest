import { createClient, SupabaseClient } from "@supabase/supabase-js";
import browser from 'webextension-polyfill';

const supabaseUrl: string = import.meta.env.VITE_SUPABASE_URL;const supabaseAnonKey: string = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase : SupabaseClient = createClient(supabaseUrl, supabaseAnonKey);


export async function loginWithLinkedIn() {
  try {
    const redirectTo = browser.runtime.getURL("redirect.html"); 

    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'linkedin_oidc',
        options: { redirectTo },
    });

    if (error) throw error;

    console.log("Login initiated:", data);
  } catch (error ) {
    console.error("Login failed:", error);
  }
}


