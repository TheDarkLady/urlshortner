import supabase from "./supabase";

export async function getUrls(user_id){
    console.log("user_id", user_id);
    
    const {data, error} = await supabase.from("urls").select("*").eq("user_id", user_id);
    if(error){
        console.error('error during getting urls :', error.message)
        throw new Error("Unable to load Url")
    }
    console.log("data", data);
    
    return data;

}