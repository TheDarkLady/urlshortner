import supabase from "./supabase";
import {UAParser} from "ua-parser-js";
export async function getClicksForUrls(urlIds){
    const {data, error} = await supabase.from("click").select("*").in("url_id", urlIds);
    if(error){
        console.error('error during getting urls :', error.message)
        throw new Error("Unable to load clicks")
    }
    return data;
} 
const parser = new UAParser();

export const storeClicks = async ({id, original_url}) =>{
    try{
        const res = parser.getResult();
        const device = res.type || "desktop";
        const response = await fetch("https://ipapi.co/json/");
        const {city, country_name : country} = await response.json();
        
        await supabase.from("click").insert(
            { 
                url_id : id,
                city: city,
                device : device,
                country : country,
                
            }
    );
        window.location.href = original_url;
    }
    catch(error){
        console.error("Error recording Clicks", error); 
    }
}



export async function getClicksForUrl(url_id) {
    console.log("url_id", url_id);
    // console.log("Delete url");

    const { data, error } = await supabase.from("click").select("*").eq("url_id", url_id);
    if (error) {
        console.error('Unable load stats :', error.message)
        throw new Error("Unable load stats")
    }
    console.log("getClicksForUrl data", data);

    return data;

}