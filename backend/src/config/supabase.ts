import dotenv from 'dotenv'
import { createClient } from '@supabase/supabase-js'

dotenv.config()

const supabaseUrl = process.env.SUPABASE_URL
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase configuration')
  console.error('SUPABASE_URL:', supabaseUrl ? '✓' : '✗')
  console.error('SUPABASE_ANON_KEY:', supabaseAnonKey ? '✓' : '✗')
  process.exit(1)
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
