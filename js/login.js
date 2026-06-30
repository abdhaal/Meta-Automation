/**
 * IMA Automation - Login & Sign Up Flow with Supabase Auth
 */

// 1. YOUR SUPABASE CONFIGURATION (உங்க ப்ரொஜெக்ட் டீடைல்ஸ் இங்க கரெக்ட்டா இருக்கணும் bro)
const SUPABASE_URL = "YOUR_SUPABASE_PROJECT_URL"; 
const SUPABASE_ANON_KEY = "YOUR_SUPABASE_ANON_KEY";

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// 2. Password Visibility Toggle (இப்போ இது குளோபலா வேலை செய்யும் bro)
window.togglePassword = function() {
    const passwordField = document.getElementById('passwordField');
    const toggleIcon = document.querySelector('.password-toggle');
    
    if (!passwordField || !toggleIcon) return;

    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        toggleIcon.classList.remove('fa-eye-slash');
        toggleIcon.classList.add('fa-eye');
    } else {
        passwordField.type = 'password';
        toggleIcon.classList.remove('fa-eye');
        toggleIcon.classList.add('fa-eye-slash');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('form');
    const signupLink = document.querySelector('.signup-text a');
    const loginHeading = document.querySelector('.login-heading');
    const submitBtn = document.querySelector('.btn-submit');
    const signupTextParagraph = document.querySelector('.signup-text');
    
    let isSignUpMode = false; // ஆரம்பத்தில் லாகின் மோடில் இருக்கும்

    // 3. Sign Up மற்றும் Sign In மோட்களை மாற்றுவதற்கான வசதி (Toggle Mode)
    if (signupLink) {
        signupLink.addEventListener('click', (e) => {
            e.preventDefault();
            isSignUpMode = !isSignUpMode;

            if (isSignUpMode) {
                loginHeading.innerText = "Create your account to get started with IMA Automation!";
                submitBtn.innerHTML = `Sign Up <i class="fa-solid fa-arrow-right"></i>`;
                signupTextParagraph.innerHTML = `Already have an account? <a href="#">Sign In</a>`;
            } else {
                loginHeading.innerText = "Welcome back! Please Sign in to Your Account.";
                submitBtn.innerHTML = `Sign In <i class="fa-solid fa-arrow-right"></i>`;
                signupTextParagraph.innerHTML = `Don't have an account? <a href="#">Sign Up</a>`;
            }
            // புது லிங்க்கிற்கு மீண்டும் லிசனர் செட் செய்கிறோம்
            setupToggleLink();
        });
    }

    function setupToggleLink() {
        const newLink = document.querySelector('.signup-text a');
        newLink.addEventListener('click', (e) => {
            e.preventDefault();
            isSignUpMode = !isSignUpMode;
            if (isSignUpMode) {
                loginHeading.innerText = "Create your account to get started!";
                submitBtn.innerHTML = `Sign Up <i class="fa-solid fa-arrow-right"></i>`;
                signupTextParagraph.innerHTML = `Already have an account? <a href="#">Sign In</a>`;
            } else {
                loginHeading.innerText = "Welcome back! Please Sign in to Your Account.";
                submitBtn.innerHTML = `Sign In <i class="fa-solid fa-arrow-right"></i>`;
                signupTextParagraph.innerHTML = `Don't have an account? <a href="#">Sign Up</a>`;
            }
            setupToggleLink();
        });
    }

    // 4. Form Submission (Sign Up / Sign In Logic)
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const emailInput = loginForm.querySelector('input[type="email"]').value;
            const passwordInput = document.getElementById('passwordField').value;

            submitBtn.innerText = "Processing...";
            submitBtn.disabled = true;

            if (isSignUpMode) {
                // ==========================================
                // 📝 SIGN UP FLOW (புது அக்கவுண்ட் கிரியேட் செய்தல்)
                // ==========================================
                const { data, error } = await supabase.auth.signUp({
                    email: emailInput,
                    password: passwordInput,
                });

                if (error) {
                    alert("Sign Up Error: " + error.message);
                } else {
                    alert("Registration Successful! Please check your email for verification link or try signing in.");
                    // சைன் அப் ஆனதும் லாகின் மோடுக்கு மாத்திடுவோம்
                    isSignUpMode = false;
                    loginHeading.innerText = "Welcome back! Please Sign in to Your Account.";
                    submitBtn.innerHTML = `Sign In <i class="fa-solid fa-arrow-right"></i>`;
                    signupTextParagraph.innerHTML = `Don't have an account? <a href="#">Sign Up</a>`;
                    setupToggleLink();
                }
            } else {
                // ==========================================
                // 🔑 SIGN IN FLOW (டேட்டாபேஸ்ல செக் பண்ணி லாகின் செய்தல்)
                // ==========================================
                const { data, error } = await supabase.auth.signInWithPassword({
                    email: emailInput,
                    password: passwordInput,
                });

                if (error) {
                    // மெயில் அல்லது பாஸ்வேர்ட் தப்பா இருந்தா உள்ள விடாது!
                    alert("Login Failed: " + error.message + " (அக்கவுண்ட் இல்லைனா முதல்ல Sign Up பண்ணுங்க bro!)");
                } else {
                    console.log("Logged in successfully!");
                    // டேட்டாபேஸ்ல அக்கவுண்ட் இருந்தா மட்டும் டேஷ்போர்டுக்கு போகும்
                    window.location.href = 'automation.html';
                }
            }

            submitBtn.disabled = false;
        });
    }
});
