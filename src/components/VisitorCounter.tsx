'use client'

import { useEffect, useState } from 'react'
import { SHEET_SCRIPT_URL } from '@/lib/sheet'

// Counts homepage visits through the guest-responses Apps Script.
// A browser counts as a new visitor once (localStorage); refreshes in the same
// tab session only read the total. Stays hidden until the script answers.
export default function VisitorCounter() {
  const [visitors, setVisitors] = useState<number | null>(null)

  useEffect(() => {
    let isNew = false
    let counted = false
    try {
      isNew = !localStorage.getItem('pm_visited')
      counted = !!sessionStorage.getItem('pm_counted')
    } catch {}

    const params = new URLSearchParams({ action: 'visit' })
    if (counted) params.set('peek', '1')
    else if (isNew) params.set('new', '1')

    fetch(`${SHEET_SCRIPT_URL}?${params}`)
      .then((r) => r.json())
      .then((d) => {
        if (typeof d?.visitors !== 'number') return
        setVisitors(d.visitors)
        try {
          localStorage.setItem('pm_visited', '1')
          sessionStorage.setItem('pm_counted', '1')
        } catch {}
      })
      .catch(() => {})
  }, [])

  if (visitors === null || visitors < 1) return null

  return (
    <p className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-sm text-[#F5EBD2]">
      <span aria-hidden>💚</span>
      ผู้เข้าชม <span className="font-bold tabular-nums">{visitors.toLocaleString('th-TH')}</span> คน
    </p>
  )
}
