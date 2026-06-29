// js/automation.js - Live Comment & Messenger Bot Engine

const SUPABASE_URL = "https://jrjigvhzkicmgketrmbr.supabase.co"; 
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impyamlndmh6a2ljbWdrZXRybWJyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI1NzYyODEsImV4cCI6MjA5ODE1MjI4MX0.4FHwDGywcybt_tu52Dv5e2YEgCN3uKbKI0l844RA3Og"; // 👈 உங்க ANON KEY-ஐ போடுங்க bro

let supabaseClientInstance;

try {
    if (window.supabase && window.supabase.createClient) {
        supabaseClientInstance = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    } else {
        alert("❌ Supabase SDK library not loaded correctly! Check HTML.");
    }
} catch (e) {
    alert("❌ Error initializing Supabase: " + e.message);
}

// 🎯 1. புது கமெண்ட் ஆட்டோமேஷன் சேவ் பங்க்ஷன் (Supabase உடன்)
window.saveAutomation = async function() {
    alert("Saving Comment DM Settings...");

    const postId = document.getElementById("postid").value;
    const message = document.getElementById("message").value;
    const status = document.getElementById("status").checked;

    if (!supabaseClientInstance) {
        alert("❌ Supabase is not configured properly. Cannot save!");
        return;
    }

    try {
        const { error } = await supabaseClientInstance
            .from('comment_config')
            .upsert({ 
                id: 1, 
                post_id: postId, 
                dm_message: message, 
                is_enabled: status 
            });

        if (error) {
            alert("🚨 DATABASE ERROR: " + error.message);
        } else {
            alert("✅ Comment DM Settings Saved in Supabase! 🔥"); 
        }
    } catch (catchErr) {
        alert("❌ Code Crashed: " + catchErr.message);
    }
}

// 🎯 2. மெசஞ்சர் பாட் & வாட்ஸ்அப் செட்டிங்ஸ் சேவ் பங்க்ஷன்
window.saveBotSettings = async function() {
    alert("Saving Messenger Bot Settings..."); 

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

// பக்கத்தை திறந்தவுடன் 'bot_config' மற்றும் 'comment_config' இரண்டையும் லோடு செய்ய
document.addEventListener('DOMContentLoaded', async () => {
    setTimeout(async () => {
        if (supabaseClientInstance) {
            try {
                // லோடு பாட் செட்டிங்ஸ்
                const { data: botData } = await supabaseClientInstance
                    .from('bot_config').select('*').eq('id', 1).single();
                if (botData) {
                    document.getElementById('replyText').value = botData.reply_text || '';
                    document.getElementById('whatsappUrl').value = botData.whatsapp_url || '';
                }

                // லோடு கமெண்ட் செட்டிங்ஸ்
                const { data: commentData } = await supabaseClientInstance
                    .from('comment_config').select('*').eq('id', 1).single();
                if (commentData) {
                    document.getElementById('postid').value = commentData.post_id || '';
                    document.getElementById('message').value = commentData.dm_message || '';
                    document.getElementById('status').checked = commentData.is_enabled ?? true;
                }
            } catch (err) {
                console.log("No default settings found yet.");
            }
        }
    }, 500);
});
