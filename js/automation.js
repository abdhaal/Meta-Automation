// js/automation.js - Ultimate Crash Proof Fix

const SUPABASE_URL = "https://jrjigvhzkicmgketrmbr.supabase.co"; 
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impyamlndmh6a2ljbWdrZXRybWJyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI1NzYyODEsImV4cCI6MjA5ODE1MjI4MX0.4FHwDGywcybt_tu52Dv5e2YEgCN3uKbKI0l844RA3Og"; // 👈 இங்க மாத்துங்க bro

let supabaseClientInstance;

try {
    if (window.supabase && window.supabase.createClient) {
        supabaseClientInstance = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    } else {
        alert("❌ Supabase SDK library not loaded correctly! Check script tag in HTML.");
    }
} catch (e) {
    alert("❌ Error initializing Supabase: " + e.message);
}

// பழைய கமெண்ட் செட்டிங்ஸ் பங்க்ஷன்
window.saveAutomation = function(){
    const postid = document.getElementById("postid").value;
    const message = document.getElementById("message").value;
    const status = document.getElementById("status").checked;

    localStorage.setItem("postid", postid);
    localStorage.setItem("message", message);
    localStorage.setItem("status", status);

    alert("Settings Saved");
}

// 🎯 புது சேவ் பாட் செட்டிங்ஸ் பங்க்ஷன்
window.saveBotSettings = async function() {
    // பட்டன் கிளிக் ஆன உடனே இந்த மெசேஜ் ஸ்க்ரீன்ல கண்டிப்பா வரும் bro!
    alert("Save Button Clicked! Checking database connectivity..."); 

    const replyText = document.getElementById('replyText').value;
    const whatsappUrl = document.getElementById('whatsappUrl').value;
    const statusMsg = document.getElementById('botStatusMessage');

    if (statusMsg) statusMsg.innerText = "⏳ Saving to Supabase Database...";

    if (!supabaseClientInstance) {
        alert("❌ Supabase is not configured properly. Cannot save!");
        return;
    }

    try {
        const { error } = await supabaseClientInstance
            .from('bot_config')
            .upsert({ 
                id: 1, 
                reply_text: replyText, 
                whatsapp_url: whatsappUrl 
            });

        if (error) {
            if (statusMsg) statusMsg.innerText = "❌ Database Refused Insert!";
            alert("🚨 DATABASE ERROR: " + error.message);
        } else {
            if (statusMsg) {
                statusMsg.innerText = "⚡ Settings synced successfully with Facebook Bot! 🔥";
                statusMsg.style.color = "green";
            }
            alert("✅ Bot Settings Saved Successfully in Supabase!"); 
        }
    } catch (catchErr) {
        alert("❌ Code Crashed: " + catchErr.message);
    }
}

// பழைய டேட்டாவை லோடு பண்ண
document.addEventListener('DOMContentLoaded', async () => {
    setTimeout(async () => {
        if (supabaseClientInstance) {
            try {
                const { data } = await supabaseClientInstance
                    .from('bot_config')
                    .select('*')
                    .eq('id', 1)
                    .single();

                if (data) {
                    document.getElementById('replyText').value = data.reply_text || '';
                    document.getElementById('whatsappUrl').value = data.whatsapp_url || '';
                }
            } catch (err) {
                console.log("No default settings found yet.");
            }
        }
    }, 500);
});
