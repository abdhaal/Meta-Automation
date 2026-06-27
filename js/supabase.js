alert("Supabase JS Loaded");

const SUPABASE_URL = "https://jrjigvhzkicmgketrmbr.supabase.co";

const SUPABASE_KEY = "YOUR_FULL_PUBLISHABLE_KEY";

window.supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

alert(window.supabaseClient);
