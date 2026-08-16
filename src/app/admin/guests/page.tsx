'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Plus, Edit2, Trash2 } from 'lucide-react'

interface Guest {
  id: string
  full_name: string
  email?: string
  phone?: string
  party_size: number
  rsvp_status: 'pending' | 'confirmed' | 'declined'
}

export default function GuestsPage() {
  const [guests, setGuests] = useState<Guest[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [form, setForm] = useState({ full_name: '', email: '', phone: '', party_size: 1 })

  useEffect(() => {
    fetchGuests()
  }, [])

  const fetchGuests = async () => {
    try {
      const { data } = await supabase.from('guests').select('*').order('created_at', { ascending: false })
      setGuests(data || [])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editId) {
        await supabase.from('guests').update(form).eq('id', editId)
        alert('Guest updated!')
      } else {
        await supabase.from('guests').insert([{ ...form, rsvp_status: 'pending' }])
        alert('Guest added!')
      }
      setForm({ full_name: '', email: '', phone: '', party_size: 1 })
      setShowForm(false)
      setEditId(null)
      fetchGuests()
    } catch (err) {
      alert('Error: ' + (err as any).message)
    }
  }

  const handleEdit = (guest: Guest) => {
    setForm({ full_name: guest.full_name, email: guest.email || '', phone: guest.phone || '', party_size: guest.party_size })
    setEditId(guest.id)
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm('Delete this guest?')) {
      try {
        await supabase.from('guests').delete().eq('id', id)
        alert('Guest deleted!')
        fetchGuests()
      } catch (err) {
        alert('Error: ' + (err as any).message)
      }
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-serif text-3xl font-bold text-[#789568]">Guests</h1>
          <p className="text-[#B7A286] mt-2 font-serif">Manage your wedding guest list</p>
        </div>
        <button
          onClick={() => { setEditId(null); setForm({ full_name: '', email: '', phone: '', party_size: 1 }); setShowForm(!showForm) }}
          className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-[#789568] to-[#536B3E] text-white rounded-lg font-serif hover:from-[#536B3E] hover:to-[#3a4d2e]"
        >
          <Plus className="w-4 h-4" />
          Add Guest
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-lg shadow-lg p-6 border border-[#789568]/20">
          <h2 className="font-serif text-xl font-bold text-[#789568] mb-4">{editId ? 'Edit Guest' : 'Add New Guest'}</h2>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" required value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} placeholder="Full Name" className="px-4 py-2 border border-[#789568]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#789568] bg-[#F5EBD2]/50 font-serif" />
              <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email" className="px-4 py-2 border border-[#789568]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#789568] bg-[#F5EBD2]/50 font-serif" />
              <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Phone" className="px-4 py-2 border border-[#789568]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#789568] bg-[#F5EBD2]/50 font-serif" />
              <select value={form.party_size} onChange={(e) => setForm({ ...form, party_size: parseInt(e.target.value) })} className="px-4 py-2 border border-[#789568]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#789568] bg-[#F5EBD2]/50 font-serif">
                {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n} guests</option>)}
              </select>
            </div>
            <div className="flex gap-2">
              <button type="submit" className="px-6 py-2 bg-[#536B3E] text-white rounded-lg hover:bg-[#3a4d2e] font-serif">
                {editId ? 'Update' : 'Add'}
              </button>
              <button type="button" onClick={() => { setShowForm(false); setEditId(null) }} className="px-6 py-2 bg-[#B7A286] text-white rounded-lg hover:bg-[#A68F7A] font-serif">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-[#789568]/20">
        {loading ? (
          <div className="p-8 text-center text-[#789568] font-serif">Loading guests...</div>
        ) : guests.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-[#B7A286] mb-4 font-serif">No guests added yet</p>
            <button onClick={() => setShowForm(true)} className="px-6 py-2 bg-[#789568] text-white rounded-lg font-serif hover:bg-[#536B3E]">Add First Guest</button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gradient-to-r from-[#789568]/10 to-[#536B3E]/10 border-b border-[#789568]/20">
                <tr>
                  <th className="px-6 py-3 text-left font-serif font-bold text-[#789568]">Name</th>
                  <th className="px-6 py-3 text-left font-serif font-bold text-[#789568]">Email</th>
                  <th className="px-6 py-3 text-left font-serif font-bold text-[#789568]">Phone</th>
                  <th className="px-6 py-3 text-left font-serif font-bold text-[#789568]">Party</th>
                  <th className="px-6 py-3 text-left font-serif font-bold text-[#789568]">RSVP</th>
                  <th className="px-6 py-3 text-left font-serif font-bold text-[#789568]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {guests.map((guest) => (
                  <tr key={guest.id} className="border-b border-[#789568]/10 hover:bg-[#F5EBD2]/50 font-serif">
                    <td className="px-6 py-3 font-medium text-[#2a2a2a]">{guest.full_name}</td>
                    <td className="px-6 py-3 text-[#B7A286]">{guest.email || '-'}</td>
                    <td className="px-6 py-3 text-[#B7A286]">{guest.phone || '-'}</td>
                    <td className="px-6 py-3 text-[#789568]">{guest.party_size}</td>
                    <td className="px-6 py-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${guest.rsvp_status === 'confirmed' ? 'bg-[#536B3E]/20 text-[#536B3E]' : guest.rsvp_status === 'declined' ? 'bg-red-100 text-red-700' : 'bg-[#C9A45C]/20 text-[#B8935A]'}`}>
                        {guest.rsvp_status}
                      </span>
                    </td>
                    <td className="px-6 py-3">
                      <button onClick={() => handleEdit(guest)} className="text-[#789568] hover:bg-[#F5EBD2] p-1 rounded mr-2"><Edit2 className="w-4 h-4" /></button>
                      <button onClick={() => handleDelete(guest.id)} className="text-red-600 hover:bg-red-50 p-1 rounded"><Trash2 className="w-4 h-4" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-lg p-6 border border-[#789568]/20">
          <p className="text-[#B7A286] text-sm font-serif">Total</p>
          <p className="text-3xl font-bold text-[#789568] font-serif">{guests.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6 border border-[#789568]/20">
          <p className="text-[#B7A286] text-sm font-serif">Attending</p>
          <p className="text-3xl font-bold text-[#C9A45C] font-serif">{guests.reduce((s, g) => s + g.party_size, 0)}</p>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6 border border-[#789568]/20">
          <p className="text-[#B7A286] text-sm font-serif">Confirmed</p>
          <p className="text-3xl font-bold text-[#536B3E] font-serif">{guests.filter(g => g.rsvp_status === 'confirmed').length}</p>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6 border border-[#789568]/20">
          <p className="text-[#B7A286] text-sm font-serif">Pending</p>
          <p className="text-3xl font-bold text-[#B7A286] font-serif">{guests.filter(g => g.rsvp_status === 'pending').length}</p>
        </div>
      </div>
    </div>
  )
}
