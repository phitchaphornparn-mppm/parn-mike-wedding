'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

interface ScheduleEvent {
  id: string
  time: string
  time_th: string
  title: string
  title_th: string
  description: string
  description_th: string
  order: number
}

export default function AdminSchedulePage() {
  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)
  const [events, setEvents] = useState<ScheduleEvent[]>([
    {
      id: '1',
      time: '07:09',
      time_th: '07:09 น.',
      title: 'Guest Registration & Ceremony',
      title_th: 'ลงทะเบียนแขกและพิธีสงฆ์',
      description: 'Buddhist Blessing Ceremony & Welcome',
      description_th: 'พิธีสงฆ์ การรดน้ำจากสงฆ์ และต้อนรับแขก',
      order: 1,
    },
    {
      id: '2',
      time: '08:39',
      time_th: '08:39 น.',
      title: 'Khan Maak Procession',
      title_th: 'แห่ขันหมาก',
      description: 'Traditional Thai Wedding Procession',
      description_th: 'พิธีแห่ขันหมากแบบดั้งเดิมไทย',
      order: 2,
    },
    {
      id: '3',
      time: '09:09',
      time_th: '09:09 น.',
      title: 'Water Blessing Ceremony',
      title_th: 'พิธีรดน้ำสังข์',
      description: 'A Traditional Thai Wedding Blessing',
      description_th: 'พิธีรดน้ำสังข์อวยพรแบบดั้งเดิมไทย',
      order: 3,
    },
    {
      id: '4',
      time: '11:00',
      time_th: '11:00 น.',
      title: 'Lunch Reception',
      title_th: 'งานรับประทานอาหารกลางวัน',
      description: 'Lunch & Celebration',
      description_th: 'รับประทานอาหารกลางวันและฉลองร่วมกัน',
      order: 4,
    },
  ])

  const handleEventChange = (id: string, field: string, value: string) => {
    setEvents(events.map(event =>
      event.id === id ? { ...event, [field]: value } : event
    ))
  }

  const addEvent = () => {
    const newEvent: ScheduleEvent = {
      id: Date.now().toString(),
      time: '12:00',
      time_th: '12:00 น.',
      title: 'New Event',
      title_th: 'กิจกรรมใหม่',
      description: 'Event description',
      description_th: 'คำบรรยายกิจกรรม',
      order: events.length + 1,
    }
    setEvents([...events, newEvent])
  }

  const deleteEvent = (id: string) => {
    setEvents(events.filter(event => event.id !== id))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setLoading(true)
      
      // Save to localStorage
      localStorage.setItem('wedding_schedule', JSON.stringify(events))
      
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
            <i className="ti ti-clock text-[#789568]"></i>
            Wedding Schedule
          </h1>
          <p className="text-[#789568] font-serif text-sm mt-1">จัดการตารางเวลางานแต่ง</p>
        </div>
        {saved && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded-lg flex items-center gap-2">
            <i className="ti ti-check"></i>
            Saved Successfully / บันทึกเรียบร้อยแล้ว
          </div>
        )}
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Events List */}
        {events.map((event, index) => (
          <div key={event.id} className="bg-white rounded-2xl shadow-lg p-8 border border-[#789568]/10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-[#536B3E]">Event {index + 1}</h2>
              {events.length > 1 && (
                <button
                  type="button"
                  onClick={() => deleteEvent(event.id)}
                  className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 font-medium flex items-center gap-2"
                >
                  <i className="ti ti-trash"></i>
                  Delete
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Time */}
              <div>
                <label className="block text-sm font-medium text-[#536B3E] mb-2">Time (24h) / เวลา</label>
                <input
                  type="time"
                  value={event.time}
                  onChange={(e) => handleEventChange(event.id, 'time', e.target.value)}
                  className="w-full px-4 py-2 border border-[#789568]/30 rounded-lg focus:ring-2 focus:ring-[#789568] focus:outline-none"
                />
              </div>

              {/* Time Thai */}
              <div>
                <label className="block text-sm font-medium text-[#536B3E] mb-2">Time Thai / เวลาไทย</label>
                <input
                  type="text"
                  value={event.time_th}
                  onChange={(e) => handleEventChange(event.id, 'time_th', e.target.value)}
                  placeholder="เช่น 07:09 น."
                  className="w-full px-4 py-2 border border-[#789568]/30 rounded-lg focus:ring-2 focus:ring-[#789568] focus:outline-none"
                />
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-[#536B3E] mb-2">Title / ชื่อเรื่อง</label>
                <input
                  type="text"
                  value={event.title}
                  onChange={(e) => handleEventChange(event.id, 'title', e.target.value)}
                  className="w-full px-4 py-2 border border-[#789568]/30 rounded-lg focus:ring-2 focus:ring-[#789568] focus:outline-none"
                />
              </div>

              {/* Title Thai */}
              <div>
                <label className="block text-sm font-medium text-[#536B3E] mb-2">Title Thai / ชื่อไทย</label>
                <input
                  type="text"
                  value={event.title_th}
                  onChange={(e) => handleEventChange(event.id, 'title_th', e.target.value)}
                  className="w-full px-4 py-2 border border-[#789568]/30 rounded-lg focus:ring-2 focus:ring-[#789568] focus:outline-none"
                />
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[#536B3E] mb-2">Description / คำบรรยาย</label>
                <textarea
                  value={event.description}
                  onChange={(e) => handleEventChange(event.id, 'description', e.target.value)}
                  rows={2}
                  className="w-full px-4 py-2 border border-[#789568]/30 rounded-lg focus:ring-2 focus:ring-[#789568] focus:outline-none resize-none"
                ></textarea>
              </div>

              {/* Description Thai */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[#536B3E] mb-2">Description Thai / คำบรรยายไทย</label>
                <textarea
                  value={event.description_th}
                  onChange={(e) => handleEventChange(event.id, 'description_th', e.target.value)}
                  rows={2}
                  className="w-full px-4 py-2 border border-[#789568]/30 rounded-lg focus:ring-2 focus:ring-[#789568] focus:outline-none resize-none"
                ></textarea>
              </div>
            </div>
          </div>
        ))}

        {/* Add Event Button */}
        <button
          type="button"
          onClick={addEvent}
          className="w-full px-6 py-3 bg-blue-100 text-blue-600 font-medium rounded-lg hover:bg-blue-200 flex items-center justify-center gap-2"
        >
          <i className="ti ti-plus"></i>
          Add New Event / เพิ่มกิจกรรมใหม่
        </button>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full px-6 py-3 bg-gradient-to-r from-[#789568] to-[#536B3E] text-white font-medium rounded-lg hover:from-[#536B3E] hover:to-[#3a4d2e] disabled:opacity-50 flex items-center justify-center gap-2"
        >
          <i className="ti ti-save"></i>
          {loading ? 'Saving...' : 'Save Schedule / บันทึกตารางเวลา'}
        </button>
      </form>
    </div>
  )
}
