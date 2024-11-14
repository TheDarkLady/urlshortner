import supabase from "./supabase";

export async function getUrls(user_id){
    const {data, error} = await supabase.from("urls").select("*").eq("user_id", user_id);
    if(error){
        console.error('error during getting urls :', error.message)
        throw new Error("Unable to load Url")
    }
    return data;
}