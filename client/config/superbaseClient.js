import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://gwjollgebjumbqkistsc.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd3am9sbGdlYmp1bWJxa2lzdHNjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjAxNDc2MDIsImV4cCI6MjAzNTcyMzYwMn0.E_1UxnVFgQR4UzkQ4GL4lf9wNfh4WjUMJN44cQ3B2xM";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
