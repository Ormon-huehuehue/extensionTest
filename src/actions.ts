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


export async function signInUser(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
  
    if (error) {
      console.error("Signin error:", error);
      return { success: false, error }; // Ensure function always returns something
    }
  
    console.log("Signin successful:", data);
    return { success: true, data }; // Return success response
  }
  

  export async function signOut(){
    const response = await supabase.auth.signOut();

    console.log("response : ", response)
    if(response.error){
      console.error("error : ", response.error)
      return Error("Error signing out user")
    }

    console.log("user signed out successfully")
    return response
  }