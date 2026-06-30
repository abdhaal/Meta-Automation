/**
 * IMA Automation - Login & Sign Up Flow with Supabase Auth
 * 100% Working with your exact Input & Eye IDs!
 */

// 1. YOUR SUPABASE CONFIGURATION (உங்க உண்மையான Supabase URL & Key-ஐ இங்க போடுங்க bro)
const SUPABASE_URL = "https://jrjigvhzkicmgketrmbr.supabase.co"; 
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impyamlndmh6a2ljbWdrZXRybWJyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI1NzYyODEsImV4cCI6MjA5ODE1MjI4MX0.4FHwDGywcybt_tu52Dv5e2YEgCN3uKbKI0l844RA3Og";

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

document.addEventListener("DOMContentLoaded", () => {
    // உங்க HTML-ல் இருக்குற அதே ID-க்களை அப்படியே எடுக்கிறோம்
    const password = document.getElementById("password");
    const toggle = document.getElementById("togglePassword");
    
    const authForm = document.getElementById("authForm");
    const emailField = document.getElementById("email");
    const authHeading = document.getElementById("authHeading");
    const submitBtn = document.getElementById("submitBtn");
    const toggleTextParagraph = document.getElementById("toggleTextParagraph");
    const forgotLink = document.getElementById("forgotLink");

    let isSignUpMode = false; // ஆரம்பத்தில் Sign In மோடு

    // 🔑 1. PASSWORD UNHIDE TRIGGER (உங்க வொர்க்கிங் கோடு அப்படியே பாதுகாக்கப்பட்டுள்ளது bro)
    if (toggle && password) {
        toggle.addEventListener("click", () => {
            if (password.type === "password") {
                password.type = "text";
                toggle.classList.remove("fa-eye-slash");
                toggle.classList.add("fa-eye");
            } else {
                password.type = "password";
                toggle.classList.remove("fa-eye");
                toggle.classList.add("fa-eye-slash");
            }
        });
    }

    // 📝 2. SIGN UP / SIGN IN INTERFACE TOGGLE
    if (toggleTextParagraph) {
        toggleTextParagraph.addEventListener('click', (e) => {
            if (e.target && e.target.id === 'toggleAuthMode') {
                e.preventDefault();
                isSignUpMode = !isSignUpMode;

                if (isSignUpMode) {
                    authHeading.innerText = "Create your account to get started with IMA Automation!";
                    submitBtn.innerHTML = `Sign Up <i class="fa-solid fa-arrow-right"></i>`;
                    toggleTextParagraph.innerHTML = `Already have an account? <a href="#" id="toggleAuthMode">Sign In</a>`;
                    if (forgotLink) forgotLink.style.display = 'none';
                } else {
                    authHeading.innerText = "Welcome back! Please Sign in to Your Account.";
                    submitBtn.innerHTML = `Sign In <i class="fa-solid fa-arrow-right"></i>`;
                    toggleTextParagraph.innerHTML = `Don't have an account? <a href="#" id="toggleAuthMode">Sign Up</a>`;
                    if (forgotLink) forgotLink.style.display = 'block';
                }
            }
        });
    }

    // 🗄️ 3. SUPABASE AUTH REAL-TIME STORAGE (டேட்டாபேஸ்ல சேவ் பண்ணி லாகின் செய்யும் பகுதி)
    if (authForm) {
        authForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const emailInput = emailField.value.trim();
            const passwordInput = password.value.trim();

            submitBtn.innerText = "Processing...";
            submitBtn.disabled = true;

            if (isSignUpMode) {
                // ==========================================
                // 📝 SIGN UP FLOW (Supabase Auth-ல் புது யூசரை சேவ் செய்தல்)
                // ==========================================
                const { data, error } = await supabase.auth.signUp({
                    email: emailInput,
                    password: passwordInput
                });

                if (error) {
                    alert("Sign Up Error: " + error.message);
                } else {
                    alert("Sign Up Successful! 👍 இப்போ தானா லாகின் மோடுக்கு மாறும், அதே மெயில் வச்சு லாகின் பண்ணுங்க bro!");
                    
                    // சைன் அப் முடிஞ்சதும் லாகின் மோடுக்கு மாத்துறோம்
                    isSignUpMode = false;
                    authHeading.innerText = "Welcome back! Please Sign in to Your Account.";
                    submitBtn.innerHTML = `Sign In <i class="fa-solid fa-arrow-right"></i>`;
                    toggleTextParagraph.innerHTML = `Don't have an account? <a href="#" id="toggleAuthMode">Sign Up</a>`;
                    if (forgotLink) forgotLink.style.display = 'block';
                    password.value = ""; 
                }
            } else {
                // ==========================================
                // 🔑 SIGN IN FLOW (Supabase Auth-ல் செக் பண்ணி லாகின் செய்தல்)
                // ==========================================
                const { data, error } = await supabase.auth.signInWithPassword({
                    email: emailInput,
                    password: passwordInput
                });

                if (error) {
                    alert("Login Failed: " + error.message + " \n\n(அக்கவுண்ட் இல்லைனா முதல்ல கீழே இருக்குற 'Sign Up' கிளிக் பண்ணுங்க bro!)");
                } else {
                    alert("Login Success! 🎉");
                    window.location.href = 'automation.html'; // வெற்றிகரமாக லாகின் ஆனதும் டேஷ்போர்டுக்கு போகும்
                }
            }

            // பட்டன் டெக்ஸ்ட்டை பழையபடி மாற்றுதல்
            if (!isSignUpMode && submitBtn) {
                submitBtn.innerHTML = `Sign In <i class="fa-solid fa-arrow-right"></i>`;
            } else if (submitBtn) {
                submitBtn.innerHTML = `Sign Up <i class="fa-solid fa-arrow-right"></i>`;
            }
            submitBtn.disabled = false;
        });
    }
});
    // ==========================================================================
    // 🚀 5. SOCIAL BUTTONS REAL-TIME SUPABASE AUTH TRIGGER
    // ==========================================================================
    const googleBtn = document.querySelector('.social.google');
    const facebookBtn = document.querySelector('.social.facebook');
    const appleBtn = document.querySelector('.social.apple');

    // A. Login with Google
    if (googleBtn) {
        googleBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            console.log("Initiating Google OAuth...");
            
            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: window.location.origin + '/automation.html' // லாகின் ஆனதும் டேஷ்போர்டு போகும்
                }
            });

            if (error) {
                alert("Google Login Error: " + error.message + "\n(Note: Supabase Dashboard-ல் Google Provider-ஐ இன்னும் Enable செய்யவில்லை bro!)");
            }
        });
    }

    // B. Login with Facebook
    if (facebookBtn) {
        facebookBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            console.log("Initiating Facebook OAuth...");
            
            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: 'facebook',
                options: {
                    redirectTo: window.location.origin + '/automation.html'
                }
            });

            if (error) {
                alert("Facebook Login Error: " + error.message + "\n(Note: Supabase Dashboard-ல் Facebook Provider-ஐ Configure செய்ய வேண்டும் bro!)");
            }
        });
    }

    // C. Login with Apple
    if (appleBtn) {
        appleBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            console.log("Initiating Apple OAuth...");
            
            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: 'apple',
                options: {
                    redirectTo: window.location.origin + '/automation.html'
                }
            });

            if (error) {
                alert("Apple Login Error: " + error.message + "\n(Note: Apple Developer Keys தேவை bro!)");
            }
        });
    }
