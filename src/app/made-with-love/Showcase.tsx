'use client'

import { useEffect, useState } from 'react'
import { SHEET_SCRIPT_URL } from '@/lib/sheet'

type Work = { key: string; en: string; th: string; note: string }
type Votes = Record<string, number>

const FB_URL = 'https://www.facebook.com/profile.php?id=61596252849472'
const VOTE_KEY = 'pm_vote'

const ink = '#536B3E'

// Line icons drawn for this page (stroke uses currentColor).
const icons: Record<string, JSX.Element> = {
  khanmaak: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 26h32l-4 12H12z" />
      <path d="M14 26c0-6 4-10 10-10s10 4 10 10" />
      <path d="M24 16v-5M20 9c2 2 6 2 8 0" />
      <path d="M18 32h12" />
    </svg>
  ),
  card: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="8" y="12" width="32" height="24" rx="3" />
      <path d="M8 15l16 11 16-11" />
      <path d="M24 33c-3-2-5-3.5-5-5.5a2.5 2.5 0 0 1 5-1 2.5 2.5 0 0 1 5 1c0 2-2 3.5-5 5.5z" fill="currentColor" stroke="none" opacity=".35" />
    </svg>
  ),
  favor: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="20" width="30" height="20" rx="2" />
      <path d="M7 14h34v6H7zM24 14v26" />
      <path d="M24 14c-2-5-9-7-9-2 0 2 4 2 9 2zM24 14c2-5 9-7 9-2 0 2-4 2-9 2z" />
    </svg>
  ),
  vendor: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22h18l-9 20z" />
      <path d="M18 27l9 5M30 27l-11 6" opacity=".6" />
      <path d="M14 22a6 6 0 0 1 4-8 6 6 0 0 1 12 0 6 6 0 0 1 4 8" />
      <path d="M24 8c1-2 3-3 5-3" />
    </svg>
  ),
  art: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M24 8C14 8 8 15 8 23c0 9 7 15 13 15 3 0 3-3 2-5s0-4 3-4h5c5 0 9-3 9-9 0-7-7-12-16-12z" />
      <circle cx="17" cy="20" r="2" /><circle cx="25" cy="15" r="2" /><circle cx="32" cy="21" r="2" />
    </svg>
  ),
  system: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="8" y="10" width="32" height="28" rx="3" />
      <path d="M8 18h32M18 18v20M8 26h32M8 32h32" />
    </svg>
  ),
  game: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="17" width="22" height="22" rx="4" />
      <circle cx="15" cy="23" r="1.5" fill="currentColor" /><circle cx="20" cy="28" r="1.5" fill="currentColor" /><circle cx="25" cy="33" r="1.5" fill="currentColor" />
      <path d="M31 22l6-6M34 11l1.5 3 3 1.5-3 1.5L34 20l-1.5-3-3-1.5 3-1.5z" />
    </svg>
  ),
  web: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="15" y="6" width="18" height="36" rx="4" />
      <path d="M22 37h4" />
      <path d="M24 26c-3-2-5-3.5-5-5.5a2.5 2.5 0 0 1 5-1 2.5 2.5 0 0 1 5 1c0 2-2 3.5-5 5.5z" />
    </svg>
  ),
}

const works: Work[] = [
  { key: 'khanmaak', en: 'Khan Maak Set', th: 'ชุดขันหมาก', note: 'จัดพานและของในขันหมากเอง ทุกชิ้นเลือกให้เข้าธีมของงาน' },
  { key: 'card', en: 'Invitation Cards', th: 'การ์ดเชิญ', note: 'ออกแบบการ์ดและซองเอง ทั้งแบบพิมพ์และแบบส่งออนไลน์' },
  { key: 'favor', en: 'Wedding Favors', th: 'ของชำร่วย', note: 'เลือก แพ็ก และผูกโบว์ของชำร่วยเอง ทุกชิ้นตั้งใจให้แขกที่มาร่วมงาน' },
  { key: 'vendor', en: 'Ice Cream & Food Support', th: 'ไอศครีมกะทิ & ฟู้ดซัพพอร์ต', note: 'ซุ้มไอศครีมกะทิและของว่างที่จัดเอง ให้แขกอิ่มอร่อยตลอดงาน' },
  { key: 'art', en: 'Artwork & Signage', th: 'งานอาร์ตและป้าย', note: 'ผังโต๊ะ ป้ายต้อนรับ Tent Card สติ๊กเกอร์ ในโทนเดียวกันทั้งงาน' },
  { key: 'system', en: 'Parn & Mike Management', th: 'ระบบจัดการงาน', note: 'ระบบหลังบ้านของงาน ตอบรับแขก ผังที่นั่ง ของรางวัล รวมไว้ในที่เดียว' },
  { key: 'game', en: 'Wedding Games', th: 'เกมในงาน', note: 'คิดเกมและกิจกรรมจับรางวัลเอง ให้แขกสนุกไปด้วยกันทั้งงาน' },
  { key: 'web', en: 'Wedding Website', th: 'เว็บงานแต่ง', note: 'เว็บไซต์นี้ รวม RSVP กำหนดการ แกลเลอรี่ และการ์ดอวยพรในงาน' },
]

const DETAILS: Record<string, { text: string; points: string[] }> = {
  khanmaak: { text: "จัดพานขันหมากเองทั้งชุด ตั้งแต่เลือกพาน ผ้า ดอกไม้ ไปจนถึงจัดวางของมงคลแต่ละอย่าง ให้โทนสีเข้ากับธีมเขียวเซจและครีมของงาน", points: ["เลือกพานและผ้ารองให้เข้าธีม", "จัดดอกไม้และใบตองเอง", "ของมงคลครบตามประเพณี"] },
  card: { text: "ออกแบบการ์ดเชิญเองตั้งแต่ภาพ ตัวอักษร จนถึงซอง ทั้งแบบพิมพ์แจกผู้ใหญ่ และแบบภาพส่งออนไลน์ที่แชร์ต่อในไลน์ได้ทันที", points: ["ภาพและลายเส้นวาดเอง", "ฉบับพิมพ์ + ฉบับออนไลน์", "QR ลิงก์มาเว็บงานแต่ง"] },
  favor: { text: "ของชำร่วยทุกชิ้นเลือกเอง แพ็กเอง และผูกโบว์เองทีละชิ้น ตั้งใจให้เป็นของที่แขกใช้ได้จริงและนึกถึงวันนี้ทุกครั้งที่หยิบ", points: ["เลือกของที่ใช้ได้จริง", "แพ็กและผูกโบว์ทีละชิ้น", "ป้ายขอบคุณออกแบบเอง"] },
  vendor: { text: "ดูแลเรื่องของกินในงานเอง ทั้งซุ้มไอศครีมกะทิเย็น ๆ และฟู้ดซัพพอร์ตของว่างกับเครื่องดื่มหลังแห่ขันหมาก แขกจะได้อิ่มอร่อยและไม่ต้องกังวลเรื่องท้องว่าง", points: ["ซุ้มไอศครีมกะทิเย็น ๆ ให้แขกคลายร้อน", "ของว่างและเครื่องดื่มหลังแห่ขันหมาก", "เลือกเมนูและจัดเตรียมเอง"] },
  art: { text: "งานอาร์ตทุกชิ้นในงานทำโทนเดียวกัน ทั้งผังโต๊ะ ป้ายต้อนรับ Tent Card สแกนเขียนการ์ดอวยพร และสติ๊กเกอร์น่ารัก ๆ บนเว็บ", points: ["ผังโต๊ะพร้อมพิมพ์ A3", "ป้ายตั้งโต๊ะและตั้งพื้น", "สติ๊กเกอร์ออกแบบเอง"] },
  system: { text: "ระบบหลังบ้านที่เชื่อมเว็บกับ Google Sheet ตอบรับแขก ผังที่นั่ง ของรางวัล คำอวยพร และรูปจากแขก ไหลเข้ามารวมในที่เดียวแบบอัตโนมัติ", points: ["RSVP เข้าชีตทันที", "ผังโต๊ะและของรางวัล", "รวมรูปและคำอวยพร"] },
  game: { text: "คิดเกมและกิจกรรมเองให้แขกได้สนุกร่วมกัน พร้อมจับรางวัลในงานเลี้ยง ลุ้น Smart Watch ลำโพง Aiwa และอีกหลายรางวัล", points: ["เกมให้แขกเล่นร่วมกัน", "จับรางวัลในงานเลี้ยง", "ของรางวัลจัดเตรียมเอง"] },
  web: { text: "เว็บไซต์นี้เขียนเองทั้งหมด มีกำหนดการ แผนที่ RSVP แกลเลอรี่รูป และผนังอวยพรที่ขึ้นจอใหญ่ในงานได้แบบสด ๆ", points: ["RSVP และกำหนดการ", "แกลเลอรี่ให้แขกโหลดรูป", "ผนังอวยพรขึ้นจอในงาน"] },
}

function readMyVote() {
  try { return localStorage.getItem(VOTE_KEY) || '' } catch { return '' }
}

export default function Showcase() {
  const [votes, setVotes] = useState<Votes | null>(null)
  const [mine, setMine] = useState('')
  const [open, setOpen] = useState<Work | null>(null)
  const [busy, setBusy] = useState(false)
  const [msg, setMsg] = useState('')

  useEffect(() => {
    setMine(readMyVote())
    fetch(SHEET_SCRIPT_URL + '?action=votes')
      .then((r) => r.json())
      .then((d) => { if (d && d.votes) setVotes(d.votes) })
      .catch(() => {})
    // /made-with-love#favor opens that piece directly (shareable link)
    const h = decodeURIComponent(location.hash.slice(1))
    const k = h === 'food' ? 'vendor' : h
    const w = works.find((x) => x.key === k)
    if (w) setOpen(w)
  }, [])

  const show = (w: Work | null) => {
    setOpen(w)
    setMsg('')
    try { history.replaceState(null, '', w ? '#' + w.key : location.pathname) } catch {}
  }

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') show(null) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const vote = async (key: string) => {
    if (busy || key === mine) return
    setBusy(true)
    setMsg('')
    try {
      const r = await fetch(`${SHEET_SCRIPT_URL}?action=vote&item=${key}&prev=${mine}`)
      const d = await r.json()
      if (!d || !d.votes) throw new Error()
      setVotes(d.votes)
      setMine(key)
      try { localStorage.setItem(VOTE_KEY, key) } catch {}
      setMsg('ขอบคุณที่โหวตนะคะ 💚')
    } catch {
      setMsg('ตอนนี้ยังโหวตไม่ได้ ลองใหม่อีกครั้งนะคะ')
    } finally {
      setBusy(false)
    }
  }

  const total = votes ? Object.values(votes).reduce((a, b) => a + b, 0) : 0
  const ranked = votes ? [...works].sort((a, b) => (votes[b.key] || 0) - (votes[a.key] || 0)) : []
  const top = ranked[0] && votes && votes[ranked[0].key] > 0 ? ranked[0].key : ''

  return (
    <>
      <p className="text-center text-xs text-[#789568] -mt-4 mb-6">แตะที่ผลงานเพื่อดูรายละเอียด แล้วโหวตชิ้นที่คุณชอบที่สุดได้ 1 ชิ้นนะคะ</p>
      <ul className="flex flex-wrap justify-center gap-4 sm:gap-6">
        {works.map((w) => (
          <li key={w.key} className="w-[calc(50%-0.5rem)] sm:w-[calc(50%-0.75rem)] lg:w-[calc(25%-1.125rem)]">
            <button
              type="button"
              onClick={() => show(w)}
              className={`relative w-full h-full bg-white rounded-2xl p-5 sm:p-6 border shadow-sm text-center transition hover:-translate-y-0.5 hover:shadow-md ${mine === w.key ? 'border-[#C9A45C] ring-2 ring-[#C9A45C]/40' : 'border-[#789568]/10'}`}
            >
              {top === w.key && (
                <span className="absolute top-3 left-3 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#C9A45C] text-white">แขกชอบที่สุด</span>
              )}
              <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-[#F5EBD2] flex items-center justify-center" style={{ color: ink }}>
                <span className="w-9 h-9 block">{icons[w.key]}</span>
              </div>
              <p className="text-[10px] tracking-[0.2em] text-[#C9A45C] font-semibold uppercase">{w.en}</p>
              <h3 className="font-serif text-base sm:text-lg font-bold text-[#536B3E] mt-1">{w.th}</h3>
              <p className="text-xs sm:text-sm text-[#789568] mt-2 leading-relaxed">{w.note}</p>
              <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-[#536B3E]">
                <span className={mine === w.key ? 'text-[#e46b8a]' : 'text-[#C9A45C]'}>♥</span>
                {votes ? `${votes[w.key] || 0} โหวต` : 'ดูรายละเอียด'}
                <span aria-hidden="true" className="text-[#C9A45C]">›</span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      {votes && total > 0 && (
        <section className="mt-12 bg-white rounded-3xl border border-[#789568]/10 shadow-sm px-6 sm:px-10 py-8">
          <p className="text-[10px] tracking-[0.25em] text-[#C9A45C] font-semibold text-center">GUESTS&apos; FAVORITE</p>
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#536B3E] text-center mt-1 mb-6">ผลโหวต · ชิ้นที่แขกชอบที่สุด</h2>
          <ol className="space-y-3 max-w-2xl mx-auto">
            {ranked.map((w, i) => {
              const n = votes[w.key] || 0
              const pct = total ? Math.round((n / total) * 100) : 0
              return (
                <li key={w.key}>
                  <button type="button" onClick={() => show(w)} className="w-full text-left">
                    <div className="flex justify-between text-sm text-[#536B3E] mb-1">
                      <span><span className="text-[#C9A45C] font-semibold mr-2">{i + 1}</span>{w.th}{mine === w.key && <span className="ml-2 text-xs text-[#e46b8a]">♥ ที่คุณโหวต</span>}</span>
                      <span className="text-[#789568]">{n} · {pct}%</span>
                    </div>
                    <div className="h-2.5 rounded-full bg-[#F5EBD2] overflow-hidden">
                      <div className="h-full rounded-full bg-gradient-to-r from-[#789568] to-[#C9A45C] transition-all duration-700" style={{ width: `${Math.max(pct, n ? 3 : 0)}%` }} />
                    </div>
                  </button>
                </li>
              )
            })}
          </ol>
          <p className="text-center text-xs text-[#789568] mt-5">ทั้งหมด {total} โหวต</p>
        </section>
      )}

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="work-title"
          onClick={() => show(null)}
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-[#3c4b2d]/60 p-0 sm:p-4"
        >
          <div onClick={(e) => e.stopPropagation()} className="relative w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl px-6 pt-8 pb-7 max-h-[90vh] overflow-y-auto">
            <button type="button" aria-label="ปิด" onClick={() => show(null)} className="absolute top-3 right-3 w-9 h-9 rounded-full bg-[#F5EBD2] text-[#536B3E] text-xl leading-none">×</button>
            <div className="mx-auto mb-4 w-20 h-20 rounded-full bg-[#F5EBD2] flex items-center justify-center" style={{ color: ink }}>
              <span className="w-11 h-11 block">{icons[open.key]}</span>
            </div>
            <p className="text-center text-[10px] tracking-[0.25em] text-[#C9A45C] font-semibold uppercase">{open.en}</p>
            <h2 id="work-title" className="text-center font-serif text-2xl font-bold text-[#536B3E] mt-1">{open.th}</h2>
            <p className="text-center text-[10px] tracking-[0.2em] text-[#789568] mt-1">HANDMADE BY BRIDE PARN</p>
            <p className="text-sm text-[#536B3E] leading-relaxed mt-5">{DETAILS[open.key]?.text}</p>
            <ul className="mt-4 space-y-2">
              {DETAILS[open.key]?.points.map((pt) => (
                <li key={pt} className="flex items-start gap-2 text-sm text-[#789568]">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#C9A45C] flex-shrink-0" />{pt}
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={() => vote(open.key)}
              disabled={busy || mine === open.key}
              className={`mt-6 w-full py-3 rounded-full font-semibold text-sm transition ${mine === open.key ? 'bg-[#e46b8a]/10 text-[#d0587a] border border-[#e46b8a]/40' : 'bg-[#536B3E] text-white hover:bg-[#3a4d2e]'} disabled:cursor-default`}
            >
              {busy ? 'กำลังโหวต…' : mine === open.key ? '♥ คุณโหวตชิ้นนี้แล้ว' : mine ? '♥ เปลี่ยนมาโหวตชิ้นนี้' : '♥ โหวตให้ชิ้นนี้'}
            </button>
            {votes && <p className="text-center text-xs text-[#789568] mt-2">ตอนนี้มี {votes[open.key] || 0} โหวต</p>}
            {msg && <p className="text-center text-sm text-[#536B3E] mt-2">{msg}</p>}

            <a href={FB_URL} target="_blank" rel="noopener noreferrer" className="mt-4 block text-center text-sm font-semibold text-[#536B3E] underline decoration-[#C9A45C] underline-offset-4">
              ดูผลงานเพิ่มเติมที่เพจ เมื่อฉันจะต้อง &apos;แต่งงาน&apos; →
            </a>
          </div>
        </div>
      )}
    </>
  )
}
