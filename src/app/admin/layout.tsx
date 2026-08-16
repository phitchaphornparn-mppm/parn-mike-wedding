'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if already logged in
    const auth = localStorage.getItem('adminAuth')
    if (auth === 'true') {
      setIsAuthenticated(true)
      setLoading(false)
    } else {
      if (pathname !== '/admin/login') {
        router.push('/admin/login')
      }
      setLoading(false)
    }
  }, [pathname, router])

  const handleLogout = () => {
    localStorage.removeItem('adminAuth')
    localStorage.removeItem('adminLoginTime')
    router.push('/admin/login')
  }

  if (loading) {
    return <div className="min-h-screen bg-[#F5EBD2]"></div>
  }

  if (pathname === '/admin/login') {
    return children
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-[#F5EBD2]">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-gradient-to-b from-[#536B3E] to-[#3a4d2e] text-white min-h-screen p-6">
          <Link href="/admin" className="flex items-center gap-2 mb-12">
            <span className="font-serif font-bold text-lg text-[#C9A45C]">
              ADMIN
            </span>
          </Link>

          <nav className="space-y-3">
            <Link
              href="/admin"
              className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-[#789568]/30 transition-colors font-serif"
            >
              <i className="ti ti-dashboard"></i>
              Dashboard
            </Link>
            <Link
              href="/admin/guests"
              className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-[#789568]/30 transition-colors font-serif"
            >
              <i className="ti ti-users"></i>
              Guests
            </Link>
            <Link
              href="/admin/seating"
              className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-[#789568]/30 transition-colors font-serif"
            >
              <i className="ti ti-armchair"></i>
              Seating
            </Link>
            <Link
              href="/admin/checkin"
              className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-[#789568]/30 transition-colors font-serif"
            >
              <i className="ti ti-check"></i>
              Check-in
            </Link>
            <Link
              href="/admin/photos"
              className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-[#789568]/30 transition-colors font-serif"
            >
              <i className="ti ti-photo"></i>
              Photos
            </Link>
            <Link
              href="/admin/information"
              className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-[#789568]/30 transition-colors font-serif"
            >
              <i className="ti ti-info-circle"></i>
              Information
            </Link>
            <Link
              href="/admin/schedule"
              className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-[#789568]/30 transition-colors font-serif"
            >
              <i className="ti ti-calendar"></i>
              Schedule
            </Link>
          </nav>

          <div className="mt-auto pt-6 border-t border-[#789568]/30">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-red-500/30 transition-colors font-serif text-sm"
            >
              <i className="ti ti-logout"></i>
              Logout
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">{children}</div>
      </div>
    </div>
  )
}
