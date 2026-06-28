// js/dashboard.js

async function initDashboard() {
    console.log("Dashboard initialized via direct Meta SDK workflow strategy.");
    
    const checkClient = setInterval(async () => {
        const supabase = window.supabaseClient;
        if (supabase) {
            clearInterval(checkClient);
            
            const { data: { user } } = await supabase.auth.getUser();
            const userEmailField = document.getElementById("user-email");
            if (userEmailField) {
                if (user) {
                    userEmailField.innerText = "Email: " + user.email;
                } else {
                    userEmailField.innerText = "Developer Mode Active (Sandbox Session)";
                }
            }
        }
    }, 100);
}

// Global Window Function to automatically save captured Meta tokens into Supabase DB
window.saveMetaTokensToDB = async function(accessToken, fbUserId) {
    const supabase = window.supabaseClient;
    if (!supabase) {
        alert("Supabase Client loading error!");
        return;
    }

    // Step 1: Active session checking
    const { data: { user } } = await supabase.auth.getUser();
    let currentUserId = user ? user.id : null;

    // Step 2: Session illana, profiles table-la automatic-ah irukura user-oda id-ya fetch panrom
    if (!currentUserId) {
        console.log("No active auth session, pulling auto-created profile ID...");
        const { data: profileData } = await supabase.from('profiles').select('id').limit(1);
        if (profileData && profileData.length > 0) {
            currentUserId = profileData[0].id;
        }
    }

    console.log("Executing final token insertion loop for User ID:", currentUserId);

    // Step 3: Directly saving token parameters to meta_tokens
    const { error } = await supabase
        .from('meta_tokens')
        .insert([
            { 
                user_id: currentUserId, // User ID valid-ah illanalum dynamic backend configuration bypass run aagum
                facebook_user_id: fbUserId, 
                page_access_token: accessToken 
            }
        ]);

    if (error) {
        console.error("Database insert error details:", error.message);
        alert("Token storage layout sync error: " + error.message);
    } else {
        alert("Boom! 🔥 Meta Access Token completely captured and secured in your Supabase DB table automatically!");
        window.location.reload();
    }
}

async function logout() {
    const supabase = window.supabaseClient;
    if (supabase) {
        await supabase.auth.signOut();
    }
    alert("Logged out successfully!");
    window.location.href = "index.html";
}

window.addEventListener("DOMContentLoaded", () => {
    initDashboard();
});

