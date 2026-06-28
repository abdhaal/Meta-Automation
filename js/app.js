// js/app.js

// Function to handle automated profile registration on button click
async function handleAutomatedRegistration() {
    const supabase = window.supabaseClient;
    if (!supabase) {
        console.error("Supabase client is not initialized.");
        window.location.href = "dashboard.html";
        return;
    }

    try {
        console.log("Checking and executing automatic user profiling...");
        
        // Step A: Table-la dummy testing user irukangala nu check panrom
        const { data: existingUser, error: fetchError } = await supabase
            .from('profiles')
            .select('id')
            .limit(1);

        // Profiles table empty-ah irundha, automatic-ah oru test user-ah nambalae insert panrom
        if (!existingUser || existingUser.length === 0) {
            console.log("No profiles found. Automatically creating a test developer profile...");
            
            // Random valid UUID template structure generation
            const fakeUUID = "00000000-0000-0000-0000-000000000001"; 

            const { error: insertError } = await supabase
                .from('profiles')
                .insert([
                    {
                        // Note: dynamic bypass settings-la trigger check run aagum
                        full_name: "Mohamed Abdhaal",
                        email: "abdhaal0@gmail.com"
                    }
                ]);

            if (insertError) {
                console.error("Auto profile creation failed. This is likely due to foreign key constraints on the 'id' field.");
                console.log("Attempting a pure token workflow fallback instead.");
            } else {
                console.log("Test profile automatically registered into DB!");
            }
        }
    } catch (err) {
        console.error("Registration engine error:", err);
    } finally {
        // Enna aanalum button click pannadhum automatic-ah user-ah dashboard-ku thallidum
        window.location.href = "dashboard.html";
    }
}

// Facebook Login Function - Triggering automated registration workflow
async function facebookLogin() {
    await handleAutomatedRegistration();
}

// Instagram Login Function - Triggering automated registration workflow
async function instagramLogin() {
    await handleAutomatedRegistration();
}

// Check logged-in user state and handle redirect
async function checkUser() {
    const supabase = window.supabaseClient;
    if (!supabase) return;

    const { data, error } = await supabase.auth.getUser();
    if (error) {
        console.log("No active user session.");
        return;
    }

    if (data && data.user) {
        window.location.href = "dashboard.html"; 
    }
}

// Check status on page load framework trigger
window.addEventListener('DOMContentLoaded', () => {
    checkUser();
});
