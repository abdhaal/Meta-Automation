// 1. சுபாபேஸ் கனெக்ஷனை செட் பண்றோம் bro
// Replit-ல் இருக்கும் உங்க ஒரிஜினல் Supabase URL & Anon Key-ஐ இங்கே மாத்திக்கோங்க
const SUPABASE_URL = "https://jrjigvhzkicmgketrmbr.supabase.co"; 
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impyamlndmh6a2ljbWdrZXRybWJyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI1NzYyODEsImV4cCI6MjA5ODE";

// சுபாபேஸ் கிளைன்ட்டை உருவாக்குறோம் (html-ல் SDK சேர்த்திருக்கோம் bro)
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// --- உங்க ஒரிஜினல் கமெண்ட் ஆட்டோமேஷன் பங்க்ஷன் (அப்படியே இருக்கு bro) ---
function saveAutomation(){
    const postid = document.getElementById("postid").value;
    const message = document.getElementById("message").value;
    const status = document.getElementById("status").checked;

    localStorage.setItem("postid", postid);
    localStorage.setItem("message", message);
    localStorage.setItem("status", status);

    alert("Settings Saved");
}

// --- புதுசு: ஃபேஸ்புக் பாட் & வாட்ஸ்அப் லிங்க் செட்டிங்ஸ் லாஜிக் ---
document.addEventListener('DOMContentLoaded', () => {
    const replyTextInput = document.getElementById('replyText');
    const whatsappUrlInput = document.getElementById('whatsappUrl');
    const saveBtn = document.getElementById('saveBotSettingsBtn');
    const statusMsg = document.getElementById('botStatusMessage');

    // A. அட்மின் பேஜ் லோடானதும் சுபாபேஸ்ஸில் இருக்கும் தற்போதைய மெசேஜை பாக்ஸில் காட்ட
    async function loadBotSettings() {
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
            console.error("Error loading settings from Supabase:", err);
        }
    }

    // B. சேவ் பட்டன் அழுத்தும்போது சுபாபேஸ் 'bot_config' டேபிளில் சேவ் செய்ய
    if (saveBtn) {
        saveBtn.addEventListener('click', async () => {
            statusMsg.innerText = "Saving to database...";
            statusMsg.style.color = "#ffa500"; // Orange color for loading

            const { error } = await supabase
                .from('bot_config')
                .upsert({ 
                    id: 1, 
                    reply_text: replyTextInput.value, 
                    whatsapp_url: whatsappUrlInput.value 
                });

            if (error) {
                console.error("Error updating settings:", error);
                statusMsg.innerText = "❌ Error saving settings! Check Console.";
                statusMsg.style.color = "red";
            } else {
                statusMsg.innerText = "⚡ Settings synced successfully with Facebook Bot! 🔥";
                statusMsg.style.color = "green";
            }
        });
    }

    // பக்கத்தை திறந்தவுடன் டேட்டாவை லோடு செய்யும் பங்க்ஷனை ரன் பண்றோம்
    loadBotSettings();
});
              
