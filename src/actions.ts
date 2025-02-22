import { supabase } from "./utils/supabase/supabase";
import { prisma } from "./utils/prismaClient";

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

  return { success: true, data }; 
}

export const getUserLevel = async (email : string)=>{
  const { data, error } = await supabase
  .from('users-data')
  .select('userLevel')
  .eq('email', email)
  if (error) {
    console.error("Couldn't get user level, error:", error);
    return new Error(`Couldn't get user level: ${error.message}`);
  }
  console.log("User level retrieved successfully: ", data);
  return data;
}

export const addUserToDatabase = async (email: string, userLevel : string) => {
  const { data, error } = await supabase
    .from("users-data")
    .insert({
      email,
      userLevel
    })
    .select();

  if (error) {
    console.error("Couldn't add user to the database, error:", error);
    return new Error(`Couldn't add user to the database: ${error.message}`);
  }

  console.log("User added to the database successfully: ", data);
  return data; 
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