// js/automation.js - Full Correct Code

// 1. உங்க ஒரிஜினல் Supabase URL & Anon Key-ஐ இங்கே போடுங்க bro
const SUPABASE_URL = "https://jrjigvhzkicmgketrmbr.supabase.co"; 
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impyamlndmh6a2ljbWdrZXRybWJyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI1NzYyODEsImV4cCI6MjA5ODE1MjI4MX0.4FHwDGywcybt_tu52Dv5e2YEgCN3uKbKI0l844RA3Og";

// சுபாபேஸ் கிளைன்ட்டை உருவாக்குறோம்
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

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

// --- புதுசு: Messenger Bot & WhatsApp செட்டிங்ஸை சேவ் பண்ற மாஸ் பங்க்ஷன் ---
window.saveBotSettings = async function() {
    const replyText = document.getElementById('replyText').value;
    const whatsappUrl = document.getElementById('whatsappUrl').value;
    const statusMsg = document.getElementById('botStatusMessage');

    if (statusMsg) {
        statusMsg.innerText = "⏳ Saving to Supabase database...";
        statusMsg.style.color = "orange";
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
            console.error("Supabase Error:", error);
            if (statusMsg) statusMsg.innerText = "❌ Database Error: " + error.message;
            alert("❌ Error saving to Supabase: " + error.message);
        } else {
            if (statusMsg) statusMsg.innerText = "⚡ Settings synced successfully with Facebook Bot! 🔥";
            if (statusMsg) statusMsg.style.color = "green";
            alert("✅ Bot Settings Saved Successfully!"); // இப்போ கண்டிப்பா இந்த அலர்ட் வரும் bro!
        }
    } catch (catchErr) {
        console.error("Catch Error:", catchErr);
        alert("❌ Crash Error: " + catchErr.message);
    }
}

// பக்கத்தை திறந்தவுடன் டேட்டாபேஸ்ல இருக்குற பழைய மெசேஜை பாக்ஸ்க்குள்ள காட்ட
document.addEventListener('DOMContentLoaded', async () => {
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
        console.error("Error loading automatic settings:", err);
    }
});
