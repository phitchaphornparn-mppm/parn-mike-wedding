'use client'

import Link from 'next/link'

export default function SchedulePage() {
  const schedule = [
    { 
      time: '07:09', 
      activity: 'Guest Registration & Buddhist Ceremony',
      activityTH: 'ลงทะเบียนแขกและพิธีสงฆ์',
      description: 'Welcome & Check-in',
      icon: 'https://i.postimg.cc/26JDfRNk/khxng-char-wy-(8).png'
    },
    {
      time: '08:39',
      activity: 'Khan Maak Procession',
      activityTH: 'แห่ขันหมาก',
      description: 'Traditional Thai Wedding Procession',
      icon: 'https://i.postimg.cc/cCnNx90p/khxng-char-wy-(9).png'
    },
    { 
      time: '09:09', 
      activity: 'Water Blessing Ceremony',
      activityTH: 'พิธีรดน้ำสังข์',
      description: 'A Traditional Thai Wedding Blessing',
      icon: 'https://i.postimg.cc/cCnNx9dS/khxng-char-wy-(10).png'
    },
    { 
      time: '11:00', 
      activity: 'Guest Registration & Lunch Reception',
      activityTH: 'ลงทะเบียนแขกเข้างาน + รับประทานอาหารกลางวัน',
      description: 'Lunch & Celebration',
      icon: 'https://i.postimg.cc/5yCM47f9/khxng-char-wy-(11).png'
    },
  ]

  return (
    <div className="min-h-screen bg-[#F5EBD2]">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-40 border-b border-[#789568]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-3">
              <span className="font-serif font-bold text-base sm:text-lg text-[#789568] whitespace-nowrap">PARN & MIKE</span>
            </Link>
            <div className="space-x-3 sm:space-x-6 whitespace-nowrap">
              <Link href="https://drive.google.com/drive/folders/161V_cnOtutZLQOh5CVz3Es5fmMdDBX4R?usp=sharing" target="_blank" rel="noopener noreferrer" className="text-xs sm:text-sm font-serif font-medium text-[#536B3E] hover:text-[#789568] transition-colors">Photos</Link>
              <Link href="/rsvp" className="text-xs sm:text-sm font-serif font-medium text-[#536B3E] hover:text-[#789568] transition-colors">RSVP</Link>
              <Link href="/information" className="text-xs sm:text-sm font-serif font-medium text-[#536B3E] hover:text-[#789568] transition-colors">Information</Link>
              <Link href="/schedule" className="text-xs sm:text-sm font-serif font-bold text-[#789568]">Schedule</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main */}
      <main className="max-w-4xl mx-auto px-4 py-12 sm:py-16">
        <div className="text-center mb-12">
          <p className="text-[#789568] font-serif font-semibold tracking-[0.3em] text-sm mb-4">2 HEARTS · 1 JOURNEY</p>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#536B3E] mb-2">Wedding Schedule</h1>
          <p className="font-serif text-lg text-[#536B3E] mb-6">กำหนดการวันงาน</p>
          <div className="bg-white rounded-3xl shadow-lg border border-[#789568]/10 grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#789568]/15">
            <div className="px-6 py-6">
              <p className="text-[#C9A45C] font-serif font-semibold tracking-[0.2em] text-xs mb-2">DATE · วันที่</p>
              <p className="text-[#536B3E] font-serif text-lg font-bold">Sunday, 6 December 2026</p>
              <p className="text-[#789568] font-serif text-sm mt-1">วันอาทิตย์ที่ 6 ธันวาคม 2569</p>
            </div>
            <div className="px-6 py-6">
              <p className="text-[#C9A45C] font-serif font-semibold tracking-[0.2em] text-xs mb-2">TIME · เวลา</p>
              <p className="text-[#536B3E] font-serif text-lg font-bold">From 07:09 AM</p>
              <p className="text-[#789568] font-serif text-sm mt-1">เริ่ม 07:09 น. เป็นต้นไป</p>
            </div>
            <div className="px-6 py-6">
              <p className="text-[#C9A45C] font-serif font-semibold tracking-[0.2em] text-xs mb-2">VENUE · สถานที่</p>
              <p className="text-[#536B3E] font-serif text-lg font-bold">The School Auditorium</p>
              <p className="text-[#789568] font-serif text-sm mt-1">โรงเรียนกระทุ่มแบน &quot;วิเศษสมุทคุณ&quot;</p>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative mb-16">
          <div className="absolute top-6 bottom-6 left-7 md:left-1/2 w-0.5 -translate-x-1/2 bg-gradient-to-b from-[#C9A45C] to-[#789568] rounded-full"></div>
          <div className="space-y-6 md:space-y-10">
            {schedule.map((item, idx) => (
              <div key={idx} className="relative flex items-start gap-4 md:grid md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-8">
                <div className={idx % 2 === 0 ? 'hidden md:block md:col-start-3 md:row-start-1 text-left' : 'hidden md:block md:col-start-1 md:row-start-1 text-right'}>
                  <p className="font-serif text-3xl font-bold text-[#789568]">{item.time} น.</p>
                  <p className="font-serif text-sm text-[#B7A286] mt-1">{item.description}</p>
                </div>

                {idx === schedule.length - 1 && (
                  <div className="md:hidden absolute left-7 top-14 bottom-0 w-2 -translate-x-1/2 bg-[#F5EBD2]"></div>
                )}

                <div className="relative z-10 md:col-start-2 md:row-start-1 w-14 h-14 md:w-20 md:h-20 rounded-full bg-[#97a889] flex items-center justify-center shadow-lg border-4 border-white flex-shrink-0">
                  <img
                    src={item.icon}
                    alt={item.activity}
                    className="w-8 h-8 md:w-12 md:h-12 object-contain"
                  />
                </div>

                <div className={(idx % 2 === 0 ? 'md:col-start-1 md:text-right' : 'md:col-start-3 md:text-left') + ' md:row-start-1 flex-1 bg-white rounded-2xl shadow-lg p-5 sm:p-6 border border-[#789568]/10 hover:shadow-xl transition-shadow duration-300'}>
                  <span className="md:hidden inline-block px-3 py-1 rounded-full bg-[#789568]/10 text-sm font-serif font-bold text-[#536B3E] mb-3">{item.time} น.</span>
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-[#536B3E] mb-1">
                    {item.activity}
                  </h3>
                  <p className="font-serif text-sm text-[#789568] font-medium">
                    {item.activityTH}
                  </p>
                  <p className="md:hidden text-[#B7A286] font-serif text-sm mt-3">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Good to Know Section */}
        <div className="bg-gradient-to-r from-[#789568]/15 to-[#536B3E]/15 border-2 border-[#789568]/30 rounded-2xl p-6 sm:p-8 mb-8">
          <h2 className="font-serif text-2xl font-bold text-[#536B3E] mb-6 text-center">
            Good to Know / ข้อมูลน่ารู้
          </h2>
          <ul className="grid md:grid-cols-2 gap-x-8 gap-y-4 text-[#536B3E] font-serif font-medium">
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-[#789568] mt-2 flex-shrink-0"></span>
              <span>Come a little early and make yourself comfortable<br /><span className="text-sm font-normal text-[#789568]">มาถึงก่อนเวลาเล็กน้อย จะได้ไม่ต้องรีบ</span></span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-[#789568] mt-2 flex-shrink-0"></span>
              <span>Dress up and celebrate with us<br /><span className="text-sm font-normal text-[#789568]">แต่งตัวสวยหล่อมาฉลองด้วยกัน</span></span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-[#789568] mt-2 flex-shrink-0"></span>
              <span>Parking is available on-site<br /><span className="text-sm font-normal text-[#789568]">มีที่จอดรถในบริเวณงาน</span></span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-[#789568] mt-2 flex-shrink-0"></span>
              <span>We can&apos;t wait to celebrate with you!<br /><span className="text-sm font-normal text-[#789568]">เราตั้งตารอที่จะได้ฉลองกับทุกคน</span></span>
            </li>
          </ul>
        </div>

        {/* Tagline */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-[#789568]/10 text-center">
          <p className="font-serif text-2xl font-bold text-[#789568] mb-2">PARN & MIKE</p>
          <p className="font-serif text-lg text-[#536B3E] font-light tracking-wide mb-6">2 HEARTS · 1 JOURNEY</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/rsvp" className="px-10 py-3 bg-gradient-to-r from-[#789568] to-[#536B3E] text-white font-serif font-bold rounded-full shadow-lg hover:from-[#536B3E] hover:to-[#3a4d2e] transition-all">
              RSVP / ยืนยันการเข้าร่วม
            </Link>
            <a href="https://maps.app.goo.gl/rggfEtMGCi5gQyty5" target="_blank" rel="noopener noreferrer" className="px-10 py-3 border-2 border-[#789568] text-[#789568] font-serif font-bold rounded-full hover:bg-[#789568] hover:text-white transition-all">
              Map / ดูแผนที่
            </a>
          </div>
        </div>
      </main>

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
