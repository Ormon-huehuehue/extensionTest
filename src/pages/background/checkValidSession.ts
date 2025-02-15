// Periodically check if the session is still valid
import { supabase } from ".";



setInterval(async () => {
    console.log("Checking valid session")
    const { data: sessionData } = await supabase.auth.getSession();
    
    if (sessionData?.session) {
      console.log("Session is still valid:", sessionData);
    } else {
      console.log("Session expired or not found. Re-authenticating...");
    }
  }, 15 * 60 * 1000);  // Check every 15 minutes (adjust as needed)
  