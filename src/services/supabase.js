// import { createClient } from "@supabase/supabase-js";

// export const supabaseUrl = "https://icuubfoaytuoxmwidkbk.supabase.co";

// const supabaseKey =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImljdXViZm9heXR1b3htd2lka2JrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTI0NjUzMzcsImV4cCI6MjAwODA0MTMzN30.eQOIPrkYpr7VngN1REa-_3i6KeAJHvds1g_s4t3A-wI";
// const supabase = createClient(supabaseUrl, supabaseKey);

// export default supabase;

// == New Supabase Connection ==
import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://gszajdhyedrshftlwqaq.supabase.co";

const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdzemFqZGh5ZWRyc2hmdGx3cWFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjczNzQwMDcsImV4cCI6MjA0Mjk1MDAwN30.5SHUf9TPeORGrb7_kB4j3s_JwNXPeAwqxgw4u0LUHW8";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
