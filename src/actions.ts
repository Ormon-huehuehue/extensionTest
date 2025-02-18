import { supabase } from "./utils/supabase/supabase";

export async function signUpNewUser(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    console.error("Signup error:", error);
    return { success: false, error }; // Ensure function always returns something
  }

  console.log("Signup successful:", data);
  return { success: true, data }; // Return success response
}
