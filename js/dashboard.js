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
        alert("Alert: Supabase Client not initialized inside dashboard!");
        return;
    }

    // Step 1: Check actual current session live
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError) {
        alert("Auth Session Error: " + authError.message);
    }

    let currentUserId = user ? user.id : null;
    alert("Live Step 1: Active User ID discovered -> " + currentUserId);

    // Step 2: Try to push data and trap the exact database refusal reason
    const { data, error } = await supabase
        .from('meta_tokens')
        .insert([
            { 
                user_id: currentUserId, 
                facebook_user_id: fbUserId, 
                page_access_token: accessToken 
            }
        ]);

    if (error) {
        // Intha alert thaan namba app-oda core block-ah ippo pottu udaika poguthu!
        alert("🚨 DATABASE REFUSED INSERTION!\n\nReason: " + error.message + "\nDetails: " + error.details + "\nCode: " + error.code);
    } else {
        alert("Boom! 🔥 Meta Access Token completely captured and secured!");
        
        // இங்கேயும் பாதுகாப்பிற்காக automation.html பக்கத்திற்கே ரீடைரக்ட் வைக்கிறோம் bro!
        window.location.href = "automation.html";
    }
}

// 🚀 ஃபேஸ்புக் லாகின் பட்டன் - ஆட்டோமேட்டிக்காக டேப் க்ளோஸ் ஆகும் புது பிக்ஸ்!
window.loginWithFacebook = async function() {
    const supabase = window.supabaseClient;
    if (!supabase) return alert("Supabase not loaded!");

    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'facebook',
        options: {
            // 🎯 இங்கதான் நம்ம புது `oauth-callback.html` லிங்க்கை குடுத்திருக்கோம் bro!
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
