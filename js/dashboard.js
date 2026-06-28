// js/dashboard.js

// Page load aagum pothu user verification
async function initDashboard() {
    // Wait until supabaseClient window initialization completes
    const checkClient = setInterval(async () => {
        const supabase = window.supabaseClient;
        if (supabase) {
            clearInterval(checkClient);
            
            // Get current active logged-in user session context data
            const { data: { user }, error } = await supabase.auth.getUser();

            if (error || !user) {
                console.log("No active user session found, redirecting to login...");
                window.location.href = "index.html";
                return;
            }

            // Successfully fetched user data mapped dashboard elements hook layout logic
            document.getElementById("user-name").innerText = user.user_metadata.full_name || "User";
            document.getElementById("user-email").innerText = user.email || "N/A";
            console.log("Active user profile verified dashboard view live.");
        }
    }, 100);
}

// User logout processing feature configuration triggers
async function logout() {
    const supabase = window.supabaseClient;
    if (!supabase) return;

    const { error } = await supabase.auth.signOut();
    if (error) {
        alert("Logout error: " + error.message);
    } else {
        alert("Logged out successfully!");
        window.location.href = "index.html";
    }
}

// Initialize on document ready script flow execution
window.addEventListener("DOMContentLoaded", () => {
    initDashboard();
});

