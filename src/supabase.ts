import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import 'react-native-url-polyfill/auto'

const supabaseUrl = 'https://smhvzemsuxrtftgjgelg.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNtaHZ6ZW1zdXhydGZ0Z2pnZWxnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODU1NDcxNzcsImV4cCI6MjAwMTEyMzE3N30.BCUEyX3BkB1_WcKU5SbHPLGrsL5sBeToRs883h6DjBM'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage as any,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})