import { UAParser } from "ua-parser-js";
import supabase from "./supabase";

export async function getUrls(user_id) {
    console.log("user_id", user_id);

    const { data, error } = await supabase.from("urls").select("*").eq("user_id", user_id);
    if (error) {
        console.error('error during getting urls :', error.message)
        throw new Error("Unable to load Url")
    }
    console.log("data", data);

    return data;

}

export async function deleteUrl(id) {
    // console.log("url_id", url_id);
    console.log("Delete url");

    const { data, error } = await supabase.from("urls").delete().eq("id", id);
    if (error) {
        console.error('error during getting urls :', error.message)
        throw new Error("Unable to load Url")
    }
    console.log("data", data);

    return data;

}
export async function createUrl({ title, long_url, custom_url, user_id }, qrCode) {
    const short_url = Math.random().toString(36).substring(2, 6)
    const fileName = `qr-${short_url}`
    const { error: storageError } = await supabase.storage.from('qrs').upload(fileName, qrCode)

    if (storageError) {
        console.error('error during login :', storageError.message)
        throw new Error(storageError.message)
    }
    const qr = `https://digjiewdjgpmjkgevxbw.supabase.co/storage/v1/object/public/qrs/${fileName}`

    const { data, error } = await supabase.from("urls").insert([
        { 
            title,
            original_url : long_url, 
            custom_url : custom_url || null, 
            user_id,
            short_url,
            qr
        }
    ]).select();
    if (error) {
        console.error('error during getting urls :', error.message)
        throw new Error("Error creating short url")
    }
    console.log("data", data);
    return data;

}

export async function getLongUrl(id) {
    // console.log("url_id", url_id);
    console.log("Delete url");

    const { data, error } = await supabase.from("urls").select("id, original_url").or(`short_url.eq.${id}, custom_url.eq.${id}`).single();
    if (error) {
        console.error('error during getting Long urls :', error.message)
        throw new Error("Error Fetching short Link")
    }
    console.log("data", data);

    return data;

}

const parser = new UAParser();


export const storeClicks = async ({id, original_url}) =>{
    try{
        const res = parser.getResult();
        const device = res.type || "desktop";
        const response = await fetch("https://ipapi.co/json/");
        const {city, country_name : country} = await response.json();
        
        await supabase.from("clicks").insert([
            { 
                url_id : id,
                city: city,
                device : device,
                country : country,
                
            }
        ]);
        window.location.href = original_url;
    }
    catch(error){
        console.error("Error recording Clicks", error);
    }
}
