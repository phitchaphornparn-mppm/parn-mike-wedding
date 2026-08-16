'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Plus, Trash2, Users } from 'lucide-react'

interface Table {
  id: string
  table_number: string
  capacity: number
}

interface Guest {
  id: string
  full_name: string
}

export default function SeatingPage() {
  const [tables, setTables] = useState<Table[]>([])
  const [guests, setGuests] = useState<Guest[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [showAssignForm, setShowAssignForm] = useState(false)
  const [selectedTable, setSelectedTable] = useState<string | null>(null)
  const [selectedGuest, setSelectedGuest] = useState<string>('')
  const [formData, setFormData] = useState({
    table_number: '',
    capacity: 8,
  })

  useEffect(() => {
    fetchTablesAndGuests()
  }, [])

  const fetchTablesAndGuests = async () => {
    try {
      setLoading(true)

      const { data: tablesData, error: tablesError } = await supabase
        .from('dining_tables')
        .select('*')
        .order('table_number', { ascending: true })

      if (tablesError) console.error('Tables error:', tablesError)
      else setTables(tablesData || [])

      const { data: guestsData, error: guestsError } = await supabase
        .from('guests')
        .select('*')
        .is('table_id', null)
        .order('full_name', { ascending: true })

      if (guestsError) console.error('Guests error:', guestsError)
      else setGuests(guestsData || [])
    } catch (err) {
      console.error('Fetch error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleAddTable = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const { error } = await supabase.from('dining_tables').insert([
        {
          table_number: formData.table_number,
          capacity: formData.capacity,
        },
      ])

      if (error) alert('Failed to create table')
      else {
        alert('Table created!')
        setFormData({ table_number: '', capacity: 8 })
        setShowAddForm(false)
        fetchTablesAndGuests()
      }
    } catch (err: any) {
      alert('Error: ' + err.message)
    }
  }

  const handleAssignGuest = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedTable || !selectedGuest) {
      alert('Please select both table and guest')
      return
    }

    try {
      const { error } = await supabase
        .from('guests')
        .update({ table_id: selectedTable })
        .eq('id', selectedGuest)

      if (error) alert('Failed to assign guest')
      else {
        alert('Guest assigned!')
        setSelectedGuest('')
        setShowAssignForm(false)
        fetchTablesAndGuests()
      }
    } catch (err: any) {
      alert('Error: ' + err.message)
    }
  }

  const handleDeleteTable = async (tableId: string) => {
    if (!confirm('Delete this table?')) return

    try {
      const { error } = await supabase
        .from('dining_tables')
        .delete()
        .eq('id', tableId)

      if (error) alert('Failed to delete')
      else {
        alert('Table deleted!')
        fetchTablesAndGuests()
      }
    } catch (err: any) {
      alert('Error: ' + err.message)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-serif text-3xl font-bold text-[#789568]">Seating Management</h1>
          <p className="text-[#B7A286] mt-2 font-serif">Create tables and assign guests</p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-[#789568] to-[#536B3E] text-white rounded-lg hover:from-[#536B3E] hover:to-[#3a4d2e] text-sm font-serif transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Table
        </button>
      </div>

      {/* Add Table Form */}
      {showAddForm && (
        <div className="bg-white rounded-lg shadow-lg p-6 border border-[#789568]/20">
          <h2 className="font-serif text-xl font-bold text-[#789568] mb-4">Create New Table</h2>
          <form onSubmit={handleAddTable} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-serif font-medium text-[#789568] mb-1">
                  Table Number *
                </label>
                <input
                  type="text"
                  required
                  value={formData.table_number}
                  onChange={(e) => setFormData({ ...formData, table_number: e.target.value })}
                  placeholder="e.g. 1, 2, A, B"
                  className="w-full px-4 py-2 border border-[#789568]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#789568] bg-[#F5EBD2]/50"
                />
              </div>
              <div>
                <label className="block text-sm font-serif font-medium text-[#789568] mb-1">
                  Capacity
                </label>
                <input
                  type="number"
                  min="1"
                  value={formData.capacity}
                  onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) || 8 })}
                  className="w-full px-4 py-2 border border-[#789568]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#789568] bg-[#F5EBD2]/50"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <button type="submit" className="px-6 py-2 bg-[#536B3E] text-white rounded-lg hover:bg-[#3a4d2e] font-serif transition-colors">
                Create Table
              </button>
              <button type="button" onClick={() => setShowAddForm(false)} className="px-6 py-2 bg-[#B7A286] text-white rounded-lg hover:bg-[#A68F7A] font-serif transition-colors">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Assign Guest Form */}
      {showAssignForm && (
        <div className="bg-white rounded-lg shadow-lg p-6 border border-[#789568]/20">
          <h2 className="font-serif text-xl font-bold text-[#789568] mb-4">Assign Guest to Table</h2>
          <form onSubmit={handleAssignGuest} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-serif font-medium text-[#789568] mb-1">Table *</label>
                <select
                  required
                  value={selectedTable || ''}
                  onChange={(e) => setSelectedTable(e.target.value)}
                  className="w-full px-4 py-2 border border-[#789568]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#789568] bg-[#F5EBD2]/50 font-serif"
                >
                  <option value="">Select a table</option>
                  {tables.map((table) => (
                    <option key={table.id} value={table.id}>
                      Table {table.table_number} (Cap: {table.capacity})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-serif font-medium text-[#789568] mb-1">Guest *</label>
                <select
                  required
                  value={selectedGuest}
                  onChange={(e) => setSelectedGuest(e.target.value)}
                  className="w-full px-4 py-2 border border-[#789568]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#789568] bg-[#F5EBD2]/50 font-serif"
                >
                  <option value="">Select a guest</option>
                  {guests.map((guest) => (
                    <option key={guest.id} value={guest.id}>
                      {guest.full_name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex gap-2">
              <button type="submit" className="px-6 py-2 bg-[#536B3E] text-white rounded-lg hover:bg-[#3a4d2e] font-serif transition-colors">
                Assign Guest
              </button>
              <button type="button" onClick={() => { setShowAssignForm(false); setSelectedGuest('') }} className="px-6 py-2 bg-[#B7A286] text-white rounded-lg hover:bg-[#A68F7A] font-serif transition-colors">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tables Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          <div className="col-span-full text-center py-8 text-[#789568] font-serif">Loading tables...</div>
        ) : tables.length === 0 ? (
          <div className="col-span-full text-center py-8">
            <p className="text-[#B7A286] mb-4 font-serif">No tables created yet</p>
            <button onClick={() => setShowAddForm(true)} className="px-6 py-2 bg-[#789568] text-white rounded-lg hover:bg-[#536B3E] font-serif transition-colors">
              Create First Table
            </button>
          </div>
        ) : (
          tables.map((table) => (
            <div key={table.id} className="bg-white rounded-lg shadow-lg p-6 border border-[#789568]/20 hover:shadow-xl transition">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#789568]">Table {table.table_number}</h3>
                  <p className="text-sm text-[#B7A286] font-serif">Capacity: {table.capacity}</p>
                </div>
                <button onClick={() => handleDeleteTable(table.id)} className="p-1 text-red-600 hover:bg-red-50 rounded transition">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>

              <div className="bg-gradient-to-br from-[#789568]/10 to-[#536B3E]/10 rounded-lg p-3 mb-4 border border-[#789568]/20">
                <p className="text-sm text-[#B7A286] font-serif">Assigned Guests</p>
                <p className="text-2xl font-bold text-[#789568] font-serif">0/{table.capacity}</p>
              </div>

              <button
                onClick={() => {
                  setSelectedTable(table.id)
                  setShowAssignForm(true)
                }}
                className="w-full px-4 py-2 bg-gradient-to-r from-[#789568] to-[#536B3E] text-white rounded-lg hover:from-[#536B3E] hover:to-[#3a4d2e] text-sm font-serif transition-colors"
              >
                <Users className="w-4 h-4 inline mr-2" />
                Assign Guest
              </button>
            </div>
          ))
        )}
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow-lg p-6 border border-[#789568]/20">
          <p className="text-[#B7A286] text-sm font-serif">Total Tables</p>
          <p className="text-3xl font-bold text-[#789568] mt-2 font-serif">{tables.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6 border border-[#789568]/20">
          <p className="text-[#B7A286] text-sm font-serif">Total Capacity</p>
          <p className="text-3xl font-bold text-[#C9A45C] mt-2 font-serif">{tables.reduce((sum, t) => sum + t.capacity, 0)}</p>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6 border border-[#789568]/20">
          <p className="text-[#B7A286] text-sm font-serif">Unassigned Guests</p>
          <p className="text-3xl font-bold text-[#B7A286] mt-2 font-serif">{guests.length}</p>
        </div>
      </div>
    </div>
  )
}
