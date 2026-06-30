/**
 * IMA Automation - Login Page Functionality (Working Version)
 * Handles Password visibility, Form redirection, and Social Login triggers
 */

// 1. Password Visibility Toggle Function
function togglePassword() {
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

// 2. Action Handlers when Page Loads
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('form');
    
    // Sign In ஃபார்ம் சப்மிட் ஆகும்போது நடக்கும் வேலை
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault(); // ஃபார்ம் ரீஃப்ரெஷ் ஆகுறதை தடுக்கும்
            
            const email = loginForm.querySelector('input[type="email"]').value;
            const password = document.getElementById('passwordField').value;
            
            if (email && password) {
                // வெற்றிகரமாக லாகின் ஆகி டேஷ்போர்டு (automation.html) பக்கத்திற்கு கூட்டிட்டு போகும்
                window.location.href = 'automation.html';
            }
        });
    }

    // சோசியல் லாகின் பட்டன்கள் வேலை செய்ய
    const googleBtn = document.querySelector('.btn-social:nth-child(1)');
    const facebookBtn = document.querySelector('.btn-social:nth-child(2)');
    const appleBtn = document.querySelector('.btn-social:nth-child(3)');

    if (googleBtn) {
        googleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Connecting with Google Account...');
            window.location.href = 'automation.html'; // டேஷ்போர்டுக்கு போகும்
        });
    }

    if (facebookBtn) {
        facebookBtn.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Connecting with Facebook Business Meta Profile...');
            window.location.href = 'automation.html'; // டேஷ்போர்டுக்கு போகும்
        });
    }

    if (appleBtn) {
        appleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Connecting with Apple ID...');
            window.location.href = 'automation.html'; // டேஷ்போர்டுக்கு போகும்
        });
    }
});
