import axios from "axios"

setInterval(async () => {
    console.log("Checking valid session")
    const fetchSession = async () => {
      const res = await axios.get("http://192.168.1.60:3000/api/auth/session");
      console.log(res.data)
    
      const data = res.data;
  
      if (res.data.access_token) {
        chrome.storage.local.set({ supabaseSession: data });
      }
    };

    fetchSession(); 

    const sessionData = await chrome.storage.local.get("supabaseSession");
    
    if (sessionData?.session) {
      console.log("Session is still valid:", sessionData);
    } else {
      console.log("Session expired or not found. Re-authenticating...");
    }
  }, 15 * 60 * 1000);  // Check every 15 minutes (adjust as needed)
  