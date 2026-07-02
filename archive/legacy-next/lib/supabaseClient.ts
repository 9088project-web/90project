export function hasSupabaseBrowserEnv() { return false; }
export function createClient() { throw new Error("Offline version does not use Supabase."); }
