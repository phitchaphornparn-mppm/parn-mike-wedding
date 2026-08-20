'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F5EBD2]">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-40 border-b border-[#789568]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <span className="font-serif font-bold text-lg text-[#789568]">PARN & MIKE</span>
            <div className="space-x-6">
              <Link href="/photos" className="text-sm font-serif font-medium text-[#536B3E] hover:text-[#789568]">Photos</Link>
              <Link href="/rsvp" className="text-sm font-serif font-medium text-[#536B3E] hover:text-[#789568]">RSVP</Link>
              <Link href="/information" className="text-sm font-serif font-medium text-[#536B3E] hover:text-[#789568]">Information</Link>
              <Link href="/schedule" className="text-sm font-serif font-medium text-[#536B3E] hover:text-[#789568]">Schedule</Link>
              <a href="https://parn-mike-wedding.netlify.app" target="_blank" rel="noopener noreferrer" className="text-sm font-serif font-medium text-[#C9A45C] hover:text-[#789568]">อวยพร</a>
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
              Wiset Samutkhun School
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
                src="https://publuu.com/flip-book/1162216/2585463/page/1?embed"
                title="PM Wedding Card"
                className="absolute inset-0 w-full h-full border-0"
                allowFullScreen
                allow="clipboard-write"
              ></iframe>
            </div>

            <div className="text-center mt-6">
              <a href="https://publuu.com/flip-book/1162216/2585463" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-[#789568] to-[#536B3E] text-white font-serif font-medium rounded-lg hover:from-[#536B3E] hover:to-[#3a4d2e] transition-all">
                เปิดการ์ดเต็มจอ / Open Full Screen
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
          <Link href="/photos" className="group">
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
                <h3 className="font-serif text-lg font-bold text-[#536B3E]">Reception / งานแสดง</h3>
                <p className="text-[#789568] font-serif text-sm">08:39 AM</p>
              </div>
            </div>
            <p className="text-[#536B3E] font-serif text-sm text-center">Khan Maak Procession</p>
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
