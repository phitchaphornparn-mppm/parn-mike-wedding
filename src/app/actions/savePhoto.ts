'use server'

import { createClient } from '@supabase/supabase-js'

export async function savePhotoToDatabase(
  fileUrl: string,
  guestName: string,
  caption: string
) {
  // Use service role key (trusted server-side)
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.SUPABASE_SERVICE_ROLE_KEY || '',
    {
      auth: { persistSession: false },
    }
  )

  const { data, error } = await supabaseAdmin
    .from('wedding_photos')
    .insert([
      {
        url: fileUrl,
        guest_name: guestName,
        caption: caption || null,
        approved: false,
      },
    ])
    .select()

  if (error) {
    console.error('Database error:', error)
    throw new Error(error.message)
  }

  return data
}
