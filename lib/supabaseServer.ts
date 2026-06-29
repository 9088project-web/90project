export function hasSupabaseServerEnv() { return false; }
export function createSupabaseServerClient() { throw new Error("Offline version does not use Supabase."); }
