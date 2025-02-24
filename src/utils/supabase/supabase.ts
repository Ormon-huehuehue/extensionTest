import { SupabaseClient, createClient } from "@supabase/supabase-js";

const supabaseUrl: string = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey: string = import.meta.env.VITE_SUPABASE_ANON_KEY;


// Custom storage adapter for chrome.storage.local
const customStorage = {
    getItem: async (key: string): Promise<string | null> => {
      return new Promise((resolve) => {
        chrome.storage.local.get([key], (result) => {
          resolve(result[key] ? String(result[key]) : null);
        });
      });
    },
    setItem: async (key: string, value: string): Promise<void> => {
      return new Promise((resolve) => {
        chrome.storage.local.set({ [key]: value }, resolve);
      });
    },
    removeItem: async (key: string): Promise<void> => {
      return new Promise((resolve) => {
        chrome.storage.local.remove(key, resolve);
      });
    },
  };
  

export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey);
