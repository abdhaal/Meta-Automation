/**
 * IMA Automation - Login & Supabase Data Storage
 */

// 1. YOUR SUPABASE CONFIGURATION (உங்க Supabase கிரெடென்ஷியல்ஸை இங்க போடுங்க bro)
const SUPABASE_URL = "https://jrjigvhzkicmgketrmbr.supabase.co"; 
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impyamlndmh6a2ljbWdrZXRybWJyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI1NzYyODEsImV4cCI6MjA5ODE1MjI4MX0.4FHwDGywcybt_tu52Dv5e2YEgCN3uKbKI0l844RA3Og";

// Supabase கிளையன்ட்டை உருவாக்குறோம்
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// 2. Password Visibility Toggle Function
function togglePassword() {
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

// 3. Form Submission & Database Storage
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('form');
    
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault(); // Page reload ஆகாமல் தடுக்கும்
            
            const emailInput = loginForm.querySelector('input[type="email"]').value;
            const passwordInput = document.getElementById('passwordField').value;
            const submitBtn = loginForm.querySelector('.btn-submit');

            // பட்டனை லோடிங் மோடுக்கு மாத்துறோம்
            submitBtn.innerText = "Processing...";
            submitBtn.disabled = true;

            try {
                // Supabase-ல 'users' அல்லது 'profiles' அப்படிங்குற டேபிள்ல டேட்டாவை சேவ் பண்றோம்
                // (உங்க டேட்டாபேஸ் டேபிள் பெயருக்கு ஏத்த மாதிரி மாத்திக்கலாம் bro)
                const { data, error } = await supabase
                    .from('users') 
                    .insert([
                        { 
                            email: emailInput, 
                            password_hash: passwordInput, // Security-க்காக நிஜ பிசினஸ்ல இதை ஹேஷ் பண்ணனும் bro
                            logged_in_at: new Date().toISOString() 
                        }
                    ]);

                if (error) {
                    console.error("Supabase Error:", error);
                    alert("Database Error: " + error.message);
                } else {
                    console.log("Data stored successfully!");
                    // டேட்டா சேவ் ஆன உடனே டேஷ்போர்டுக்கு கூட்டிட்டு போகும்
                    window.location.href = 'automation.html';
                }
            } catch (err) {
                console.error("Catch Error:", err);
            } finally {
                // பட்டனை பழையபடி மாத்துறோம்
                submitBtn.innerText = "Sign In";
                submitBtn.disabled = false;
            }
        });
    }
});
