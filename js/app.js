const supabase = window.supabaseClient;

// Facebook Login
async function facebookLogin() {
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "facebook"
    });

    if (error) {
        console.error(error);
        alert("Facebook Login Failed: " + error.message);
    }
}

// Instagram Login
// Instagram Business login also starts through Facebook OAuth
async function instagramLogin() {
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "facebook"
    });

    if (error) {
        console.error(error);
        alert("Instagram Login Failed: " + error.message);
    }
}

// Check logged-in user after redirect
async function checkUser() {
    const { data, error } = await supabase.auth.getUser();

    if (error) {
        console.log(error);
        return;
    }

    if (data.user) {
        console.log("Logged in user:", data.user);

        alert(
            "Login Success\n\n" +
            "Name: " + (data.user.user_metadata.full_name || "") +
            "\nEmail: " + (data.user.email || "")
        );
    }
}

checkUser();
