import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://ajvbmwccundlfgeavnio.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFqdmJtd2NjdW5kbGZnZWF2bmlvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY2NTAxNzUsImV4cCI6MjA0MjIyNjE3NX0.Jel7fbu3cPnOAkB3XFYxT6jM7lGaG4F4Czwbk0xIpn8",
  {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  }
);
