'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function AdminInformationPage() {
  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)
  const [formData, setFormData] = useState({
    venue_name: 'Wiset Samutkhun School',
    venue_address: 'Krathumban, Samut Sakhon',
    venue_phone: '+66 (34) 812-0185',
    venue_maps: 'https://maps.app.goo.gl/rggfEtMGCi5gQyty5',
    bride_name: 'พิชชาพร ประยูรอนุเทพ (ปาน)',
    bride_name_en: 'Parn',
    groom_name: 'ชาญวิทย์ พึ่งอิ่ม (ไมค์)',
    groom_name_en: 'Mike',
    wedding_date: '6 December 2026',
    wedding_date_th: '6 ธันวาคม 2569',
    contact_phone: '+66 (91) 234-5678',
    contact_email: 'parn.mike@wedding.com',
    wedding_description: 'Join us as we celebrate our special day with you',
    rsvp_deadline: '15 November 2026',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setLoading(true)
      
      // For now, just show success (store in localStorage or state)
      localStorage.setItem('wedding_info', JSON.stringify(formData))
      
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (err: any) {
      alert('Error: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#536B3E] flex items-center gap-3">
            <i className="ti ti-info-circle text-[#789568]"></i>
            Wedding Information
          </h1>
          <p className="text-[#789568] font-serif text-sm mt-1">จัดการข้อมูลงานแต่ง</p>
        </div>
        {saved && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded-lg flex items-center gap-2">
            <i className="ti ti-check"></i>
            Saved Successfully / บันทึกเรียบร้อยแล้ว
          </div>
        )}
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Couple Information */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-[#789568]/10">
          <h2 className="text-xl font-bold text-[#536B3E] mb-6 flex items-center gap-2">
            <i className="ti ti-heart text-[#789568]"></i>
            Couple Information / ข้อมูลคู่บ่าว-สาว
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Bride */}
            <div className="space-y-4">
              <h3 className="font-semibold text-[#536B3E]">Bride / สาว</h3>
              <div>
                <label className="block text-sm font-medium text-[#536B3E] mb-2">Thai Name / ชื่อไทย</label>
                <input
                  type="text"
                  name="bride_name"
                  value={formData.bride_name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-[#789568]/30 rounded-lg focus:ring-2 focus:ring-[#789568] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#536B3E] mb-2">English Name / ชื่ออังกฤษ</label>
                <input
                  type="text"
                  name="bride_name_en"
                  value={formData.bride_name_en}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-[#789568]/30 rounded-lg focus:ring-2 focus:ring-[#789568] focus:outline-none"
                />
              </div>
            </div>

            {/* Groom */}
            <div className="space-y-4">
              <h3 className="font-semibold text-[#536B3E]">Groom / เขย</h3>
              <div>
                <label className="block text-sm font-medium text-[#536B3E] mb-2">Thai Name / ชื่อไทย</label>
                <input
                  type="text"
                  name="groom_name"
                  value={formData.groom_name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-[#789568]/30 rounded-lg focus:ring-2 focus:ring-[#789568] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#536B3E] mb-2">English Name / ชื่ออังกฤษ</label>
                <input
                  type="text"
                  name="groom_name_en"
                  value={formData.groom_name_en}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-[#789568]/30 rounded-lg focus:ring-2 focus:ring-[#789568] focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Wedding Date */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-[#789568]/10">
          <h2 className="text-xl font-bold text-[#536B3E] mb-6 flex items-center gap-2">
            <i className="ti ti-calendar text-[#789568]"></i>
            Wedding Date / วันงานแต่ง
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-[#536B3E] mb-2">English Date</label>
              <input
                type="text"
                name="wedding_date"
                value={formData.wedding_date}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-[#789568]/30 rounded-lg focus:ring-2 focus:ring-[#789568] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#536B3E] mb-2">Thai Date / วันที่ไทย</label>
              <input
                type="text"
                name="wedding_date_th"
                value={formData.wedding_date_th}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-[#789568]/30 rounded-lg focus:ring-2 focus:ring-[#789568] focus:outline-none"
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-[#536B3E] mb-2">RSVP Deadline</label>
            <input
              type="text"
              name="rsvp_deadline"
              value={formData.rsvp_deadline}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-[#789568]/30 rounded-lg focus:ring-2 focus:ring-[#789568] focus:outline-none"
            />
          </div>
        </div>

        {/* Venue Information */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-[#789568]/10">
          <h2 className="text-xl font-bold text-[#536B3E] mb-6 flex items-center gap-2">
            <i className="ti ti-map-pin text-[#789568]"></i>
            Venue Information / ข้อมูลสถานที่
          </h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-[#536B3E] mb-2">Venue Name / ชื่อสถานที่</label>
              <input
                type="text"
                name="venue_name"
                value={formData.venue_name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-[#789568]/30 rounded-lg focus:ring-2 focus:ring-[#789568] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#536B3E] mb-2">Address / ที่อยู่</label>
              <input
                type="text"
                name="venue_address"
                value={formData.venue_address}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-[#789568]/30 rounded-lg focus:ring-2 focus:ring-[#789568] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#536B3E] mb-2">Venue Phone / เบอร์โทร</label>
              <input
                type="text"
                name="venue_phone"
                value={formData.venue_phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-[#789568]/30 rounded-lg focus:ring-2 focus:ring-[#789568] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#536B3E] mb-2">Google Maps URL</label>
              <input
                type="url"
                name="venue_maps"
                value={formData.venue_maps}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-[#789568]/30 rounded-lg focus:ring-2 focus:ring-[#789568] focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-[#789568]/10">
          <h2 className="text-xl font-bold text-[#536B3E] mb-6 flex items-center gap-2">
            <i className="ti ti-phone text-[#789568]"></i>
            Contact Information / ข้อมูลติดต่อ
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-[#536B3E] mb-2">Phone / เบอร์โทรศัพท์</label>
              <input
                type="tel"
                name="contact_phone"
                value={formData.contact_phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-[#789568]/30 rounded-lg focus:ring-2 focus:ring-[#789568] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#536B3E] mb-2">Email</label>
              <input
                type="email"
                name="contact_email"
                value={formData.contact_email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-[#789568]/30 rounded-lg focus:ring-2 focus:ring-[#789568] focus:outline-none"
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-[#536B3E] mb-2">Wedding Description</label>
            <textarea
              name="wedding_description"
              value={formData.wedding_description}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2 border border-[#789568]/30 rounded-lg focus:ring-2 focus:ring-[#789568] focus:outline-none resize-none"
            ></textarea>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full px-6 py-3 bg-gradient-to-r from-[#789568] to-[#536B3E] text-white font-medium rounded-lg hover:from-[#536B3E] hover:to-[#3a4d2e] disabled:opacity-50 flex items-center justify-center gap-2"
        >
          <i className="ti ti-save"></i>
          {loading ? 'Saving...' : 'Save Changes / บันทึกการเปลี่ยนแปลง'}
        </button>
      </form>
    </div>
  )
}
