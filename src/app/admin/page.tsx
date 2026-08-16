'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { Users, UserCheck, UserX, Users2, CheckCircle2, Loader } from 'lucide-react'

interface DashboardStats {
  totalGuests: number
  confirmedGuests: number
  pendingGuests: number
  declinedGuests: number
  checkedInGuests: number
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalGuests: 0,
    confirmedGuests: 0,
    pendingGuests: 0,
    declinedGuests: 0,
    checkedInGuests: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Get total guests
        const { count: totalCount } = await supabase
          .from('guests')
          .select('*', { count: 'exact', head: true })

        // Get confirmed guests
        const { count: confirmedCount } = await supabase
          .from('guests')
          .select('*', { count: 'exact', head: true })
          .eq('rsvp_status', 'confirmed')

        // Get pending guests
        const { count: pendingCount } = await supabase
          .from('guests')
          .select('*', { count: 'exact', head: true })
          .eq('rsvp_status', 'pending')

        // Get declined guests
        const { count: declinedCount } = await supabase
          .from('guests')
          .select('*', { count: 'exact', head: true })
          .eq('rsvp_status', 'declined')

        // Get checked in guests
        const { count: checkedInCount } = await supabase
          .from('checkins')
          .select('*', { count: 'exact', head: true })

        setStats({
          totalGuests: totalCount || 0,
          confirmedGuests: confirmedCount || 0,
          pendingGuests: pendingCount || 0,
          declinedGuests: declinedCount || 0,
          checkedInGuests: checkedInCount || 0,
        })
      } catch (err) {
        console.error('Error fetching stats:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  const StatCard = ({
    icon: Icon,
    label,
    value,
    color,
  }: {
    icon: any
    label: string
    value: number
    color: string
  }) => (
    <div className="bg-white rounded-lg shadow p-6 border-t-4" style={{ borderTopColor: color }}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{label}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
        </div>
        <div className="p-3 rounded-full" style={{ backgroundColor: `${color}20` }}>
          <Icon className="w-8 h-8" style={{ color }} />
        </div>
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back! Here's an overview of your wedding.</p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Link href="/admin/guests" className="btn-primary text-center">
          ➕ Add Guest
        </Link>
        <Link href="/admin/seating" className="btn-primary text-center">
          🪑 Manage Seating
        </Link>
        <Link href="/admin/checkin" className="btn-primary text-center">
          ✅ Check-in
        </Link>
        <Link href="/admin/photos" className="btn-primary text-center">
          📸 Manage Photos
        </Link>
      </div>

      {/* Statistics */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader className="w-8 h-8 text-purple-600 animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <StatCard
            icon={Users}
            label="Total Guests"
            value={stats.totalGuests}
            color="#667eea"
          />
          <StatCard
            icon={UserCheck}
            label="Confirmed"
            value={stats.confirmedGuests}
            color="#10b981"
          />
          <StatCard
            icon={Users2}
            label="Pending"
            value={stats.pendingGuests}
            color="#f59e0b"
          />
          <StatCard
            icon={UserX}
            label="Declined"
            value={stats.declinedGuests}
            color="#ef4444"
          />
          <StatCard
            icon={CheckCircle2}
            label="Checked In"
            value={stats.checkedInGuests}
            color="#8b5cf6"
          />
        </div>
      )}

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Getting Started</h2>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
              <span className="text-sm font-bold text-purple-600">1</span>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Add Guests</h3>
              <p className="text-sm text-gray-600">
                Import guest list or add guests manually
              </p>
            </div>
            <Link href="/admin/guests" className="ml-auto btn-secondary text-sm">
              Go
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
              <span className="text-sm font-bold text-purple-600">2</span>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Set Up Seating</h3>
              <p className="text-sm text-gray-600">
                Create tables and assign guests to seats
              </p>
            </div>
            <Link href="/admin/seating" className="ml-auto btn-secondary text-sm">
              Go
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
              <span className="text-sm font-bold text-purple-600">3</span>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Wedding Day</h3>
              <p className="text-sm text-gray-600">
                Use check-in system on the day of the wedding
              </p>
            </div>
            <Link href="/admin/checkin" className="ml-auto btn-secondary text-sm">
              Go
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
