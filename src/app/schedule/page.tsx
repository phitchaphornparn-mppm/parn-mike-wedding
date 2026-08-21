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
      activity: 'แห่ขันหมาก',
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
      activity: 'Lunch Reception',
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
              <span className="font-serif font-bold text-lg text-[#789568]">PARN & MIKE</span>
            </Link>
            <div className="space-x-6">
              <Link href="/rsvp" className="text-sm font-serif font-medium text-[#536B3E] hover:text-[#789568] transition-colors">
                RSVP
              </Link>
              <Link href="/information" className="text-sm font-serif font-medium text-[#536B3E] hover:text-[#789568] transition-colors">
                Information
              </Link>
              <Link href="/photos" className="text-sm font-serif font-medium text-[#536B3E] hover:text-[#789568] transition-colors">
                Photos
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main */}
      <main className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="font-serif text-4xl font-bold text-[#536B3E] mb-3 flex items-center justify-center gap-3">
            <i className="ti ti-clock text-[#789568]"></i>
            Wedding Schedule
          </h1>
          <p className="text-[#789568] font-serif text-lg font-semibold">6 December 2026</p>
        </div>

        {/* Timeline */}
        <div className="space-y-6 mb-16">
          {schedule.map((item, idx) => (
            <div key={idx} className="flex gap-6">
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-[#97a889] flex items-center justify-center shadow-lg border-4 border-white">
                  <img 
                    src={item.icon}
                    alt={item.activity}
                    className="w-12 h-12 object-contain"
                  />
                </div>
                {idx < schedule.length - 1 && (
                  <div className="w-1 h-16 bg-gradient-to-b from-[#C9A45C] to-[#789568] my-2"></div>
                )}
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#789568]/10 flex-1 hover:shadow-xl transition-shadow duration-300 mt-2">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-[#97a889]/10 flex items-center justify-center">
                    <span className="text-sm font-serif font-bold text-[#97a889]">{item.time}</span>
                  </div>
                </div>
                <h3 className="font-serif text-xl font-bold text-[#536B3E] mb-1">
                  {item.activity}
                </h3>
                <p className="font-serif text-sm text-[#789568] font-medium mb-3">
                  {item.activityTH}
                </p>
                <p className="text-[#B7A286] font-serif text-sm">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Good to Know Section */}
        <div className="bg-gradient-to-r from-[#789568]/15 to-[#536B3E]/15 border-2 border-[#789568]/30 rounded-2xl p-8 mb-8">
          <h2 className="font-serif text-2xl font-bold text-[#536B3E] mb-6 flex items-center gap-2">
            <i className="ti ti-info-circle text-[#789568] text-2xl"></i>
            Good to Know
          </h2>
          <ul className="space-y-3 text-[#536B3E] font-serif font-medium">
            <li className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#789568]"></span>
              Come a little early and make yourself comfortable
            </li>
            <li className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#789568]"></span>
              Dress up and celebrate with us
            </li>
            <li className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#789568]"></span>
              Parking is available on-site
            </li>
            <li className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#789568]"></span>
              We can't wait to celebrate with you!
            </li>
          </ul>
        </div>

        {/* Tagline */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-[#789568]/10 text-center">
          <p className="font-serif text-2xl font-bold text-[#789568] mb-2">PARN & MIKE</p>
          <p className="font-serif text-lg text-[#536B3E] font-light tracking-wide mb-4">2 HEARTS · 1 JOURNEY</p>
          <div className="space-y-2 text-[#B7A286] font-serif text-sm">
            <p>© 2026 Our Special Day</p>
            <p>Created with love by Bride Parn</p>
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
