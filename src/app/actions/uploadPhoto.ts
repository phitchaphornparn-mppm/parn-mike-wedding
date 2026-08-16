'use server'

import { createClient } from '@supabase/supabase-js'

export async function insertPhotoData(
  fileUrl: string,
  guestName: string,
  caption: string
) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        persistSession: false,
      },
    }
  )

  const { error } = await supabase
    .from('wedding_photos')
    .insert([
      {
        url: fileUrl,
        caption: caption || null,
        guest_name: guestName,
        approved: false,
      },
    ])

  if (error) {
    throw new Error(error.message)
  }

  return { success: true }
}
