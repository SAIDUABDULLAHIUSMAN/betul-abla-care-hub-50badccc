import { createClient } from '@supabase/supabase-js'

// Lovable projects don't use .env files. We gracefully handle missing config
const supabaseUrl = (import.meta as any).env?.VITE_SUPABASE_URL
const supabaseAnonKey = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey)

function createUnconfiguredClient() {
  const handler: ProxyHandler<any> = {
    get() {
      throw new Error(
        'Supabase is not configured. Connect Supabase in Lovable (green button, top-right) to enable dashboard features.'
      )
    },
  }
  return new Proxy({}, handler)
}

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : (createUnconfiguredClient() as any)
