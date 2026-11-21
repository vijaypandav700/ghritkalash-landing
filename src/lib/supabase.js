import { createClient } from "@supabase/supabase-js";

/**
 * Supabase Client Initializer
 * - Uses SUPABASE_SERVICE_ROLE_KEY for secure server-side route handlers (bypassing RLS when necessary)
 * - Falls back to NEXT_PUBLIC_SUPABASE_ANON_KEY if service key is absent
 */

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    })
  : null;
