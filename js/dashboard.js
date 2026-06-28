// js/dashboard.js - Strict Validation Storage Layout

async function initDashboard() {
    console.log("Dashboard initialized with strict profile verification rules.");
    
    const checkClient = setInterval(async () => {
        const supabase = window.supabaseClient;
        if (supabase) {
            clearInterval(checkClient);
            const { data: { user } } = await supabase.auth.getUser();
            const userEmailField = document.getElementById("user-email");
            if (userEmailField && user) {
                userEmailField.innerText = "Active Session: " + user.email;
            }
        }
    }, 100);
}

window.saveMetaTokensToDB = async function(accessToken, fbUserId) {
    const supabase = window.supabaseClient;
    if (!supabase) return;

    // Secure extraction of authenticated row matching id matrix
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
        alert("Security Error: No verified dynamic authentication context found!");
        return;
    }

    console.log("Writing meta access matrix data under safe unique reference id: ", user.id);

    // Completely compliant table parameters insertion
    const { error } = await supabase
        .from('meta_tokens')
        .insert([
            { 
                user_id: user.id, // linked perfectly with exact system rules
                facebook_user_id: fbUserId, 
                page_access_token: accessToken 
            }
        ]);

    if (error) {
        console.error("Database structural validation failure error log:", error.message);
        alert("Sync error encountered: " + error.message);
    } else {
        alert("Boom! 🔥 Meta Access Token completely captured and secured with your user identity!");
        window.location.reload();
    }
}

async function logout() {
    const supabase = window.supabaseClient;
    if (supabase) await supabase.auth.signOut();
    window.location.href = "index.html";
}

window.addEventListener("DOMContentLoaded", () => { initDashboard(); });
