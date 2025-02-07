import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { fetchGeminiSuggestion } from '@src/lib/lib';

export default function PopupBackup() {
  const [suggestion, setSuggestion] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [newApiKey, setNewApiKey] = useState<string>('');

  useEffect(() => {
    chrome.storage.local.get('GEMINI_API_KEY', (data) => {
      if (data.GEMINI_API_KEY) {
        setApiKey(data.GEMINI_API_KEY);
      }
    });
  }, []);

  const targetElement = document.querySelector(
    ".feed-shared-inline-show-more-text.feed-shared-update-v2__description"
  );
  
  if (targetElement) {
    console.log("Target element found")
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio >= 0.5) {
            console.log("Element is at least 50% visible!");
            // Perform your action here
          }
        });
      },
      {
        threshold: 0.5, // Triggers when 50% of the element is visible
      }
    );
  
    observer.observe(targetElement);
  }
  

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
      setSuggestion('Failed to generate suggestion. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  

  return (
    <div className="p-3 bg-gray-800 text-center text-white h-full">
      <header className="flex flex-col items-center justify-center">
        {!apiKey ? (
          <div className="mt-4 flex flex-col items-center">
            <input
              type="text"
              placeholder="Enter Gemini API Key"
              value={newApiKey}
              onChange={(e) => setNewApiKey(e.target.value)}
              className="p-2 text-black rounded"
            />
            <button onClick={handleSaveApiKey} className="mt-2 bg-green-500 px-4 py-2 rounded hover:bg-green-600">
              Save API Key
            </button>
          </div>
        ) : (
          <div className="mt-4">
            <button
              onClick={handleGenerateSuggestion}
              disabled={isLoading}
              className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
            >
              {isLoading ? 'Generating...' : 'Generate Comment Suggestion'}
            </button>
            {suggestion && (
              <div className="mt-4 p-3 bg-gray-700 rounded">
                <p className="text-left">{suggestion}</p>
              </div>
            )}
          </div>
        )}
      </header>
    </div>
  );
}

