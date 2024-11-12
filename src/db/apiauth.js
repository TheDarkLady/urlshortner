import supabase from "./supabase";
export async function login({email, password}) {
    console.log("Attemting login with email : ", email)
    console.log("password : ", password);
    
    const {data, error} =await supabase.auth.signInWithPassword({
        email,
        password,
    })
    console.log("Response from supabase:", data, "Error:", error);
    if(error) {
        console.error('error during login :', error.message)
        throw new Error(error.message)
    }
    return data
}