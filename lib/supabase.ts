import { createClient } from "@supabase/supabase-js";
import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Client-side Supabase client (for browser, public-facing)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Cookie-based browser client for admin — session is stored in cookies so
// the middleware can verify it server-side. Use this in all admin client components.
export const createAdminBrowserClient = () => createBrowserClient(supabaseUrl, supabaseAnonKey);

// Server-side Supabase client (for API routes - has full access)
// Only create if service role key is available (server-side only)
export const getSupabaseAdmin = () => {
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseServiceKey) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY is not set");
  }
  return createClient(supabaseUrl, supabaseServiceKey);
};

// Re-export constants and types for convenience
export * from "./constants";
