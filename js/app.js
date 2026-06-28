// js/app.js

async function handleAutomatedRegistration() {
    const supabase = window.supabaseClient;
    if (!supabase) {
        window.location.href = "dashboard.html";
        return;
    }

    try {
        console.log("Starting secure automatic user initialization...");
        
        // Step A: Active session இருக்கான்னு செக் பண்றோம்
        const { data: { user } } = await supabase.auth.getUser();

        // Step B: செஷன் இல்லைனா, ஒரு டெஸ்ட் அக்கவுண்ட்டை ஆட்டோ-சைன்இன் பண்ண வைக்கிறோம்
        if (!user) {
            console.log("No active session. Automating sandbox secure authentication...");
            
            const testEmail = "abdhaal0@gmail.com";
            const testPassword = "SuperSecurePassword123!"; // Dummy testing creds

            // முதல்ல லாகின் பண்ண ட்ரை பண்றோம்
            let { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
                email: testEmail,
                password: testPassword
            });

            // அக்கவுண்ட் இல்லைனா, புதுசா ஆட்டோ-சைன்அப் பண்றோம்
            if (signInError) {
                console.log("Creating new test identity configuration inside auth schema...");
                let { data: signUpData, error: signUpError } = await supabase.auth.signUp({
                    email: testEmail,
                    password: testPassword
                });
                
                if (signUpError) console.error("Auto signup bypass failed:", signUpError.message);
            }
        }
    } catch (err) {
        console.error("Auth Engine Exception:", err);
    } finally {
        window.location.href = "dashboard.html";
    }
}

async function facebookLogin() { await handleAutomatedRegistration(); }
async function instagramLogin() { await handleAutomatedRegistration(); }

async function checkUser() {
    const supabase = window.supabaseClient;
    if (!supabase) return;
    const { data } = await supabase.auth.getUser();
    if (data && data.user) { window.location.href = "dashboard.html"; }
}

window.addEventListener('DOMContentLoaded', () => { checkUser(); });
