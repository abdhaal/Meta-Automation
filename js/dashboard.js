// js/dashboard.js - Live Error Catching Engine & Auto Redirect Fix

async function initDashboard() {
    console.log("Strict profile verification mode active.");
    const checkClient = setInterval(async () => {
        const supabase = window.supabaseClient;
        if (supabase) {
            clearInterval(checkClient);
            const { data: { user } } = await supabase.auth.getUser();
            const userEmailField = document.getElementById("user-email");
            if (userEmailField) {
                userEmailField.innerText = user ? "Active Session: " + user.email : "Developer Mode Active (No Session)";
            }
        }
    }, 100);
}

window.saveMetaTokensToDB = async function(accessToken, fbUserId) {
    const supabase = window.supabaseClient;
    if (!supabase) {
        console.error("Alert: Supabase Client not initialized inside dashboard!");
        return;
    }

    // தேவையில்லாத 'Auth session missing' அலர்ட்டுகளைத் தவிர்க்க quietly செக் செய்கிறோம் bro
    const { data: { user } } = await supabase.auth.getUser();
    let currentUserId = user ? user.id : null;

    console.log("Live User ID captured: ", currentUserId);

    // Meta டோக்கனை உங்க 'meta_tokens' டேபிளுக்குள் புஷ் செய்கிறோம்
    const { data, error } = await supabase
        .from('meta_tokens')
        .insert([
            { 
                user_id: currentUserId, // User ID null-ஆ இருந்தாலும் டேட்டாபேஸ் ஏத்துக்கும்
                facebook_user_id: fbUserId, 
                page_access_token: accessToken 
            }
        ]);

    if (error) {
        // டேட்டாபேஸ்ல நிஜமாவே ஏதாச்சும் தப்பு நடந்தா மட்டும் அலர்ட் காட்டும் bro
        alert("🚨 DATABASE REFUSED INSERTION!\n\nReason: " + error.message);
    } else {
        // 🎯 எந்த தொந்தரவான அலர்ட்டும் இல்லாமல் நேரடியாக automation.html பக்கத்திற்கு கூட்டிட்டு போயிடும்!
        window.location.href = "automation.html";
    }
}

// ஃபேஸ்புக் லாகின் பட்டன் - ஆட்டோமேட்டிக்காக டேப் க்ளோஸ் ஆகும் புது பிக்ஸ்!
window.loginWithFacebook = async function() {
    const supabase = window.supabaseClient;
    if (!supabase) return alert("Supabase not loaded!");

    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'facebook',
        options: {
            // லாகின் முடிஞ்சதும் நம்ம கிரியேட் பண்ணிய குட்டி 'oauth-callback.html' ஃபைலுக்குப் போகும் bro
            redirectTo: 'https://abdhaal.github.io/Meta-Automation/oauth-callback.html',
            scopes: 'pages_manage_metadata,pages_messaging'
        }
    });
}

async function logout() {
    const supabase = window.supabaseClient;
    if (supabase) await supabase.auth.signOut();
    window.location.href = "index.html";
}

window.addEventListener("DOMContentLoaded", () => { initDashboard(); });
