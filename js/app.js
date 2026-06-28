// js/app.js

// Facebook Login Function
async function facebookLogin() {
    const supabase = window.supabaseClient;
    if (!supabase) return;

    const { error } = await supabase.auth.signInWithOAuth({
        provider: "facebook",
        options: {
            redirectTo: "https://abdhaal.github.io/Meta-Automation/",
            // Error varama iruka basic login scopes mattum thaan inga kuduthurukom
            scopes: "public_profile,email"
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
            redirectTo: "https://abdhaal.github.io/Meta-Automation/",
            // Rendu login-kum basic scopes set panniyachu
            scopes: "public_profile,email"
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
        // Direct-ah dashboard-ku poga veykum
        window.location.href = "dashboard.html"; 
    }
}

// Check status on page load
window.addEventListener('DOMContentLoaded', () => {
    checkUser();
});
