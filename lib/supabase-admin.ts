import { createClient, type SupabaseClient } from '@supabase/supabase-js';

type SupabaseAdminResult = {
  client: SupabaseClient | null;
  error: 'missing' | 'invalid' | null;
};

export function getSupabaseAdminClient(): SupabaseAdminResult {
  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    return { client: null, error: 'missing' };
  }

  let parsedUrl: URL;
  try {
    parsedUrl = new URL(supabaseUrl);
  } catch {
    return { client: null, error: 'invalid' };
  }

  const isLocalHttp =
    parsedUrl.protocol === 'http:' && parsedUrl.hostname === 'localhost';
  if (parsedUrl.protocol !== 'https:' && !isLocalHttp) {
    return { client: null, error: 'invalid' };
  }

  return {
    client: createClient(supabaseUrl, serviceRoleKey, {
      auth: {
        autoRefreshToken: false,
        detectSessionInUrl: false,
        persistSession: false,
      },
    }),
    error: null,
  };
}
