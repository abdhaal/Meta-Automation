const password = document.getElementById("password");
const toggle = document.getElementById("togglePassword");

toggle.addEventListener("click",()=>{

if(password.type==="password"){
password.type="text";
toggle.classList.remove("fa-eye-slash");
toggle.classList.add("fa-eye");
}else{
password.type="password";
toggle.classList.remove("fa-eye");
toggle.classList.add("fa-eye-slash");
}

});
