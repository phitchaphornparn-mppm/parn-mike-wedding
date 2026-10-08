'use client'

import { useState } from 'react'
import Link from 'next/link'

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyOiQU2Xer4JJDQPoxQnv4t_neKe3r6fnxJhbVefvSXSS9UupJ0Ncqg_b3G0i1uKfWkog/exec'

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

      const payload = {
        full_name: formData.full_name,
        phone: formData.phone || '',
        rsvp_status: isAttending ? 'confirmed' : 'declined',
        party_size: isAttending ? parseInt(formData.party_size) : 0,
      }

      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        body: JSON.stringify(payload),
        mode: 'no-cors'
      })

      setSubmitted(true)
      setFormData({ full_name: '', phone: '', party_size: '1' })
      alert('ยืนยันการเข้าร่วมสำเร็จ! ขอบคุณค่ะ 💚')

    } catch (err: any) {
      alert('เกิดข้อผิดพลาด: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#F5EBD2]">
      <nav className="bg-white shadow-sm sticky top-0 z-40 border-b border-[#789568]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="font-serif font-bold text-lg text-[#789568]">
              PARN & MIKE
            </Link>
            <div className="space-x-6">
              <Link href="https://drive.google.com/drive/folders/161V_cnOtutZLQOh5CVz3Es5fmMdDBX4R?usp=sharing" target="_blank" rel="noopener noreferrer" className="text-sm font-serif font-medium text-[#536B3E] hover:text-[#789568]">Photos</Link>
              <Link href="/rsvp" className="text-sm font-serif font-medium text-[#536B3E] hover:text-[#789568]">RSVP</Link>
              <Link href="/information" className="text-sm font-serif font-medium text-[#536B3E] hover:text-[#789568]">Information</Link>
              <Link href="/schedule" className="text-sm font-serif font-medium text-[#536B3E] hover:text-[#789568]">Schedule</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-serif font-bold text-[#536B3E] text-center mb-2">RSVP</h1>
        <p className="text-center text-[#789568] mb-12">ยืนยันการเข้าร่วมงานแต่งงาน</p>

        <div className="bg-white rounded-3xl shadow-xl p-8 border border-[#789568]/10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-[#536B3E] font-semibold mb-2">ชื่อ-นามสกุล *</label>
              <input
                type="text"
                required
                value={formData.full_name}
                onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                placeholder="เช่น สมชาย ชาติไทย"
                className="w-full px-4 py-3 border-2 border-[#C9A45C] rounded-lg focus:outline-none focus:border-[#789568]"
              />
            </div>

            <div>
              <label className="block text-[#536B3E] font-semibold mb-2">เบอร์โทรศัพท์</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                placeholder="08XXXXXXXX"
                className="w-full px-4 py-3 border-2 border-[#C9A45C] rounded-lg focus:outline-none focus:border-[#789568]"
              />
            </div>

            <div>
              <label className="block text-[#536B3E] font-semibold mb-2">คุณจะเข้าร่วมหรือไม่ *</label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    checked={attending === 'yes'}
                    onChange={() => setAttending('yes')}
                    className="mr-2"
                  />
                  <span className="text-[#536B3E]">ใช่ ฉันจะเข้าร่วม</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    checked={attending === 'no'}
                    onChange={() => setAttending('no')}
                    className="mr-2"
                  />
                  <span className="text-[#536B3E]">ขออภัย ฉันไม่สามารถเข้าร่วมได้</span>
                </label>
              </div>
            </div>

            {isAttending && (
              <div>
                <label className="block text-[#536B3E] font-semibold mb-2">จำนวนคน</label>
                <input
                  type="number"
                  min="1"
                  value={formData.party_size}
                  onChange={(e) => setFormData({...formData, party_size: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-[#C9A45C] rounded-lg focus:outline-none focus:border-[#789568]"
                />
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#789568] hover:bg-[#536B3E] disabled:bg-gray-400 text-white font-bold py-4 rounded-lg transition"
            >
              {loading ? 'กำลังส่ง...' : 'ยืนยันการเข้าร่วม'}
            </button>
          </form>

          {submitted && (
            <div className="mt-6 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded">
              ✓ ยืนยันการเข้าร่วมสำเร็จแล้ว! ขอบคุณค่ะ 💚
            </div>
          )}
        </div>

        <div className="text-center mt-8">
          <Link href="/" className="text-[#789568] hover:text-[#536B3E] font-semibold underline">
            ← Back to Home
          </Link>
        </div>
      </div>

      <footer className="bg-gradient-to-r from-[#536B3E] to-[#3a4d2e] text-white py-12 mt-16 border-t border-[#789568]/20">
        <div className="max-w-6xl mx-auto px-4 text-center space-y-3">
          <p className="font-serif text-lg font-semibold text-[#B7A286]">PARN & MIKE</p>
          <p className="text-sm text-[#B7A286]">© 2026 Our Special Day. All our love.</p>
        </div>
      </footer>
    </div>
  )
}
