'use client'

import { useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

const WISHES_URL = 'https://parn-mike-wedding.netlify.app'

export default function RSVPPage() {
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [attending, setAttending] = useState<'yes' | 'no'>('yes')
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    party_size: '1',
  })

  const isAttending = attending === 'yes'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setLoading(true)

      const payload: Record<string, any> = {
        full_name: formData.full_name,
        phone: formData.phone || null,
        rsvp_status: isAttending ? 'confirmed' : 'declined',
      }
      if (isAttending) {
        payload.party_size = parseInt(formData.party_size)
      }

      const { error } = await supabase.from('guests').insert([payload])

      if (error) {
        alert('เกิดข้อผิดพลาด: ' + error.message)
      } else {
        setSubmitted(true)
        setFormData({ full_name: '', phone: '', party_size: '1' })
      }
    } catch (err: any) {
      alert('เกิดข้อผิดพลาด: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen bg-[#F5EBD2]">
      <nav className="bg-white shadow-sm sticky top-0 z-40 border-b border-[#789568]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-3">
              <span className="font-serif font-bold text-lg text-[#789568]">PARN &amp; MIKE</span>
            </Link>
            <div className="space-x-6">
              <Link href="/photos" className="text-sm font-serif font-medium text-[#536B3E] hover:text-[#789568]">Photos</Link>
              <Link href="/information" className="text-sm font-serif font-medium text-[#536B3E] hover:text-[#789568]">Information</Link>
              <Link href="/schedule" className="text-sm font-serif font-medium text-[#536B3E] hover:text-[#789568]">Schedule</Link>
              <a href={WISHES_URL} target="_blank" rel="noopener noreferrer" className="text-sm font-serif font-medium text-[#C9A45C] hover:text-[#789568]">อวยพร</a>
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
          <p className="text-[#789568] font-serif text-lg">Please confirm by 15 November 2026</p>
          <p className="text-[#789568] font-serif text-sm mt-2">รบกวนตอบกลับภายในวันที่ 15 พฤศจิกายน 2569 นะคะ</p>
        </div>

        {submitted && (
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-[#789568]/10 p-12 text-center">
            <div className="mb-6 flex justify-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#789568] to-[#536B3E] flex items-center justify-center">
                <i className="ti ti-check text-white text-3xl"></i>
              </div>
            </div>
            <h2 className="font-serif text-3xl font-bold text-[#536B3E] mb-3">ขอบคุณมากนะคะ!</h2>
            <p className="text-[#789568] font-serif text-sm mb-6">เราได้รับคำตอบของคุณเรียบร้อยแล้วค่ะ</p>

            {isAttending ? (
              <div className="space-y-3">
                <p className="text-2xl font-bold text-[#C9A45C] font-serif">ดีใจที่จะได้ฉลองวันพิเศษนี้ไปด้วยกันนะคะ!</p>
                <p className="text-sm text-[#B7A286] font-serif">6 December 2026 · Wiset Samutkhun School</p>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-lg text-[#536B3E] font-serif">ไม่เป็นไรเลยค่ะ ขอบคุณที่แจ้งให้เราทราบนะคะ 💚</p>
                <p className="text-sm text-[#789568] font-serif">ฝากคำอวยพรถึงเราได้ที่นี่เลยนะคะ</p>
                <a href={WISHES_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-[#C9A45C] to-[#B7A286] text-white font-serif font-bold rounded-xl hover:opacity-90 transition-all">
                  <i className="ti ti-gift"></i>
                  เขียนคำอวยพรออนไลน์
                </a>
              </div>
            )}

            <div className="mt-8">
              <Link href="/" className="inline-flex items-center gap-2 px-6 py-2 bg-white border-2 border-[#789568] text-[#789568] font-serif font-medium rounded-lg hover:bg-[#789568] hover:text-white transition-all">
                กลับหน้าแรก
              </Link>
            </div>
          </div>
        )}

        {!submitted && (
          <>
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-[#789568]/10">
              <div className="bg-gradient-to-r from-[#789568] to-[#536B3E] px-8 py-8 text-center text-white">
                <h2 className="font-serif text-2xl font-bold mb-2">ตอบรับคำเชิญ</h2>
                <p className="font-serif text-sm opacity-90">กรอกไม่กี่ช่อง ใช้เวลาไม่ถึงนาทีค่ะ</p>
              </div>

              <div className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="flex items-center gap-2 font-serif text-sm font-semibold text-[#536B3E] mb-3">
                      <i className="ti ti-calendar-check text-[#789568]"></i>
                      คุณจะมาร่วมงานไหมคะ? *
                    </label>

                    <div className="relative flex p-1 rounded-full bg-[#F5EBD2] border border-[#789568]/30">
                      <span
                        className={
                          'absolute top-1 bottom-1 rounded-full bg-gradient-to-r from-[#789568] to-[#536B3E] shadow transition-all duration-300 ease-out ' +
                          (isAttending ? 'left-1 right-1/2' : 'left-1/2 right-1')
                        }
                      ></span>
                      <button
                        type="button"
                        onClick={() => setAttending('yes')}
                        className={
                          'relative z-10 flex-1 py-3 rounded-full font-serif font-semibold text-sm transition-colors duration-300 ' +
                          (isAttending ? 'text-white' : 'text-[#789568]')
                        }
                      >
                        มาร่วมงาน
                      </button>
                      <button
                        type="button"
                        onClick={() => setAttending('no')}
                        className={
                          'relative z-10 flex-1 py-3 rounded-full font-serif font-semibold text-sm transition-colors duration-300 ' +
                          (!isAttending ? 'text-white' : 'text-[#789568]')
                        }
                      >
                        ไม่ได้มาร่วมงาน
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="flex items-center gap-2 font-serif text-sm font-semibold text-[#536B3E] mb-2">
                      <i className="ti ti-user text-[#789568]"></i>
                      ชื่อ *
                    </label>
                    <input type="text" name="full_name" required value={formData.full_name} onChange={handleChange} placeholder="ชื่อของคุณ (ชื่อเล่นก็ได้ค่ะ)" className="w-full px-4 py-3 border border-[#789568]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#789568] bg-[#F5EBD2]/50 font-serif" />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 font-serif text-sm font-semibold text-[#536B3E] mb-2">
                      <i className="ti ti-phone text-[#789568]"></i>
                      เบอร์โทรศัพท์
                    </label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="08X-XXX-XXXX" className="w-full px-4 py-3 border border-[#789568]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#789568] bg-[#F5EBD2]/50 font-serif" />
                  </div>

                  {isAttending && (
                    <div>
                      <label className="flex items-center gap-2 font-serif text-sm font-semibold text-[#536B3E] mb-2">
                        <i className="ti ti-users text-[#789568]"></i>
                        มากี่คน *
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
                        <option value="9">9 คน</option>
                        <option value="10">10 คนขึ้นไป</option>
                      </select>
                    </div>
                  )}

                  {!isAttending && (
                    <div className="bg-[#C9A45C]/10 border border-[#C9A45C]/30 rounded-xl p-5 text-center space-y-3">
                      <p className="font-serif text-sm text-[#536B3E]">มาไม่ได้ไม่เป็นไรเลยค่ะ ฝากคำอวยพรถึงเราได้นะคะ 💚</p>
                      <a href={WISHES_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-[#C9A45C] to-[#B7A286] text-white font-serif font-medium rounded-lg hover:opacity-90 transition-all">
                        <i className="ti ti-gift"></i>
                        เขียนคำอวยพรออนไลน์
                      </a>
                    </div>
                  )}

                  <button type="submit" disabled={loading} className="w-full px-8 py-4 bg-gradient-to-r from-[#789568] to-[#536B3E] text-white font-serif font-bold rounded-xl hover:from-[#536B3E] hover:to-[#3a4d2e] transition-all disabled:opacity-50">
                    {loading ? 'กำลังส่ง...' : isAttending ? 'ยืนยันการมาร่วมงาน' : 'ส่งคำตอบ'}
                  </button>

                  <div className="bg-[#789568]/10 border border-[#789568]/30 rounded-lg p-4">
                    <p className="text-sm text-[#536B3E] font-serif text-center">
                      <i className="ti ti-calendar text-[#789568] mr-2"></i>
                      ฝากตอบกลับภายในวันที่ 15 พฤศจิกายน 2569 นะคะ
                    </p>
                  </div>
                </form>
              </div>
            </div>

            <div className="mt-12 bg-white rounded-2xl shadow-lg border border-[#789568]/10 p-8">
              <h3 className="font-serif text-2xl font-bold text-[#536B3E] mb-2 flex items-center gap-2">
                <i className="ti ti-help text-[#789568]"></i>
                มีอะไรอยากถามเราไหมคะ?
              </h3>
              <p className="text-[#789568] font-serif text-sm mb-6">สงสัยอะไร ทักหาเราได้เลยนะคะ 💚</p>
              <a href="tel:+66625563261" className="flex items-center gap-3 p-3 hover:bg-[#F5EBD2]/50 rounded-lg transition-colors">
                <div className="w-10 h-10 rounded-full bg-[#789568]/10 flex items-center justify-center">
                  <img src="https://i.postimg.cc/2yhXX3Qh/khxng-char-wy-(15).png" alt="Phone" className="w-5 h-5" />
                </div>
                <span className="text-[#536B3E] hover:text-[#789568] font-serif font-medium">062-556-3261 (Parn) / 089-524-1646 (Mike)</span>
              </a>
            </div>
          </>
        )}
      </main>

      <footer className="bg-gradient-to-r from-[#536B3E] to-[#3a4d2e] text-white py-12 mt-16 border-t border-[#789568]/20">
        <div className="max-w-6xl mx-auto px-4 text-center space-y-3">
          <p className="font-serif text-lg font-semibold text-[#B7A286]">PARN &amp; MIKE</p>
          <p className="text-sm text-[#B7A286]">© 2026 Our Special Day. All our love.</p>
          <p className="text-xs text-[#B7A286]/80">Created by Bride Parn</p>
        </div>
      </footer>
    </div>
  )
}
