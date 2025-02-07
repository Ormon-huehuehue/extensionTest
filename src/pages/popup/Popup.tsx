import React, { useState, useEffect } from 'react';
import logo from '@assets/img/logo.svg';
import axios from 'axios';

export default function Popup() {
  const [suggestion, setSuggestion] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [newApiKey, setNewApiKey] = useState<string>('');

  useEffect(() => {
    // Fetch API key from chrome.storage
    chrome.storage.local.get('GEMINI_API_KEY', (data) => {
      if (data.GEMINI_API_KEY) {
        setApiKey(data.GEMINI_API_KEY);
      }
    });
  }, []);

  const handleSaveApiKey = () => {
    if (newApiKey.trim()) {
      chrome.storage.local.set({ GEMINI_API_KEY: newApiKey }, () => {
        setApiKey(newApiKey);
        setNewApiKey('');
      });
    }
  };

  const handleGenerateSuggestion = async () => {
    if (!apiKey) return;
    setIsLoading(true);
    try {
      const response = await fetchGeminiSuggestion('Sample LinkedIn post text', apiKey);
      setSuggestion(response);
    } catch (error) {
      console.error('Error fetching suggestion:', error);
      setSuggestion('Failed to generate suggestion. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 text-center h-full p-3 bg-gray-800">
      <header className="flex flex-col items-center justify-center text-white">
        <img src={logo} className="h-36 pointer-events-none animate-spin-slow" alt="logo" />
        {!apiKey ? (
          <div className="mt-4 flex flex-col items-center">
            <input
              type="text"
              placeholder="Enter Gemini API Key"
              value={newApiKey}
              onChange={(e) => setNewApiKey(e.target.value)}
              className="p-2 text-black rounded"
            />
            <button onClick={handleSaveApiKey} className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
              Save API Key
            </button>
          </div>
        ) : (
          <div className="mt-4">
            <button
              onClick={handleGenerateSuggestion}
              disabled={isLoading}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
            >
              {isLoading ? 'Generating...' : 'Generate Comment Suggestion'}
            </button>

            {suggestion && (
              <div className="mt-4 p-3 bg-gray-700 rounded">
                <p className="text-left text-white">{suggestion}</p>
              </div>
            )}
          </div>
        )}
      </header>
    </div>
  );
}

async function fetchGeminiSuggestion(postText: string, apiKey: string): Promise<string> {
  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        contents: [
          {
            role: "user",
            parts: [{ text: `Suggest a short and engaging LinkedIn comment for this post: "${postText}"` }]
          }
        ]
      },
      {
        headers: { "Content-Type": "application/json" }
      }
    );

    return response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response from Gemini.";
  } catch (error) {
    console.error("Error fetching suggestion:", error);
    return "Failed to generate suggestion. Please try again.";
  }
}
