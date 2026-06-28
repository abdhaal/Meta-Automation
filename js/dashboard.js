// js/dashboard.js

async function initDashboard() {
    console.log("Dashboard initialized with strict verification rules.");
    
    const checkClient = setInterval(async () => {
        const supabase = window.supabaseClient;
        if (supabase) {
            clearInterval(checkClient);
            const { data: { user } } = await supabase.auth.getUser();
            const userEmailField = document.getElementById("user-email");
            if (userEmailField && user) {
                userEmailField.innerText = "Active User: " + user.email;
            }
        }
    }, 100);
}

window.saveMetaTokensToDB = async function(accessToken, fbUserId) {
    const supabase = window.supabaseClient;
    if (!supabase) return;

    // Step 1: செஷன்ல இருந்து கரெக்டான Real User ID-யை மட்டும் எடுக்குறோம்
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
        alert("Security Error: No authenticated user session found. Cannot save token safely!");
        return;
    }

    console.log("Saving token for authenticated user:", user.id);

    // Step 2: User ID-யோட டோக்கனை செக்யூரா இன்செர்ட் பண்றோம் (டேட்டாபேஸ் இப்போ அலவ் பண்ணும்!)
    const { error } = await supabase
        .from('meta_tokens')
        .insert([
            { 
                user_id: user.id, // Linked safely to auth.users!
                facebook_user_id: fbUserId, 
                page_access_token: accessToken 
            }
        ]);

    if (error) {
        console.error("DB Save Error:", error.message);
        alert("Storage error: " + error.message);
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
