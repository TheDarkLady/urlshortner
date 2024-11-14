import supabase from "./supabase";
export async function login({email, password}) {
    // console.log("Attemting login with email : ", email)
    // console.log("password : ", password);
    
    const {data, error} =await supabase.auth.signInWithPassword({
        email,
        password,
    })
    // console.log("Response from supabase:", data, "Error:", error);
    if(error) {
        console.error('error during login :', error.message)
        throw new Error(error.message)
    }
    return data
}

export async function getCurrentUser(){
    const {data: session, error} = await supabase.auth.getSession();

    if(!session.session){
        return null
    }
    if(error){
        console.error('error during login :', error.message)
        throw new Error(error.message)
    }
    return session.session?.user
}

export async function signup({name, email, password, profile_pic}) {
    const fileName = `dp-${name.split(' ').join('-')}-${Math.random()}`
    const {error:storageError} = await supabase.storage.from('profile_pic').upload(fileName, profile_pic)

    if(storageError){
        console.error('error during login :', storageError.message)
        throw new Error(storageError.message)
    }
    const {data, error} =await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                name,
                profile_pic: `${supabase}/storage/v1/object/public/${fileName}`,
            }
        }
    })
    // console.log("Response from supabase:", data, "Error:", error);
    if(error) {
        console.error('error during login :', error.message)
        throw new Error(error.message)
    }
    return data
}

export async function logout() {
    const {error} = await supabase.auth.signOut()
    if(error) {
        console.error('error during login :', error.message)
        throw new Error(error.message)
    }
}