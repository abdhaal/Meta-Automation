// js/app.js

// Facebook Login
async function facebookLogin() {
  // Function kulla variable fetch pannunga inside call trigger
  const supabase = window.supabaseClient; 
  
  if (!supabase) {
    alert("Supabase client is not initialized yet!");
    return;
  }

  const { error } = await supabase.auth.signInWithOAuth({
    provider: "facebook",
    options: {
      redirectTo: "https://abdhaal.github.io/Meta-Automation/"
    }
  });

  if (error) {
    console.error(error);
    alert(error.message);
  }
}

// Check user logic
async function checkUser() {
    const supabase = window.supabaseClient;
    if (!supabase) return;

    const { data, error } = await supabase.auth.getUser();
    if (error) {
        console.log(error);
        return;
    }
    if (data.user) {
        console.log("Logged in user:", data.user);
        alert("Login Success\n\nName: " + (data.user.user_metadata.full_name || "") + "\nEmail: " + (data.user.email || ""));
    }
}

// HTML fully load aana piragu user ah check panna sollurom
window.addEventListener('DOMContentLoaded', () => {
    checkUser();
});
