/**
 * IMA Automation - Login & Sign Up Flow with Supabase Auth (Fixed Version)
 */

// 1. YOUR SUPABASE CONFIGURATION (உங்க Supabase URL & Key-ஐ இங்க போடுங்க bro)
const SUPABASE_URL = "https://jrjigvhzkicmgketrmbr.supabase.co"; 
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impyamlndmh6a2ljbWdrZXRybWJyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI1NzYyODEsImV4cCI6MjA5ODE1MjI4MX0.4FHwDGywcybt_tu52Dv5e2YEgCN3uKbKI0l844RA3Og";

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const authForm = document.getElementById('authForm');
    const emailField = document.getElementById('emailField');
    const passwordField = document.getElementById('passwordField');
    const eyeToggleIcon = document.getElementById('eyeToggleIcon');
    const loginHeading = document.getElementById('loginHeading');
    const submitBtn = document.getElementById('submitBtn');
    const toggleTextParagraph = document.getElementById('toggleTextParagraph');
    const forgotLink = document.getElementById('forgotLink');

    let isSignUpMode = false; // ஆரம்பத்தில் Login மோடில் இருக்கும்

    // 2. PASSWORD UNHIDE FIX (கண் ஐகான் வேலை செய்ய)
    if (eyeToggleIcon && passwordField) {
        eyeToggleIcon.addEventListener('click', () => {
            if (passwordField.type === 'password') {
                passwordField.type = 'text';
                eyeToggleIcon.classList.remove('fa-eye-slash');
                eyeToggleIcon.classList.add('fa-eye');
            } else {
                passwordField.type = 'password';
                eyeToggleIcon.classList.remove('fa-eye');
                eyeToggleIcon.classList.add('fa-eye-slash');
            }
        });
    }

    // 3. SIGN UP / SIGN IN TOGGLE FIX (லிங்க் கிளிக் பண்ணா மோடு மாற)
    if (toggleTextParagraph) {
        toggleTextParagraph.addEventListener('click', (e) => {
            if (e.target && e.target.id === 'toggleAuthMode') {
                e.preventDefault();
                isSignUpMode = !isSignUpMode;

                if (isSignUpMode) {
                    loginHeading.innerText = "Create your account to get started with IMA Automation!";
                    submitBtn.innerHTML = `Sign Up <i class="fa-solid fa-arrow-right"></i>`;
                    toggleTextParagraph.innerHTML = `Already have an account? <a href="#" id="toggleAuthMode">Sign In</a>`;
                    if (forgotLink) forgotLink.style.display = 'none'; // சைன்-அப்பில் பார்ஜெட் பாஸ்வேர்ட் தேவையில்லை
                } else {
                    loginHeading.innerText = "Welcome back! Please Sign in to Your Account.";
                    submitBtn.innerHTML = `Sign In <i class="fa-solid fa-arrow-right"></i>`;
                    toggleTextParagraph.innerHTML = `Don't have an account? <a href="#" id="toggleAuthMode">Sign Up</a>`;
                    if (forgotLink) forgotLink.style.display = 'block';
                }
            }
        });
    }

    // 4. FORM SUBMISSION (Sign Up / Sign In Logic with Supabase Auth)
    if (authForm) {
        authForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const emailInput = emailField.value;
            const passwordInput = passwordField.value;

            submitBtn.innerText = "Processing...";
            submitBtn.disabled = true;

            if (isSignUpMode) {
                // புது அக்கவுண்ட் கிரியேட் பண்ணும் ஃப்ளோ
                const { data, error } = await supabase.auth.signUp({
                    email: emailInput,
                    password: passwordInput
                });

                if (error) {
                    alert("Sign Up Error: " + error.message);
                } else {
                    alert("Sign Up Successful! Switching to Sign In mode. Please log in.");
                    // அக்கவுண்ட் கிரியேட் ஆனதும் லாகின் மோடுக்கு தானா மாறிடும்
                    isSignUpMode = false;
                    loginHeading.innerText = "Welcome back! Please Sign in to Your Account.";
                    submitBtn.innerHTML = `Sign In <i class="fa-solid fa-arrow-right"></i>`;
                    toggleTextParagraph.innerHTML = `Don't have an account? <a href="#" id="toggleAuthMode">Sign Up</a>`;
                    if (forgotLink) forgotLink.style.display = 'block';
                    passwordField.value = ""; // பாஸ்வேர்ட் ஃபீல்டை கிளியர் செய்கிறோம்
                }
            } else {
                // டேட்டாபேஸ்ல மெயில் & பாஸ்வேர்ட் செக் பண்ணி லாகின் பண்ணும் ஃப்ளோ
                const { data, error } = await supabase.auth.signInWithPassword({
                    email: emailInput,
                    password: passwordInput
                });

                if (error) {
                    alert("Login Failed: " + error.message + " \n\n(அக்கவுண்ட் இல்லைனா முதல்ல Sign Up பண்ணுங்க bro!)");
                } else {
                    console.log("Logged in successfully!");
                    // அக்கவுண்ட் கரெக்ட்டா இருந்தா மட்டும் டேஷ்போர்டுக்குப் போகும்
                    window.location.href = 'automation.html';
                }
            }

            if (!isSignUpMode && submitBtn) {
                submitBtn.innerHTML = `Sign In <i class="fa-solid fa-arrow-right"></i>`;
            } else if (submitBtn) {
                submitBtn.innerHTML = `Sign Up <i class="fa-solid fa-arrow-right"></i>`;
            }
            submitBtn.disabled = false;
        });
    }

    // 5. SOCIAL BUTTONS CLICK EVENTS
    const googleBtn = document.getElementById('googleBtn');
    const facebookBtn = document.getElementById('facebookBtn');
    const appleBtn = document.getElementById('appleBtn');

    if (googleBtn) googleBtn.addEventListener('click', (e) => { e.preventDefault(); alert('Google Auth Triggered!'); });
    if (facebookBtn) facebookBtn.addEventListener('click', (e) => { e.preventDefault(); alert('Meta Facebook Auth Triggered!'); });
    if (appleBtn) appleBtn.addEventListener('click', (e) => { e.preventDefault(); alert('Apple ID Auth Triggered!'); });
});
