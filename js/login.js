// 1. YOUR SUPABASE CONFIGURATION
const SUPABASE_URL = "YOUR_SUPABASE_PROJECT_URL"; 
const SUPABASE_ANON_KEY = "YOUR_SUPABASE_ANON_KEY";

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// 2. Password Visibility Toggle (இப்போ 100% அன்-ஹைடு வேலை செய்யும் bro)
window.togglePassword = function() {
    const passwordField = document.getElementById('passwordField');
    const toggleIcon = document.querySelector('.password-toggle');
    
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

// 3. Simple Auth Toggle and Form Submit
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('form');
    const submitBtn = document.querySelector('.btn-submit');
    const loginHeading = document.querySelector('.login-heading');
    const toggleTextContainer = document.querySelector('.signup-text');

    let isSignUpMode = false;

    // கீழ இருக்குற லிங்க்கை கிளிக் பண்ணா Sign Up / Sign In மாறும்
    toggleTextContainer.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            e.preventDefault();
            isSignUpMode = !isSignUpMode;
            
            if (isSignUpMode) {
                loginHeading.innerText = "Create your account to get started with IMA Automation!";
                submitBtn.innerHTML = `Sign Up <i class="fa-solid fa-arrow-right"></i>`;
                toggleTextContainer.innerHTML = `Already have an account? <a href="#">Sign In</a>`;
            } else {
                loginHeading.innerText = "Welcome back! Please Sign in to Your Account.";
                submitBtn.innerHTML = `Sign In <i class="fa-solid fa-arrow-right"></i>`;
                toggleTextContainer.innerHTML = `Don't have an account? <a href="#">Sign Up</a>`;
            }
        }
    });

    // Form Submission Logic
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const emailInput = loginForm.querySelector('input[type="email"]').value;
            const passwordInput = document.getElementById('passwordField').value;

            submitBtn.innerText = "Processing...";
            submitBtn.disabled = true;

            if (isSignUpMode) {
                // புது அக்கவுண்ட் கிரியேட் பண்ணுதல்
                const { data, error } = await supabase.auth.signUp({
                    email: emailInput,
                    password: passwordInput
                });

                if (error) {
                    alert("Sign Up Error: " + error.message);
                } else {
                    alert("Sign Up Successful! Now entering Sign In Mode. Please log in.");
                    // சைன் அப் ஆனதும் லாகின் மோடுக்கு மாத்துறோம்
                    isSignUpMode = false;
                    loginHeading.innerText = "Welcome back! Please Sign in to Your Account.";
                    submitBtn.innerHTML = `Sign In <i class="fa-solid fa-arrow-right"></i>`;
                    toggleTextContainer.innerHTML = `Don't have an account? <a href="#">Sign Up</a>`;
                }
            } else {
                // டேட்டாபேஸ்ல செக் பண்ணி லாகின் பண்ணுதல்
                const { data, error } = await supabase.auth.signInWithPassword({
                    email: emailInput,
                    password: passwordInput
                });

                if (error) {
                    alert("Login Failed: " + error.message + " (அக்கவுண்ட் இல்லைனா முதல்ல Sign Up லிங்க்கை கிளிக் பண்ணுங்க bro!)");
                } else {
                    // லாகின் சக்சஸ்னா மட்டும் தான் டேஷ்போர்டுக்கு போகும்!
                    window.location.href = 'automation.html';
                }
            }

            submitBtn.innerText = isSignUpMode ? "Sign Up" : "Sign In";
            submitBtn.disabled = false;
        });
    }
});
