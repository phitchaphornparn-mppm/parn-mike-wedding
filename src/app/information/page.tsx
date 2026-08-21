'use client'

import Link from 'next/link'

export default function InformationPage() {
  return (
    <div className="min-h-screen bg-[#F5EBD2]">
      <nav className="bg-white shadow-sm sticky top-0 z-40 border-b border-[#789568]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-3">
              <span className="font-serif font-bold text-lg text-[#789568]">PARN & MIKE</span>
            </Link>
            <div className="space-x-6">
              <Link href="/photos" className="text-sm font-serif font-medium text-[#536B3E] hover:text-[#789568]">Photos</Link>
              <Link href="/rsvp" className="text-sm font-serif font-medium text-[#536B3E] hover:text-[#789568]">RSVP</Link>
              <Link href="/schedule" className="text-sm font-serif font-medium text-[#536B3E] hover:text-[#789568]">Schedule</Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl font-bold text-[#536B3E] mb-3 flex items-center justify-center gap-3">
            <i className="ti ti-info-circle text-[#789568]"></i>
            Wedding Information
          </h1>
          <p className="text-[#789568] font-serif text-lg">ข้อมูลงานแต่ง</p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-[#789568]/10 mb-8">
          <div className="bg-gradient-to-r from-[#789568] to-[#536B3E] px-8 py-8 text-center text-white">
            <h2 className="font-serif text-2xl font-bold mb-2">Venue / สถานที่</h2>
            <p className="font-serif text-sm opacity-90">จัดงานที่ไหน</p>
          </div>

          <div className="p-8 space-y-6">
            <div className="bg-gradient-to-br from-[#F5EBD2]/50 to-white rounded-2xl p-8 border-2 border-[#789568]/20">
              <div className="flex items-start gap-6">
                <div className="w-20 h-20 rounded-full bg-[#789568]/10 flex items-center justify-center flex-shrink-0">
                  <img src="https://i.postimg.cc/90tmGmn9/khxng-char-wy-(18).png" alt="Venue" className="w-16 h-16 object-contain" />
                </div>
                <div className="flex-1">
                  <h3 className="font-serif text-2xl font-bold text-[#536B3E] mb-2">2 HEARTS 1 JOURNEY</h3>
                  <p className="font-serif text-lg text-[#789568] mb-2">The School Auditorium</p>
                  <p className="font-serif text-sm text-[#789568] mb-4">โรงเรียนกระทุ่มแบน "วิเศษสมุทคุณ"</p>
                  <a href="https://maps.app.goo.gl/rggfEtMGCi5gQyty5" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-[#789568] to-[#536B3E] text-white font-serif font-medium rounded-lg hover:from-[#536B3E] hover:to-[#3a4d2e] transition-all">
                    <img src="https://i.postimg.cc/KjrGnGHB/khxng-char-wy-(19).png" alt="Location" className="w-5 h-5 object-contain" />
                    View on Google Maps / ดูบนแผนที่
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-[#789568]/10 mb-8">
          <div className="bg-gradient-to-r from-[#789568] to-[#536B3E] px-8 py-8 text-center text-white">
            <h2 className="font-serif text-2xl font-bold mb-2">Schedule / ตารางเวลา</h2>
            <p className="font-serif text-sm opacity-90">ตารางเวลาในวันงาน</p>
          </div>

          <div className="p-8 space-y-6">
            <div className="bg-gradient-to-br from-[#F5EBD2]/50 to-white rounded-2xl p-6 border-2 border-[#789568]/20">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full bg-[#789568]/10 flex items-center justify-center flex-shrink-0">
                  <img src="https://i.postimg.cc/ZYC7MsY4/khxng-char-wy-(13).png" alt="Ceremony" className="w-12 h-12 object-contain" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="inline-block px-4 py-1 bg-[#789568]/10 text-[#789568] font-serif font-bold rounded-full text-sm">07:09 AM</span>
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#536B3E]">Ceremony / พิธีสงฆ์</h3>
                  <p className="font-serif text-sm text-[#789568] mt-1">Buddhist Blessing & Guest Registration</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#F5EBD2]/50 to-white rounded-2xl p-6 border-2 border-[#789568]/20">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full bg-[#789568]/10 flex items-center justify-center flex-shrink-0">
                  <img src="https://i.postimg.cc/yxqF5xdr/khxng-char-wy-(6).png" alt="Reception" className="w-12 h-12 object-contain" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="inline-block px-4 py-1 bg-[#789568]/10 text-[#789568] font-serif font-bold rounded-full text-sm">11:00 AM</span>
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#536B3E]">Reception / ลงทะเบียนและฉลอง</h3>
                  <p className="font-serif text-sm text-[#789568] mt-1">Lunch Reception</p>
                </div>
              </div>
            </div>

            <div className="bg-[#789568]/10 border border-[#789568]/30 rounded-lg p-4">
              <p className="text-sm text-[#536B3E] font-serif">
                <i className="ti ti-clock text-[#789568] mr-2"></i>
                <strong>โปรดมาถึงสถานที่ก่อนเวลาราว 15-20 นาที</strong> เพื่อให้มีเวลาสำหรับลงทะเบียน
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-[#789568]/10">
          <div className="bg-gradient-to-r from-[#789568] to-[#536B3E] px-8 py-8 text-center text-white">
            <h2 className="font-serif text-2xl font-bold mb-2">Contact / ติดต่อ</h2>
            <p className="font-serif text-sm opacity-90">ข้อมูลติดต่อจัดงาน</p>
          </div>

          <div className="p-8 space-y-6">
            <div>
              <h3 className="font-serif text-lg font-bold text-[#536B3E] mb-4 flex items-center gap-2">
                <img src="https://i.postimg.cc/2yhXX3Qh/khxng-char-wy-(15).png" alt="Phone" className="w-6 h-6 object-contain" />
                Phone / เบอร์โทรศัพท์
              </h3>
              <div className="space-y-3">
                <a href="tel:0625563261" className="flex items-center gap-4 p-4 bg-gradient-to-r from-[#F5EBD2]/50 to-white rounded-xl border border-[#789568]/20 hover:shadow-lg transition-all">
                  <div className="w-14 h-14 rounded-full bg-[#789568]/10 flex items-center justify-center flex-shrink-0">
                    <img src="https://i.postimg.cc/DzJBm8S6/khxng-char-wy-(22).png" alt="Bride" className="w-10 h-10 object-contain" />
                  </div>
                  <div>
                    <p className="font-serif font-bold text-[#536B3E]">062-556-3261</p>
                    <p className="font-serif text-sm text-[#789568]">เจ้าสาว (Parn)</p>
                  </div>
                </a>

                <a href="tel:0895241646" className="flex items-center gap-4 p-4 bg-gradient-to-r from-[#F5EBD2]/50 to-white rounded-xl border border-[#789568]/20 hover:shadow-lg transition-all">
                  <div className="w-14 h-14 rounded-full bg-[#789568]/10 flex items-center justify-center flex-shrink-0">
                    <img src="https://i.postimg.cc/9fRJzrDB/khxng-char-wy-(21).png" alt="Groom" className="w-10 h-10 object-contain" />
                  </div>
                  <div>
                    <p className="font-serif font-bold text-[#536B3E]">089-524-1646</p>
                    <p className="font-serif text-sm text-[#789568]">เจ้าบ่าว (Mike)</p>
                  </div>
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-serif text-lg font-bold text-[#536B3E] mb-4 flex items-center gap-2">
                <i className="ti ti-brand-line text-[#789568]"></i>
                LINE OpenChat / ไลน์โอเพนแชท
              </h3>
              <a href="https://line.me/ti/g2/E0FCGaQ7sQEvrWL4dVANeuzHaQTFgsYquTETpw?utm_source=invitation&utm_medium=link_copy&utm_campaign=default" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 bg-gradient-to-r from-[#F5EBD2]/50 to-white rounded-xl border border-[#789568]/20 hover:shadow-lg transition-all">
                <div className="w-14 h-14 rounded-full bg-[#789568]/10 flex items-center justify-center flex-shrink-0">
                  <i className="ti ti-brand-line text-[#789568] text-2xl"></i>
                </div>
                <div>
                  <p className="font-serif font-bold text-[#536B3E]">PARN ♡ MIKE | THE WEDDING LOUNGE</p>
                  <p className="font-serif text-sm text-[#789568] mt-1">เข้าร่วมกลุ่มแชทของเรา</p>
                </div>
              </a>
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-[#536B3E] mb-4 flex items-center gap-2">
                <img src="https://i.postimg.cc/NjPdg1jR/khxng-char-wy-(20).png" alt="Website" className="w-6 h-6 object-contain" />
                Visit Our Website / เว็บไซต์ของเรา
              </h3>
              <a href="https://parn-mike-wedding.netlify.app" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 bg-gradient-to-r from-[#F5EBD2]/50 to-white rounded-xl border border-[#789568]/20 hover:shadow-lg transition-all">
                <div className="w-14 h-14 rounded-full bg-[#789568]/10 flex items-center justify-center flex-shrink-0">
                  <img src="https://i.postimg.cc/NjPdg1jR/khxng-char-wy-(20).png" alt="Website Icon" className="w-10 h-10 object-contain" />
                </div>
                <div>
                  <p className="font-serif font-bold text-[#536B3E]">parn-mike-wedding.netlify.app</p>
                  <p className="font-serif text-sm text-[#789568]">https://parn-mike-wedding.netlify.app</p>
                </div>
              </a>
            </div>

            <div className="bg-[#C9A45C]/10 border-2 border-[#C9A45C]/30 rounded-2xl p-6">
              <h4 className="font-serif font-bold text-[#536B3E] mb-3 flex items-center gap-2">
                <i className="ti ti-bulb text-[#C9A45C]"></i>
                Helpful Tips / คำแนะนำ
              </h4>
              <ul className="font-serif text-sm text-[#536B3E] space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-[#789568] mt-1">✓</span>
                  <span>มาถึงก่อนเวลาเพื่อมีเวลาสำหรับลงทะเบียน</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#789568] mt-1">✓</span>
                  <span>มีที่จอดรถและความสะดวกอื่น ๆ ในสถานที่</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#789568] mt-1">✓</span>
                  <span>ขอบคุณที่เข้าร่วมฉลองวันพิเศษนี้ไปกับเรา</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>

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
