// import "./checkValidSession"
import { supabase } from "@src/utils/supabase/supabase"
import browser from "webextension-polyfill"
import axios from "axios"

console.log("Background script is runnign")

chrome.cookies.getAll({ domain: "http://192.168.1.60:3000" }, (cookies) => {
    const authCookie = cookies.find((cookie) => cookie.name === "sb-bcdejivhebquhoaysqfm-auth-token.0");
  
    if (authCookie) {
      console.log("Access Token:", authCookie.value);
    } else {
      console.log("No access token found.");
    }
  });
  


console.log("Checking valid session")
// const fetchSession = async () => {
//     try {
//       const res = await axios.get("http://192.168.1.60:3000/api/session");
  
//       console.log("Session data:", res.data);
  
//     //   if (res.data.access_token) {
//     //     chrome.storage.local.set({ supabaseSession: res.data });
//     //   }
//     } catch (error) {
//       console.error("Error fetching session:", );
//     }
//   };

//   fetchSession();
  

  const getUser = async()=>{
    const data = await supabase.auth.getUser();
    console.log("User data :", data);
}

getUser();