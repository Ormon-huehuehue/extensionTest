// Get the token from the URL
document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
  
    if (token) {
      console.log("Supabase Token:", token);
      
      // Store in Chrome local storage
      chrome.storage.local.set({ supabaseToken: token }, () => {
        console.log("Token saved to Chrome storage");
        
        // Close the popup
        setTimeout(() => window.close(), 1000);
      });
    } else {
      console.error("No token found in URL");
    }
  });
  