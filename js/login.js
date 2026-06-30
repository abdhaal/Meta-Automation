/**
 * IMA Automation - Login & Sign Up Flow (Local Storage & UI Fixed)
 */

document.addEventListener('DOMContentLoaded', () => {
    // HTML Elements-ஐ ஐடி மூலமா துல்லியமா எடுக்கிறோம்
    const authForm = document.getElementById('authForm');
    const emailField = document.getElementById('emailField');
    const passwordField = document.getElementById('passwordField');
    const eyeToggleIcon = document.getElementById('eyeToggleIcon');
    const loginHeading = document.getElementById('loginHeading');
    const submitBtn = document.getElementById('submitBtn');
    const toggleTextParagraph = document.getElementById('toggleTextParagraph');
    const forgotLink = document.getElementById('forgotLink');

    let isSignUpMode = false; // ஆரம்பத்தில் லாகின் மோடு

    // 🔑 1. PASSWORD UNHIDE FIX (கண் ஐகான் பிரச்சனை 100% இப்போ சால்வ்!)
    if (eyeToggleIcon && passwordField) {
        eyeToggleIcon.addEventListener('click', function() {
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

    // 📝 2. SIGN UP / SIGN IN TOGGLE FIX (லிங்க் கிளிக் பண்ணா மோடு இப்போ பக்காவா மாறும்)
    if (toggleTextParagraph) {
        toggleTextParagraph.addEventListener('click', function(e) {
            if (e.target && e.target.id === 'toggleAuthMode') {
                e.preventDefault();
                isSignUpMode = !isSignUpMode;

                if (isSignUpMode) {
                    loginHeading.innerText = "Create your account to get started with IMA Automation!";
                    submitBtn.innerHTML = `Sign Up <i class="fa-solid fa-arrow-right"></i>`;
                    toggleTextParagraph.innerHTML = `Already have an account? <a href="#" id="toggleAuthMode">Sign In</a>`;
                    if (forgotLink) forgotLink.style.display = 'none';
                } else {
                    loginHeading.innerText = "Welcome back! Please Sign in to Your Account.";
                    submitBtn.innerHTML = `Sign In <i class="fa-solid fa-arrow-right"></i>`;
                    toggleTextParagraph.innerHTML = `Don't have an account? <a href="#" id="toggleAuthMode">Sign Up</a>`;
                    if (forgotLink) forgotLink.style.display = 'block';
                }
            }
        });
    }

    // 🗄️ 3. LOCAL STORAGE DATA VALIDATION (முதல்ல சைன்-அப் பண்ணா தான் லாகின் ஆகும்!)
    if (authForm) {
        authForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = emailField.value.trim();
            const passwordInput = passwordField.value.trim();

            if (isSignUpMode) {
                // புது அக்கவுண்ட்டை பிரௌசரோட லோக்கல் மெமரியில சேவ் பண்றோம்
                localStorage.setItem('registeredEmail', emailInput);
                localStorage.setItem('registeredPassword', passwordInput);

                alert("Sign Up Successful! இப்போ அதே மெயில் & பாஸ்வேர்ட் வச்சு Sign In பண்ணுங்க bro!");
                
                // சைன் அப் முடிஞ்சதும் லாகின் மோடுக்கு மாத்துறோம்
                isSignUpMode = false;
                loginHeading.innerText = "Welcome back! Please Sign in to Your Account.";
                submitBtn.innerHTML = `Sign In <i class="fa-solid fa-arrow-right"></i>`;
                toggleTextParagraph.innerHTML = `Don't have an account? <a href="#" id="toggleAuthMode">Sign Up</a>`;
                if (forgotLink) forgotLink.style.display = 'block';
                passwordField.value = ""; 
            } else {
                // லோக்கல் மெமரியில இருக்குற டேட்டாவை எடுத்து செக் பண்றோம்
                const savedEmail = localStorage.getItem('registeredEmail');
                const savedPassword = localStorage.getItem('registeredPassword');

                if (!savedEmail) {
                    alert("Account இல்லை bro! முதல்ல கீழே இருக்குற Sign Up லிங்க்கை கிளிக் பண்ணி அக்கவுண்ட் கிரியேட் பண்ணுங்க!");
                    return;
                }

                if (emailInput === savedEmail && passwordInput === savedPassword) {
                    alert("Success! லாகின் ஆகிடுச்சு. டேஷ்போர்டுக்கு போகலாம்!");
                    window.location.href = 'automation.html';
                } else {
                    alert("தப்பான Email அல்லது Password! சரிபார்த்து திரும்ப டைப் பண்ணுங்க bro!");
                }
            }
        });
    }
});
