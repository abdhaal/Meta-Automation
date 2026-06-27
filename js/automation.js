function saveAutomation(){

const postid=document.getElementById("postid").value;

const message=document.getElementById("message").value;

const status=document.getElementById("status").checked;

localStorage.setItem("postid",postid);

localStorage.setItem("message",message);

localStorage.setItem("status",status);

alert("Settings Saved");

}
