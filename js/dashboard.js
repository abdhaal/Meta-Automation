// js/dashboard.js

// Page load aagum pothu initialized aagara main bypass trigger
async function initDashboard() {
    console.log("Dashboard initialized via direct Meta SDK workflow strategy.");
    
    // Wait until supabaseClient window initialization completes
    const checkClient = setInterval(async () => {
        const supabase = window.supabaseClient;
        if (supabase) {
            clearInterval(checkClient);
            
            // Get current active logged-in user profile (Mohamed Abdhaal session checking)
            const { data: { user }, error } = await supabase.auth.getUser();

            const userEmailField = document.getElementById("user-email");
            if (userEmailField) {
                if (user) {
                    userEmailField.innerText = "Email: " + user.email;
                } else {
                    userEmailField.innerText = "Developer Mode Active (Sandbox Session)";
                }
            }
            console.log("Active profile status window verified live.");
        }
    }, 100);
}

// Global Window Function to automatically save captured Meta tokens into Supabase DB
window.saveMetaTokensToDB = async function(accessToken, fbUserId) {
    const supabase = window.supabaseClient;
    if (!supabase) {
        alert("Supabase Client client loading error!");
        return;
    }

    // Get current active user id context from session matrix
    const { data: { user } } = await supabase.auth.getUser();
    
    // Developer account handling bypass fallback rule
    let currentUserId = user ? user.id : null;

    if (!currentUserId) {
        console.log("No active user session found, fetching temporary profile mapping...");
        // Fallback trace to pull first valid user id from profiles table if needed
        const { data: profileData } = await supabase.from('profiles').select('id').limit(1).single();
        if (profileData) {
            currentUserId = profileData.id;
        }
    }

    if (!currentUserId) {
        alert("Error: No profiles found in DB. Please make sure user exists in profiles table first!");
        return;
    }

    console.log("Inserting tokens mapping for User ID:", currentUserId);

    // Direct automated insert/upsert into meta_tokens secure schema 
    const { error } = await supabase
        .from('meta_tokens')
        .insert([
            { 
                user_id: currentUserId, 
                facebook_user_id: fbUserId, 
                page_access_token: accessToken 
            }
        ]);

    if (error) {
        console.error("Database insert error details:", error.message);
        alert("Token storage error: " + error.message);
    } else {
        alert("Boom! 🔥 Meta Access Token completely captured and secured in your Supabase DB table!");
        // Update UI state screen reload
        window.location.reload();
    }
}

// User logout processing feature configuration triggers
async function logout() {
    const supabase = window.supabaseClient;
    if (supabase) {
        await supabase.auth.signOut();
    }
    alert("Logged out successfully!");
    window.location.href = "index.html";
}

// Initialize execution loop on DOM ready
window.addEventListener("DOMContentLoaded", () => {
    initDashboard();
});
