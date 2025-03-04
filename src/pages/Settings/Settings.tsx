import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "@src/actions";

export default function Settings() {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [newApiKey, setNewApiKey] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSaveApiKey = () => {
    if (newApiKey.trim()) {
      chrome.storage.local.set({ GEMINI_API_KEY: newApiKey }, () => {
        setApiKey(newApiKey);
        setNewApiKey("");
      });
    }
  };

  const handleSignOut = async () => {
    setLoading(true);
    try {
      localStorage.removeItem("dailyTasks")
      localStorage.removeItem("userLevel")
      localStorage.removeItem('lastSyncTime')
      await chrome.storage.local.remove('commentTimestamps');
      await chrome.storage.local.remove('postTimeStamps');
      await chrome.storage.local.remove('connectionData');
      await signOut();
      window.postMessage('checkUser', '*');
      navigate("/account/login"); 
    } catch (error) {
      console.error("Sign out failed:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    chrome.storage.local.get(["GEMINI_API_KEY"], (result) => {
      setApiKey(result.GEMINI_API_KEY || null);
    });
  }, []);

  if (!apiKey) {
    return (
      <div className="mt-4 flex flex-col items-center">
        <h2 className="text-lg font-bold">SETTINGS</h2>
        <input
          type="text"
          placeholder="Enter Gemini API Key"
          value={newApiKey}
          onChange={(e) => setNewApiKey(e.target.value)}
          className="mt-5 p-2 text-black rounded"
        />
        <button
          onClick={handleSaveApiKey}
          className="mt-2 text-black px-4 py-2 rounded hover:bg-blue-400 hover:text-white"
        >
          Save API Key
        </button>
        <Link to="/" className="mt-4 block p-2 bg-gray-500 text-white rounded text-center">
          Back to Home
        </Link>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col justify-center items-center text-center">
        <p className="mb-4">API key already present</p>
        <button
          onClick={handleSignOut}
          disabled={loading}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          {loading ? "Signing out..." : "Sign Out"}
        </button>
      </div>
    );
  }
}
