'use client'

import { useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

export default function RSVPPage() {
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [isAttending, setIsAttending] = useState<'yes' | 'no' | null>(null)
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    party_size: '1',
    attending: 'yes',
    dietary_notes: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setLoading(true)
      const { error } = await supabase.from('guests').insert([{
        full_name: formData.full_name,
        email: formData.email || null,
        phone: formData.phone || null,
        party_size: parseInt(formData.party_size),
        rsvp_status: formData.attending === 'yes' ? 'confirmed' : 'declined',
        dietary_notes: formData.dietary_notes || null,
      }])

      if (error) {
        alert('Error submitting RSVP: ' + error.message)
      } else {
        setSubmitted(true)
        setIsAttending(formData.attending === 'yes' ? 'yes' : 'no')
        setFormData({
          full_name: '',
          email: '',
          phone: '',
          party_size: '1',
          attending: 'yes',
          dietary_notes: '',
        })
      }
    } catch (err: any) {
      alert('Error: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const confirmationYes = submitted && isAttending === 'yes'
  const confirmationNo = submitted && isAttending === 'no'
  const showForm = !submitted

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
              <Link href="/information" className="text-sm font-serif font-medium text-[#536B3E] hover:text-[#789568]">Information</Link>
              <Link href="/schedule" className="text-sm font-serif font-medium text-[#536B3E] hover:text-[#789568]">Schedule</Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-2xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl font-bold text-[#536B3E] mb-3 flex items-center justify-center gap-3">
            <i className="ti ti-heart text-[#789568]"></i>
            RSVP
          </h1>
          <p className="text-[#789568] font-serif text-lg">Please confirm your attendance by 15 November 2026</p>
          <p className="text-[#789568] font-serif text-sm mt-2">รบกวนยืนยันการมาร่วมงานภายในวันที่ 15 พฤศจิกายน 2569 นะคะ</p>
        </div>

        {confirmationYes && (
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-[#789568]/10 p-12 text-center">
            <div className="mb-6 flex justify-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#789568] to-[#536B3E] flex items-center justify-center">
                <i className="ti ti-check text-white text-3xl"></i>
              </div>
            </div>
            <h2 className="font-serif text-3xl font-bold text-[#536B3E] mb-1">Thank You!</h2>
            <h2 className="font-serif text-3xl font-bold text-[#536B3E] mb-3">ขอบคุณมากนะคะ!</h2>
            <p className="text-[#789568] font-serif text-lg mb-2">Your RSVP has been received</p>
            <p className="text-[#789568] font-serif text-sm mb-6">เราได้รับคำตอบของคุณเรียบร้อยแล้วนะคะ</p>
            <div className="space-y-2 text-[#B7A286] font-serif">
              <p className="text-2xl font-bold mb-4 text-[#C9A45C]">ดีใจที่จะได้ฉลองวันพิเศษนี้ไปด้วยกันนะคะ!</p>
              <p className="text-sm mb-6">6 December 2026 · Wiset Samutkhun School</p>
              <Link href="/" className="inline-flex items-center gap-2 px-6 py-2 bg-white border-2 border-[#789568] text-[#789568] font-serif font-medium rounded-lg hover:bg-[#789568] hover:text-white transition-all">
                Back to Home / กลับหน้าแรก
              </Link>
            </div>
          </div>
        )}

        {confirmationNo && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-[#789568]/10 p-8 text-center">
              <div className="mb-6 flex justify-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#789568] to-[#536B3E] flex items-center justify-center">
                  <i className="ti ti-check text-white text-3xl"></i>
                </div>
              </div>
              <h2 className="font-serif text-2xl font-bold text-[#536B3E] mb-2">ขอบคุณค่ะ!</h2>
              <p className="text-[#789568] font-serif text-base">เราได้รับคำตอบของคุณเรียบร้อยแล้วนะคะ</p>
            </div>

            <div className="bg-gradient-to-b from-[#F5EBD2] to-white rounded-3xl shadow-2xl overflow-hidden border-2 border-[#C9A45C]/30 p-8">
              <div className="text-center mb-8">
                <p className="text-[#536B3E] font-serif font-semibold mb-2">เสียดายที่ไม่ได้เจอกันในวันงาน</p>
                <p className="text-[#C9A45C] font-serif text-2xl font-bold">แต่ฝากคำอวยพรไว้กับเราได้นะคะ 💚</p>
              </div>

              <a href="https://parn-mike-wedding.netlify.app" target="_blank" rel="noopener noreferrer" className="block w-full px-8 py-4 bg-gradient-to-r from-[#789568] to-[#536B3E] text-white font-serif font-bold rounded-xl hover:from-[#536B3E] hover:to-[#3a4d2e] transition-all mb-6 text-center">
                <i className="ti ti-world-www mr-2"></i>
                Visit Our Wedding Site / เข้าชมเว็บไซต์งานแต่ง
              </a>

              <p className="text-sm text-[#789568] font-serif text-center mb-6">
                parn-mike-wedding.netlify.app
              </p>
            </div>

            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-[#789568]/10">
              <div className="bg-gradient-to-r from-[#789568] to-[#536B3E] px-8 py-8 text-center text-white">
                <h2 className="font-serif text-2xl font-bold mb-2">Contact / ติดต่อ</h2>
                <p className="font-serif text-sm opacity-90">ถ้ามีอะไรอยากถาม</p>
              </div>

              <div className="p-8 space-y-6">
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#536B3E] mb-4 flex items-center gap-2">
                    <img src="https://i.postimg.cc/2yhXX3Qh/khxng-char-wy-(15).png" alt="Phone" className="w-6 h-6 object-contain" />
                    Phone / เบอร์โทรศัพท์
                  </h3>
                  <div className="space-y-3">
                    <a href="tel:0625563261" className="flex items-center gap-4 p-4 bg-gradient-to-r from-[#F5EBD2]/50 to-white rounded-xl border border-[#789568]/20 hover:shadow-lg transition-all">
                      <div className="w-12 h-12 rounded-full bg-[#789568]/10 flex items-center justify-center">
                        <i className="ti ti-phone text-[#789568]"></i>
                      </div>
                      <div>
                        <p className="font-serif font-bold text-[#536B3E]">062-556-3261</p>
                        <p className="font-serif text-sm text-[#789568]">เจ้าสาว (Parn)</p>
                      </div>
                    </a>

                    <a href="tel:0895241646" className="flex items-center gap-4 p-4 bg-gradient-to-r from-[#F5EBD2]/50 to-white rounded-xl border border-[#789568]/20 hover:shadow-lg transition-all">
                      <div className="w-12 h-12 rounded-full bg-[#789568]/10 flex items-center justify-center">
                        <i className="ti ti-phone text-[#789568]"></i>
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
                    <img src="https://i.postimg.cc/50ZR38CB/khxng-char-wy-(14).png" alt="Website" className="w-6 h-6 object-contain" />
                    Online / ออนไลน์
                  </h3>
                  <a href="https://parn-mike-wedding.netlify.app" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 bg-gradient-to-r from-[#F5EBD2]/50 to-white rounded-xl border border-[#789568]/20 hover:shadow-lg transition-all">
                    <div className="w-12 h-12 rounded-full bg-[#789568]/10 flex items-center justify-center">
                      <i className="ti ti-world-www text-[#789568]"></i>
                    </div>
                    <div>
                      <p className="font-serif font-bold text-[#536B3E]">Send Wishes Online</p>
                      <p className="font-serif text-sm text-[#789568]">parn-mike-wedding.netlify.app</p>
                    </div>
                  </a>
                </div>

                <div>
                  <h3 className="font-serif text-lg font-bold text-[#536B3E] mb-4 flex items-center gap-2">
                    <img src="https://i.postimg.cc/KjrGnGHB/khxng-char-wy-(19).png" alt="Location" className="w-6 h-6 object-contain" />
                    Venue / สถานที่
                  </h3>
                  <a href="https://maps.app.goo.gl/rggfEtMGCi5gQyty5" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 bg-gradient-to-r from-[#F5EBD2]/50 to-white rounded-xl border border-[#789568]/20 hover:shadow-lg transition-all">
                    <div className="w-12 h-12 rounded-full bg-[#789568]/10 flex items-center justify-center">
                      <i className="ti ti-map-pin text-[#789568]"></i>
                    </div>
                    <div>
                      <p className="font-serif font-bold text-[#536B3E]">Wiset Samutkhun School</p>
                      <p className="font-serif text-sm text-[#789568]">View on Google Maps</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            <div className="text-center">
              <Link href="/" className="inline-flex items-center gap-2 px-6 py-2 bg-white border-2 border-[#789568] text-[#789568] font-serif font-medium rounded-lg hover:bg-[#789568] hover:text-white transition-all">
                Back to Home / กลับหน้าแรก
              </Link>
            </div>
          </div>
        )}

        {showForm && (
          <>
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-[#789568]/10">
              <div className="bg-gradient-to-r from-[#789568] to-[#536B3E] px-8 py-12 text-center text-white">
                <p className="font-serif text-lg opacity-90 mb-1">We would love to celebrate with you!</p>
                <p className="font-serif text-lg opacity-90 mb-3">ดีใจที่จะได้ฉลองวันพิเศษนี้ไปด้วยกันนะคะ!</p>
                <p className="font-serif text-2xl font-bold text-[#C9A45C]">6 December 2026</p>
              </div>

              <div className="p-8 md:p-12">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="flex items-center gap-2 font-serif text-sm font-semibold text-[#536B3E] mb-2">
                      <i className="ti ti-user text-[#789568]"></i>
                      Full Name / ชื่อ-นามสกุล *
                    </label>
                    <p className="text-xs text-[#789568] mb-2 font-serif">ขอชื่อ-นามสกุลของคุณหน่อยนะคะ</p>
                    <input type="text" name="full_name" required value={formData.full_name} onChange={handleChange} placeholder="ชื่อ-นามสกุลของคุณ" className="w-full px-4 py-3 border border-[#789568]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#789568] bg-[#F5EBD2]/50 font-serif" />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 font-serif text-sm font-semibold text-[#536B3E] mb-2">
                      <i className="ti ti-mail text-[#789568]"></i>
                      Email
                    </label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="your@email.com" className="w-full px-4 py-3 border border-[#789568]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#789568] bg-[#F5EBD2]/50 font-serif" />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 font-serif text-sm font-semibold text-[#536B3E] mb-2">
                      <img src="https://i.postimg.cc/2yhXX3Qh/khxng-char-wy-(15).png" alt="Phone" className="w-5 h-5" />
                      Phone / เบอร์โทรศัพท์สำหรับติดต่อ
                    </label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+66 (XX) XXX-XXXX" className="w-full px-4 py-3 border border-[#789568]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#789568] bg-[#F5EBD2]/50 font-serif" />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 font-serif text-sm font-semibold text-[#536B3E] mb-2">
                      <i className="ti ti-users text-[#789568]"></i>
                      Number of Guests / มากันกี่ท่านเอ่ย? *
                    </label>
                    <select name="party_size" required value={formData.party_size} onChange={handleChange} className="w-full px-4 py-3 border border-[#789568]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#789568] bg-[#F5EBD2]/50 font-serif">
                      <option value="1">1 คน</option>
                      <option value="2">2 คน</option>
                      <option value="3">3 คน</option>
                      <option value="4">4 คน</option>
                      <option value="5">5 คน</option>
                      <option value="6">6 คน</option>
                      <option value="7">7 คน</option>
                      <option value="8">8 คน</option>
                    </select>
                  </div>

                  <div>
                    <label className="flex items-center gap-2 font-serif text-sm font-semibold text-[#536B3E] mb-3">
                      <i className="ti ti-help text-[#789568]"></i>
                      Will you be attending? / แล้วพบกันในวันงานไหมคะ? *
                    </label>
                    <div className="space-y-3">
                      <label className="flex items-center gap-3 p-3 border border-[#789568]/30 rounded-lg cursor-pointer hover:bg-[#F5EBD2]/50">
                        <input type="radio" name="attending" value="yes" checked={formData.attending === 'yes'} onChange={handleChange} className="w-4 h-4" />
                        <span className="font-serif text-[#536B3E]"><i className="ti ti-check text-[#789568] mr-2"></i>Yes, I will be attending / ไปแน่นอนค่ะ 💚</span>
                      </label>
                      <label className="flex items-center gap-3 p-3 border border-[#789568]/30 rounded-lg cursor-pointer hover:bg-[#F5EBD2]/50">
                        <input type="radio" name="attending" value="no" checked={formData.attending === 'no'} onChange={handleChange} className="w-4 h-4" />
                        <span className="font-serif text-[#536B3E]"><i className="ti ti-x text-red-500 mr-2"></i>No, I cannot attend / เสียดายจัง ครั้งนี้ไปไม่ได้ค่ะ</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="flex items-center gap-2 font-serif text-sm font-semibold text-[#536B3E] mb-2">
                      <i className="ti ti-leaf text-[#789568]"></i>
                      Dietary Notes / มีข้อจำกัดเรื่องอาหารไหมคะ?
                    </label>
                    <textarea name="dietary_notes" value={formData.dietary_notes} onChange={handleChange} placeholder="เช่น ทานเจ / มังสวิรัติ / แพ้อาหาร ฯลฯ" rows={4} className="w-full px-4 py-3 border border-[#789568]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#789568] bg-[#F5EBD2]/50 font-serif resize-none"></textarea>
                  </div>

                  <div className="pt-6">
                    <button type="submit" disabled={loading} className="w-full px-8 py-3 bg-gradient-to-r from-[#789568] to-[#536B3E] text-white font-serif font-medium rounded-lg hover:from-[#536B3E] hover:to-[#3a4d2e] disabled:opacity-50 flex items-center justify-center gap-2">
                      <i className="ti ti-send"></i>
                      {loading ? 'กำลังส่งคำตอบให้นะคะ...' : 'ยืนยันการมาร่วมงาน'}
                    </button>
                  </div>

                  <div className="bg-[#789568]/10 border border-[#789568]/30 rounded-lg p-4 text-center">
                    <p className="text-sm text-[#536B3E] font-serif">
                      <i className="ti ti-calendar text-[#789568] mr-2"></i>
                      ฝากยืนยันให้เราทราบภายในวันที่ 15 พฤศจิกายน 2569 นะคะ
                    </p>
                  </div>
                </form>
              </div>
            </div>

            <div className="mt-12 bg-white rounded-2xl shadow-lg border border-[#789568]/10 p-8">
              <h3 className="font-serif text-2xl font-bold text-[#536B3E] mb-2 flex items-center gap-2">
                <i className="ti ti-help text-[#789568]"></i>
                Questions? / มีอะไรอยากถามเราไหมคะ?
              </h3>
              <p className="text-[#789568] font-serif text-sm mb-6">สงสัยอะไร ทักหาเราได้เลยนะคะ 💚</p>
              <div className="space-y-4">
                <a href="tel:+66625563261" className="flex items-center gap-3 p-3 hover:bg-[#F5EBD2]/50 rounded-lg transition-colors">
                  <div className="w-10 h-10 rounded-full bg-[#789568]/10 flex items-center justify-center">
                    <img src="https://i.postimg.cc/2yhXX3Qh/khxng-char-wy-(15).png" alt="Phone" className="w-5 h-5" />
                  </div>
                  <span className="text-[#536B3E] hover:text-[#789568] font-serif font-medium">062-556-3261 (Parn) / 089-524-1646 (Mike)</span>
                </a>
              </div>
            </div>
          </>
        )}
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
