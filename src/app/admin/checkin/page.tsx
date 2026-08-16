'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Search, CheckCircle, Clock, Users } from 'lucide-react'

interface Guest {
  id: string
  full_name: string
  email?: string
  phone?: string
  party_size: number
  rsvp_status: string
  checked_in?: boolean
}

interface CheckinRecord {
  id: string
  guest_id: string
  guest_name: string
  checked_in_at: string
}

export default function CheckinPage() {
  const [guests, setGuests] = useState<Guest[]>([])
  const [checkins, setCheckins] = useState<CheckinRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedGuestId, setSelectedGuestId] = useState<string | null>(null)
  const [showCheckinForm, setShowCheckinForm] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)

      // Fetch all guests with confirmed RSVP
      const { data: guestsData, error: guestsError } = await supabase
        .from('guests')
        .select('*')
        .eq('rsvp_status', 'confirmed')
        .order('full_name', { ascending: true })

      if (guestsError) console.error('Guests error:', guestsError)
      else setGuests(guestsData || [])

      // Fetch checkins for today
      const { data: checkinsData, error: checkinsError } = await supabase
        .from('checkins')
        .select('*')
        .gte('checked_in_at', new Date().toISOString().split('T')[0])
        .order('checked_in_at', { ascending: false })

      if (checkinsError) console.error('Checkins error:', checkinsError)
      else {
        const mappedCheckins = checkinsData?.map((c: any) => ({
          id: c.id,
          guest_id: c.guest_id,
          guest_name: '',
          checked_in_at: c.checked_in_at,
        })) || []
        setCheckins(mappedCheckins)
      }
    } catch (err) {
      console.error('Fetch error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleCheckIn = async (guestId: string) => {
    try {
      const guest = guests.find((g) => g.id === guestId)
      if (!guest) {
        alert('Guest not found')
        return
      }

      // Check if already checked in
      const alreadyCheckedIn = checkins.some((c) => c.guest_id === guestId)
      if (alreadyCheckedIn) {
        alert(`${guest.full_name} is already checked in!`)
        return
      }

      const { error } = await supabase.from('checkins').insert([
        {
          guest_id: guestId,
          checked_in_at: new Date().toISOString(),
          method: 'staff_search',
        },
      ])

      if (error) {
        alert('Failed to check in: ' + error.message)
      } else {
        alert(`${guest.full_name} checked in successfully!`)
        setSelectedGuestId(null)
        setShowCheckinForm(false)
        fetchData()
      }
    } catch (err: any) {
      alert('Error: ' + err.message)
    }
  }

  const filteredGuests = guests.filter(
    (guest) =>
      guest.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guest.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guest.phone?.includes(searchTerm)
  )

  const checkedInGuests = checkins.length
  const totalConfirmed = guests.length
  const uncheckedGuests = totalConfirmed - checkedInGuests

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Check-in System</h1>
        <p className="text-gray-600 mt-2">Record guest arrivals</p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm">Total Confirmed</p>
          <p className="text-3xl font-bold text-purple-600 mt-2">
            {totalConfirmed}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm">Checked In</p>
          <p className="text-3xl font-bold text-green-600 mt-2">
            {checkedInGuests}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {totalConfirmed > 0
              ? Math.round((checkedInGuests / totalConfirmed) * 100)
              : 0}
            %
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm">Awaiting Check-in</p>
          <p className="text-3xl font-bold text-yellow-600 mt-2">
            {uncheckedGuests}
          </p>
        </div>
      </div>

      {/* Search & Check-in */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">Quick Check-in</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Guest
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name, email, or phone..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>
          </div>

          {searchTerm && (
            <div className="max-h-96 overflow-y-auto border rounded-lg">
              {filteredGuests.length === 0 ? (
                <div className="p-4 text-center text-gray-600">
                  No guests found
                </div>
              ) : (
                <div className="divide-y">
                  {filteredGuests.map((guest) => {
                    const isCheckedIn = checkins.some(
                      (c) => c.guest_id === guest.id
                    )
                    return (
                      <div
                        key={guest.id}
                        className="p-4 hover:bg-gray-50 transition"
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h3 className="font-medium text-gray-900">
                              {guest.full_name}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {guest.email}
                            </p>
                            <p className="text-sm text-gray-600">
                              Party of {guest.party_size}
                            </p>
                          </div>
                          {isCheckedIn ? (
                            <div className="flex items-center gap-2 text-green-600">
                              <CheckCircle className="w-5 h-5" />
                              <span className="text-sm font-medium">
                                Checked In
                              </span>
                            </div>
                          ) : (
                            <button
                              onClick={() => handleCheckIn(guest.id)}
                              className="px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 text-sm font-medium"
                            >
                              Check In
                            </button>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Check-in History */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-gray-900">
            Today's Check-ins ({checkedInGuests})
          </h2>
        </div>

        {checkins.length === 0 ? (
          <div className="p-8 text-center text-gray-600">
            <Clock className="w-12 h-12 mx-auto text-gray-400 mb-3" />
            <p>No check-ins yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left font-semibold">Guest</th>
                  <th className="px-6 py-3 text-left font-semibold">
                    Time
                  </th>
                </tr>
              </thead>
              <tbody>
                {checkins.map((checkin) => {
                  const guest = guests.find((g) => g.id === checkin.guest_id)
                  const time = new Date(checkin.checked_in_at).toLocaleTimeString()
                  return (
                    <tr key={checkin.id} className="border-b hover:bg-gray-50">
                      <td className="px-6 py-3 font-medium">
                        {guest?.full_name || 'Unknown'}
                      </td>
                      <td className="px-6 py-3 text-gray-600">{time}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          💡 <strong>Tip:</strong> Search for guests by their full name, email, or phone number to quickly check them in.
        </p>
      </div>
    </div>
  )
}
