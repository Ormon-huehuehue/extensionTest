// ./background.ts
import browser from "webextension-polyfill";
import { supabase } from "@src/utils/supabase/supabase";

type Message = {
  action: 'fetch' | 'getSession' | 'signout',
  value: null
} | {
  action: 'signup' | 'signin',
  value: {
    email: string,
    password: string,
  }
}

