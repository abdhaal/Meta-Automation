const SUPABASE_URL = "https://jrjigvhzkicmgketrmbr.supabase.co";

const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impyamlndmh6a2ljbWdrZXRybWJyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI1NzYyODEsImV4cCI6MjA5ODE1MjI4MX0.4FHwDGywcybt_tu52Dv5e2YEgCN3uKbKI0l844RA3Og";

window.supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);
