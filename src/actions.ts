import { redirect } from "react-router-dom";
import { createClient } from "./utils/supabase/server";

export const signInAction = async (formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = await createClient();
  
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
  
    if (error) {
      console.error("Error signing in:", error.message);
    }
  
    return redirect("/protected");
  };