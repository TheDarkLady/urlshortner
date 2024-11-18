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
    const qr = `${supabase}/storage/v1/object/public/${fileName}`

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