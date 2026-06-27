alert("Supabase JS Loaded");

const SUPABASE_URL = "https://jrjigvhzkicmgketrmbr.supabase.co";

const SUPABASE_KEY = "sb_publishable_2IokJkNZ8HO6n-pDMg0zLg_w7dkexlK";

window.supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);
