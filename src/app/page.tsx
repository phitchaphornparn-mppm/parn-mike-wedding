'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

const GALLERY_PHOTOS = [
  'https://i.postimg.cc/fRZp0Twt/PM-Wedding-Card.png',
  'https://i.postimg.cc/y6MKMJgY/ch-xng-thangkar-cha-range-n-Wedding-(7).png',
  'https://i.postimg.cc/Hs5cSyPC/6A1A2566.jpg',
  'https://i.postimg.cc/Hs5cSyPG/IMG-1157.jpg',
  'https://i.postimg.cc/Hs5cSyvS/IMG-1158.jpg',
  'https://i.postimg.cc/pX8h0Fc4/IMG-1624.jpg',
  'https://i.postimg.cc/dVY7gVz0/IMG-3285.jpg',
  'https://i.postimg.cc/6pX7FpDv/IMG-3905.jpg',
  'https://i.postimg.cc/pLH93Lg9/IMG-9434.jpg',
]

function PhotoGallery() {
  const stripRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [current, setCurrent] = useState<number | null>(null)
  const state = useRef({ held: false, hover: false, open: false, resumeAt: 0 })

  const n = GALLERY_PHOTOS.length
  // repeat the photos so the strip is always long enough, then double it for a seamless loop
  const base = Array.from({ length: n * Math.ceil(10 / n) }, (_, i) => i % n)
  const tiles = [...base, ...base]

  useEffect(() => {
    state.current.open = current !== null
    if (current === null) state.current.resumeAt = performance.now() + 300
  }, [current])

  useEffect(() => {
    const strip = stripRef.current
    const track = trackRef.current
    if (!strip || !track) return
    const s = state.current
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const hold = () => { s.held = true }
    const release = () => { s.held = false; s.resumeAt = performance.now() + 1200 }
    const enter = () => { s.hover = true }
    const leave = () => { s.hover = false; s.resumeAt = performance.now() + 300 }
    const wheel = () => { s.resumeAt = performance.now() + 1200 }
    strip.addEventListener('touchstart', hold, { passive: true })
    strip.addEventListener('touchend', release)
    strip.addEventListener('touchcancel', release)
    strip.addEventListener('mouseenter', enter)
    strip.addEventListener('mouseleave', leave)
    strip.addEventListener('wheel', wheel, { passive: true })

    let pos = 0
    let last = performance.now()
    let frame = 0
    const tick = (now: number) => {
      const dt = Math.min(now - last, 100)
      last = now
      const half = track.scrollWidth / 2
      const paused = s.held || s.hover || s.open || now < s.resumeAt || still
      if (paused) pos = strip.scrollLeft
      else pos += (half / 45) * dt / 1000
      if (pos >= half) pos -= half
      if (!paused || strip.scrollLeft >= half) strip.scrollLeft = pos
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(frame)
      strip.removeEventListener('touchstart', hold)
      strip.removeEventListener('touchend', release)
      strip.removeEventListener('touchcancel', release)
      strip.removeEventListener('mouseenter', enter)
      strip.removeEventListener('mouseleave', leave)
      strip.removeEventListener('wheel', wheel)
    }
  }, [])

  useEffect(() => {
    if (current === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setCurrent(null)
      if (e.key === 'ArrowLeft') setCurrent((c) => (c === null ? c : (c - 1 + n) % n))
      if (e.key === 'ArrowRight') setCurrent((c) => (c === null ? c : (c + 1) % n))
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [current, n])

  const fade = 'linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)'

  return (
    <section className="pt-16">
      <style>{'.pm-strip::-webkit-scrollbar{display:none}'}</style>
      <h2 className="text-center font-serif text-3xl font-bold text-[#536B3E] mb-2 px-4">Our Gallery / แกลเลอรีภาพถ่าย</h2>
      <p className="text-center font-serif text-sm text-[#789568] mb-8 px-4">Pre-Wedding Moments · ช่วงเวลาแห่งความทรงจำของเรา</p>
      <div
        ref={stripRef}
        className="pm-strip overflow-x-auto overflow-y-hidden py-4"
        style={{ scrollbarWidth: 'none', WebkitMaskImage: fade, maskImage: fade }}
      >
        <div ref={trackRef} className="flex gap-5 w-max pr-5">
          {tiles.map((p, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setCurrent(p)}
              aria-label={'ขยายรูปที่ ' + (p + 1)}
              className="flex-none w-[170px] h-[230px] sm:w-[240px] sm:h-[320px] rounded-3xl overflow-hidden border-4 border-white shadow-xl cursor-zoom-in transition-transform duration-300 hover:scale-105 bg-[#789568]/20"
            >
              <img src={GALLERY_PHOTOS[p]} alt={'Gallery photo ' + (p + 1)} loading="lazy" draggable={false} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      {current !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="รูปขยาย"
          onClick={() => setCurrent(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#3c4b2d]/60 p-4"
        >
          <img
            src={GALLERY_PHOTOS[current]}
            alt={'Gallery photo ' + (current + 1)}
            onClick={(e) => e.stopPropagation()}
            className="max-w-[82vw] sm:max-w-[420px] max-h-[76vh] w-auto h-auto rounded-3xl border-4 border-white shadow-2xl object-contain bg-white"
          />
          <button type="button" aria-label="ปิด" onClick={() => setCurrent(null)} className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white text-[#536B3E] text-2xl leading-none shadow-lg">×</button>
          {n > 1 && (
            <>
              <button type="button" aria-label="รูปก่อนหน้า" onClick={(e) => { e.stopPropagation(); setCurrent((current - 1 + n) % n) }} className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white text-[#536B3E] text-2xl leading-none shadow-lg">‹</button>
              <button type="button" aria-label="รูปถัดไป" onClick={(e) => { e.stopPropagation(); setCurrent((current + 1) % n) }} className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white text-[#536B3E] text-2xl leading-none shadow-lg">›</button>
            </>
          )}
        </div>
      )}
    </section>
  )
}

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F5EBD2]">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-40 border-b border-[#789568]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <span className="font-serif font-bold text-lg text-[#789568]">PARN & MIKE</span>
            <div className="space-x-6">
              <Link href="https://drive.google.com/drive/folders/161V_cnOtutZLQOh5CVz3Es5fmMdDBX4R?usp=sharing" target="_blank" rel="noopener noreferrer" className="text-sm font-serif font-medium text-[#536B3E] hover:text-[#789568]">Photos</Link>
              <Link href="/rsvp" className="text-sm font-serif font-medium text-[#536B3E] hover:text-[#789568]">RSVP</Link>
              <Link href="/information" className="text-sm font-serif font-medium text-[#536B3E] hover:text-[#789568]">Information</Link>
              <Link href="/schedule" className="text-sm font-serif font-medium text-[#536B3E] hover:text-[#789568]">Schedule</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-b from-[#F5EBD2] via-[#EFDCC4] to-[#789568] py-24 text-center">
        <div className="max-w-2xl mx-auto px-4 space-y-8">
          {/* Couple Illustration */}
          <div className="flex justify-center">
            <div className="w-56 h-56 rounded-full shadow-2xl border-8 border-white overflow-hidden bg-white flex items-center justify-center">
              <img 
                src="https://i.postimg.cc/fRZp0Twt/PM-Wedding-Card.png" 
                alt="Couple" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Names Logo */}
          <div className="flex justify-center">
            <img 
              src="https://i.postimg.cc/XYLFVQcb/ch-xng-thangkar-cha-range-n-Wedding-(2).png" 
              alt="Names" 
              className="w-64 h-auto max-w-full"
            />
          </div>

          {/* Venue Badge */}
          <div className="bg-white/90 backdrop-blur rounded-full px-8 py-4 inline-block mx-auto shadow-lg">
            <p className="text-[#789568] font-serif font-semibold flex items-center justify-center gap-2">
              <i className="ti ti-map-pin"></i>
              2 HEARTS 1 JOURNEY
            </p>
          </div>

          {/* Main Headline - Smaller */}
          <h1 className="text-white font-serif text-2xl md:text-3xl font-bold leading-relaxed">
            Thank You<br />
            FOR BEING PART OF OUR SPECIAL DAY
          </h1>

          {/* Thai Headline */}
          <p className="text-white font-serif text-base opacity-95">
            ขอบคุณที่เป็นส่วนหนึ่งของวันพิเศษของเรา
          </p>
        </div>
      </div>
      {/* Photo Gallery */}
      <PhotoGallery />

      {/* Wedding Card */}
      <section className="max-w-4xl mx-auto px-4 pt-16">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-[#789568]/10">
          <div className="bg-gradient-to-r from-[#789568] to-[#536B3E] px-8 py-8 text-center text-white">
            <h2 className="font-serif text-2xl font-bold mb-2">Wedding Card / การ์ดแต่งงาน</h2>
            <p className="font-serif text-sm opacity-90">เปิดอ่านการ์ดเชิญของเรา</p>
          </div>

          <div className="p-4 sm:p-8">
            <div className="relative w-full overflow-hidden rounded-2xl border-2 border-[#789568]/20" style={{ paddingTop: '75%' }}>
              <iframe
                src="https://simplebooklet.com/pmweddingcard"
                title="PM Wedding Card"
                className="absolute inset-0 w-full h-full border-0"
                allowFullScreen
                allow="clipboard-write"
              ></iframe>
            </div>

            <div className="text-center mt-6">
              <a href="https://simplebooklet.com/pmweddingcard" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-[#789568] to-[#536B3E] text-white font-serif font-medium rounded-lg hover:from-[#536B3E] hover:to-[#3a4d2e] transition-all">
                เปิดการ์ดเต็มจอ / Open Full Screen
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* RSVP Card */}
          <Link href="/rsvp" className="group">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all transform hover:scale-105 border border-[#789568]/10">
              <div className="relative h-48 bg-gradient-to-b from-[#789568]/20 to-[#F5EBD2] flex items-center justify-center">
                <img src="https://i.postimg.cc/nLvSTyT6/khxng-char-wy-(2).png" alt="RSVP" className="w-28 h-28 object-contain" />
              </div>
              <div className="p-6 text-center">
                <h3 className="font-serif text-xl font-bold text-[#536B3E] mb-2">RSVP</h3>
                <p className="text-[#789568] font-serif text-sm">Confirm Your Attendance</p>
                <p className="text-[#789568] font-serif text-sm">ยืนยันการเข้าร่วม</p>
              </div>
            </div>
          </Link>

          {/* Gallery Card */}
          <Link href="https://drive.google.com/drive/folders/161V_cnOtutZLQOh5CVz3Es5fmMdDBX4R?usp=sharing" target="_blank" rel="noopener noreferrer" className="group">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all transform hover:scale-105 border border-[#789568]/10">
              <div className="relative h-48 bg-gradient-to-b from-[#789568]/20 to-[#F5EBD2] flex items-center justify-center">
                <img src="https://i.postimg.cc/fbxq5GBQ/khxng-char-wy-(3).png" alt="Gallery" className="w-28 h-28 object-contain" />
              </div>
              <div className="p-6 text-center">
                <h3 className="font-serif text-xl font-bold text-[#536B3E] mb-2">Photos</h3>
                <p className="text-[#789568] font-serif text-sm">Our Memories</p>
                <p className="text-[#789568] font-serif text-sm">ความทรงจำของเรา</p>
              </div>
            </div>
          </Link>

          {/* Information Card */}
          <Link href="/information" className="group">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all transform hover:scale-105 border border-[#789568]/10">
              <div className="relative h-48 bg-gradient-to-b from-[#789568]/20 to-[#F5EBD2] flex items-center justify-center">
                <img src="https://i.postimg.cc/MGy3tCdw/khxng-char-wy-(4).png" alt="Information" className="w-28 h-28 object-contain" />
              </div>
              <div className="p-6 text-center">
                <h3 className="font-serif text-xl font-bold text-[#536B3E] mb-2">Information</h3>
                <p className="text-[#789568] font-serif text-sm">Wedding Details</p>
                <p className="text-[#789568] font-serif text-sm">รายละเอียด</p>
              </div>
            </div>
          </Link>

          {/* Online Gift Card */}
          <Link href="https://parn-mike-wedding.netlify.app" target="_blank" rel="noopener noreferrer" className="group">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all transform hover:scale-105 border border-[#789568]/10">
              <div className="relative h-48 bg-gradient-to-b from-[#789568]/20 to-[#F5EBD2] flex items-center justify-center">
                <img src="https://i.postimg.cc/FKDRJsfP/PM-Wedding-Card-3.png" alt="Wishes & Gift" className="w-28 h-28 object-contain" />
              </div>
              <div className="p-6 text-center">
                <h3 className="font-serif text-xl font-bold text-[#536B3E] mb-2">Wishes & Gift</h3>
                <p className="text-[#789568] font-serif text-sm">Send Your Wishes Online</p>
                <p className="text-[#789568] font-serif text-sm">ร่วมอวยพรและช่วยงานออนไลน์</p>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Wedding Timeline */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <h2 className="text-center font-serif text-3xl font-bold text-[#536B3E] mb-12">
          Our Wedding Day Timeline / ตารางเวลาในวันงาน
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Ceremony */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#789568]/10 hover:shadow-xl transition-all">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-full bg-[#789568]/5 flex items-center justify-center flex-shrink-0">
                <img src="https://i.postimg.cc/SR0W5RsZ/khxng-char-wy-(5).png" alt="Ceremony" className="w-12 h-12 object-contain" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-[#536B3E]">Ceremony / พิธีสงฆ์</h3>
                <p className="text-[#789568] font-serif text-sm">07:09 AM</p>
              </div>
            </div>
            <p className="text-[#536B3E] font-serif text-sm text-center">Buddhist Blessing & Welcome</p>
          </div>

          {/* Reception */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#789568]/10 hover:shadow-xl transition-all">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-full bg-[#789568]/5 flex items-center justify-center flex-shrink-0">
                <img src="https://i.postimg.cc/yxqF5xdr/khxng-char-wy-(6).png" alt="Reception" className="w-12 h-12 object-contain" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-[#536B3E]">แห่ขันหมาก</h3>
                <p className="text-[#789568] font-serif text-sm">08:39 AM</p>
              </div>
            </div>
            <p className="text-[#536B3E] font-serif text-sm text-center">Traditional Thai Wedding Procession</p>
          </div>

          {/* Celebration */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#789568]/10 hover:shadow-xl transition-all md:col-span-2">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-full bg-[#789568]/5 flex items-center justify-center flex-shrink-0">
                <img src="https://i.postimg.cc/MHky4HHw/khxng-char-wy-(7).png" alt="Celebration" className="w-12 h-12 object-contain" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-[#536B3E]">Celebration / ฉลองร่วมกัน</h3>
                <p className="text-[#789568] font-serif text-sm">09:09 AM - 11:00 AM</p>
              </div>
            </div>
            <p className="text-[#536B3E] font-serif text-sm text-center">Water Blessing & Lunch Reception</p>
          </div>
        </div>
      </section>

      {/* Guest Features */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Schedule */}
          <Link href="/schedule">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all transform hover:scale-105 border border-[#789568]/10">
              <div className="h-32 bg-gradient-to-r from-[#789568] to-[#536B3E] flex items-center justify-center">
                <img src="https://i.postimg.cc/dDMX6rgf/khxng-char-wy-(16).png" alt="Schedule" className="w-20 h-20 object-contain" />
              </div>
              <div className="p-6 text-center">
                <h3 className="font-serif text-2xl font-bold text-[#536B3E] mb-2">Schedule</h3>
                <p className="text-[#789568] font-serif">See the detailed timeline</p>
                <p className="text-[#789568] font-serif text-sm">ดูตารางเวลาโดยละเอียด</p>
              </div>
            </div>
          </Link>

          {/* Share Photos */}
          <Link href="/upload">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all transform hover:scale-105 border border-[#789568]/10">
              <div className="h-32 bg-gradient-to-r from-[#C9A45C] to-[#B8934A] flex items-center justify-center">
                <img src="https://i.postimg.cc/s1F8m7bk/khxng-char-wy-(17).png" alt="Share Photo" className="w-20 h-20 object-contain" />
              </div>
              <div className="p-6 text-center">
                <h3 className="font-serif text-2xl font-bold text-[#536B3E] mb-2">Share Photos</h3>
                <p className="text-[#789568] font-serif">Upload your memories</p>
                <p className="text-[#789568] font-serif text-sm">แชร์ความทรงจำของคุณ</p>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* CTA Buttons */}
      <section className="max-w-2xl mx-auto px-4 py-12 text-center">
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/rsvp" className="px-12 py-4 bg-gradient-to-r from-[#789568] to-[#536B3E] text-white font-serif font-bold rounded-full hover:from-[#536B3E] hover:to-[#3a4d2e] shadow-lg transition-all">
            RSVP Now / ยืนยันเลย
          </Link>
          <Link href="/upload" className="px-12 py-4 bg-white border-2 border-[#789568] text-[#789568] font-serif font-bold rounded-full hover:bg-[#789568] hover:text-white shadow-lg transition-all">
            Share Photo / แชร์รูป
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-[#536B3E] to-[#3a4d2e] text-white py-12 mt-16 border-t border-[#789568]/20">
        <div className="max-w-6xl mx-auto px-4 text-center space-y-3">
          <p className="font-serif text-lg font-semibold text-[#B7A286]">PARN & MIKE</p>
          <p className="text-sm text-[#B7A286]">© 2026 Our Special Day. All our love.</p>
          <p className="text-xs text-[#B7A286]/80">Created by Bride Parn</p>
        </div>
      </footer>
    </div>
  )
}
