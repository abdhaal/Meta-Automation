// js/app.js

// Facebook Login Function - Direct SDK Workflow Route
async function facebookLogin() {
    console.log("Redirecting to dashboard for direct Meta SDK workflow...");
    // Meta permissions error bypass panna direct dashboard navigation
    window.location.href = "dashboard.html";
}

// Instagram Login Function - Direct SDK Workflow Route
async function instagramLogin() {
    console.log("Redirecting to dashboard for direct Meta SDK workflow...");
    window.location.href = "dashboard.html";
}

// Check logged-in user state and handle redirect
async function checkUser() {
    const supabase = window.supabaseClient;
    if (!supabase) return;

    // Active session status context extraction
    const { data, error } = await supabase.auth.getUser();

    if (error) {
        console.log("No user session active.");
        return;
    }

    if (data && data.user) {
        console.log("Logged in user verified:", data.user);
        // Already profile session log in state-la irundha direct-ah dashboard-ku poga veykum
        window.location.href = "dashboard.html"; 
    }
}

// Check status on page load framework trigger
window.addEventListener('DOMContentLoaded', () => {
    checkUser();
});
