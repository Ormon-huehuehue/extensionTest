import React, { useState } from 'react';
import { Link } from "react-router-dom";

export default function Settings() {

  const [apiKey, setApiKey] = useState<string | null>(null);
  const [newApiKey, setNewApiKey] = useState<string>('');

  const handleSaveApiKey = () => {
    if (newApiKey.trim()) {
      chrome.storage.local.set({ GEMINI_API_KEY: newApiKey }, () => {
        setApiKey(newApiKey);
        setNewApiKey('');
      });
    }
  };

  return (
    <div className="mt-4 flex flex-col items-center">
       <div>
      <h2 className="text-lg font-bold">Options Page</h2>
      <Link to="/" className="mt-4 block p-2 bg-gray-500 text-white rounded text-center">
        Back to Home
      </Link>
    </div>
    <input
      type="text"
      placeholder="Enter Gemini API Key"
      value={newApiKey}
      onChange={(e) => setNewApiKey(e.target.value)}
      className="p-2 text-black rounded"
    />
    <button onClick={handleSaveApiKey} className="mt-2 text-black px-4 py-2 rounded hover:bg-green-600">
      Save API Key
    </button>
  </div>
  )
}
