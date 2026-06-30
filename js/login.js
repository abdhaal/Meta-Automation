/**
 * IMA Automation - Login Page Functionality
 * Handles password visibility toggling and basic form validations
 */

function togglePassword() {
    const passwordField = document.getElementById('passwordField');
    const toggleIcon = document.querySelector('.password-toggle');
    
    if (!passwordField || !toggleIcon) return;

    // பாஸ்வேர்ட் ஃபீல்ட் டைப்பை மாற்றி கண்ணை ஆன்/ஆஃப் செய்யும் மேஜிக்
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

// ஒருவேளை பின்னாடி சோசியல் லாகின் பட்டன்களுக்கு அலர்ட் மெசேஜ் அல்லது ஆக்ஷன் செட் பண்ணனும்னா இங்க பண்ணிக்கலாம் bro
document.addEventListener('DOMContentLoaded', () => {
    const socialButtons = document.querySelectorAll('.btn-social');
    
    socialButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            console.log(`${button.innerText} click event triggered securely.`);
        });
    });
});

