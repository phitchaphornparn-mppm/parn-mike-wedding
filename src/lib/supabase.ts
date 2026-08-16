import { createClient, type SupabaseClient } from '@supabase/supabase-js'

let browserClient: SupabaseClient | undefined

function getBrowserClient() {
  if (browserClient) {
    return browserClient
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing browser-side Supabase credentials in environment')
  }

  browserClient = createClient(supabaseUrl, supabaseAnonKey)
  return browserClient
}

export const supabase = new Proxy({} as SupabaseClient, {
  get(_target, property) {
    const client = getBrowserClient()
    const value = Reflect.get(client, property, client)

    return typeof value === 'function' ? value.bind(client) : value
  },
})
