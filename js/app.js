// js/app.js

// Facebook Login Function
async function facebookLogin() {
    const supabase = window.supabaseClient;
    if (!supabase) return;

    const { error } = await supabase.auth.signInWithOAuth({
        provider: "facebook",
        options: {
            redirectTo: "https://abdhaal.github.io/Meta-Automation/"
        }
    });

    if (error) {
        console.error(error);
        alert("Facebook Login Error: " + error.message);
    }
}

// Instagram Login Function
async function instagramLogin() {
    const supabase = window.supabaseClient;
    if (!supabase) return;

    const { error } = await supabase.auth.signInWithOAuth({
        provider: "facebook",
        options: {
            redirectTo: "https://abdhaal.github.io/Meta-Automation/"
        }
    });

    if (error) {
        console.error(error);
        alert("Instagram Login Error: " + error.message);
    }
}

// Check logged-in user state and handle redirect
async function checkUser() {
    const supabase = window.supabaseClient;
    if (!supabase) return;

    const { data, error } = await supabase.auth.getUser();

    if (error) {
        console.log("No user session active.");
        return;
    }

    if (data && data.user) {
        console.log("Logged in user:", data.user);
        
        // Success alert kaatuna appram instant-ah automatic dashboard movement
        alert("Welcome " + (data.user.user_metadata.full_name || "User"));
        window.location.href = "dashboard.html"; 
    }
}

// Check status on page load
window.addEventListener('DOMContentLoaded', () => {
    checkUser();
});
