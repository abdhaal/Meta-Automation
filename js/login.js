document.addEventListener("DOMContentLoaded", () => {
    const password = document.getElementById("password");
    const toggle = document.getElementById("togglePassword");
    
    const authForm = document.getElementById("authForm");
    const emailField = document.getElementById("email");
    const authHeading = document.getElementById("authHeading");
    const submitBtn = document.getElementById("submitBtn");
    const toggleTextParagraph = document.getElementById("toggleTextParagraph");
    const forgotLink = document.getElementById("forgotLink");

    let isSignUpMode = false; // ஆரம்பத்தில் Sign In மோடு

    // 🔑 1. PASSWORD UNHIDE TRIGGER (உங்க வொர்க்கிங் கோடு அப்படியே இருக்கு bro)
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

    // 🗄️ 3. LOCAL STORAGE REGISTER & LOGIN CHECK (சைன் அப் பண்ணாம லாகின் ஆகாது!)
    if (authForm) {
        authForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const emailInput = emailField.value.trim();
            const passwordInput = password.value.trim();

            if (isSignUpMode) {
                // புது அக்கவுண்ட்டை லோக்கல் மெமரியில பதியவைக்கிறோம்
                localStorage.setItem('regUserEmail', emailInput);
                localStorage.setItem('regUserPassword', passwordInput);

                alert("Sign Up Successful! 👍 இப்போ அதே Email & Password வச்சு லாகின் பண்ணுங்க bro!");
                
                // சைன் அப் முடிஞ்சதும் லாகின் மோடுக்கு மாத்துறோம்
                isSignUpMode = false;
                authHeading.innerText = "Welcome back! Please Sign in to Your Account.";
                submitBtn.innerHTML = `Sign In <i class="fa-solid fa-arrow-right"></i>`;
                toggleTextParagraph.innerHTML = `Don't have an account? <a href="#" id="toggleAuthMode">Sign Up</a>`;
                if (forgotLink) forgotLink.style.display = 'block';
                password.value = ""; 
            } else {
                // லோக்கல் மெமரியில இருக்குற டேட்டாவை செக் பண்றோம்
                const savedEmail = localStorage.getItem('regUserEmail');
                const savedPassword = localStorage.getItem('regUserPassword');

                if (!savedEmail) {
                    alert("உங்களுக்கு அக்கவுண்ட் இல்லை bro! முதல்ல கீழே இருக்குற 'Sign Up' லிங்க்கை கிளிக் பண்ணி அக்கவுண்ட் கிரியேட் பண்ணுங்க!");
                    return;
                }

                if (emailInput === savedEmail && passwordInput === savedPassword) {
                    alert("Success! லாகின் ஆகிடுச்சு.");
                    window.location.href = 'automation.html'; // டேஷ்போர்டுக்கு கூட்டிட்டு போயிடும்
                } else {
                    alert("தப்பான Email அல்லது Password! சரியான விபரங்களை கொடுங்க bro!");
                }
            }
        });
    }
});
                                  
