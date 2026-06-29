// js/automation.js - Ultimate Crash Proof Fix

// 1. உங்க உண்மையான Supabase URL & Anon Key-ஐ இங்கே போடுங்க bro
const SUPABASE_URL = "https://jrjigvhzkicmgketrmbr.supabase.co"; 
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impyamlndmh6a2ljbWdrZXRybWJyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI1NzYyODEsImV4cCI6MjA5ODE1MjI4MX0.4FHwDGywcybt_tu52Dv5e2YEgCN3uKbKI0l844RA3Og";

let supabase;
try {
    // CDN வழியா வர்ற சுபாபேஸ் கிளைன்ட்டை உருவாக்குறோம் bro
    supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
} catch (e) {
    console.error("Supabase Initialization Failed:", e);
}

// --- உங்க ஒரிஜினல் கமெண்ட் ஆட்டோமேஷன் பங்க்ஷன் ---
function saveAutomation(){
    const postid = document.getElementById("postid").value;
    const message = document.getElementById("message").value;
    const status = document.getElementById("status").checked;

    localStorage.setItem("postid", postid);
    localStorage.setItem("message", message);
    localStorage.setItem("status", status);

    alert("Settings Saved");
}

// --- Messenger Bot & WhatsApp செட்டிங்ஸ் சேவ் பங்க்ஷன் ---
window.saveBotSettings = async function() {
    console.log("Save Button Clicked!"); // பிரௌசர் கான்சோல்ல செக் பண்ண bro
    
    // HTML எலிமெண்ட்கள் இருக்கான்னு செக் பண்றோம்
    const replyTextEl = document.getElementById('replyText');
    const whatsappUrlEl = document.getElementById('whatsappUrl');
    const statusMsg = document.getElementById('botStatusMessage');

    if (!replyTextEl || !whatsappUrlEl) {
        alert("❌ Error: HTML input fields ('replyText' or 'whatsappUrl') are missing in html file!");
        return;
    }

    const replyText = replyTextEl.value;
    const whatsappUrl = whatsappUrlEl.value;

    if (statusMsg) {
        statusMsg.innerText = "⏳ Synching with Supabase...";
        statusMsg.style.color = "orange";
    }

    if (!supabase) {
        alert("❌ Supabase SDK not loaded properly! Check html script tag.");
        return;
    }

    try {
        // சுபாபேஸ் 'bot_config' டேபிளில் டேட்டாவை அப்லோட் பண்றோம் bro
        const { error } = await supabase
            .from('bot_config')
            .upsert({ 
                id: 1, 
                reply_text: replyText, 
                whatsapp_url: whatsappUrl 
            });

        if (error) {
            console.error("Supabase Database Error:", error);
            if (statusMsg) statusMsg.innerText = "❌ Database Error: " + error.message;
            alert("❌ Database Refused: " + error.message);
        } else {
            if (statusMsg) statusMsg.innerText = "⚡ Settings synced successfully with Facebook Bot! 🔥";
            if (statusMsg) statusMsg.style.color = "green";
            alert("✅ Bot Settings Saved Successfully!");
        }
    } catch (catchErr) {
        console.error("Crash Error caught:", catchErr);
        alert("❌ Crash Error: " + catchErr.message);
    }
}

// பக்கத்தை திறந்தவுடன் டேட்டாபேஸ்ல இருக்குற பழைய மெசேஜை லோடு செய்ய
document.addEventListener('DOMContentLoaded', async () => {
    const checkSupabase = setInterval(async () => {
        if (supabase) {
            clearInterval(checkSupabase);
            const replyTextInput = document.getElementById('replyText');
            const whatsappUrlInput = document.getElementById('whatsappUrl');
            
            if (!replyTextInput || !whatsappUrlInput) return;

            try {
                const { data, error } = await supabase
                    .from('bot_config')
                    .select('*')
                    .eq('id', 1)
                    .single();

                if (data) {
                    replyTextInput.value = data.reply_text || '';
                    whatsappUrlInput.value = data.whatsapp_url || '';
                }
            } catch (err) {
                console.error("Error loading settings:", err);
            }
        }
    }, 100);
});
