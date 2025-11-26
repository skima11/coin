import { createClient } from "@supabase/supabase-js";
import Constants from "expo-constants";

const extra = Constants.expoConfig?.extra ?? {};

const supabaseUrl = extra.supabaseUrl as string;
const supabaseAnonKey = extra.supabaseAnonKey as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storageKey: "vad-auth-token",
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});
