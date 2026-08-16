'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLogin() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // Simple password check (can customize)
      const correctPassword = 'parn-mike-2026'

      if (password === correctPassword) {
        // Store auth in localStorage
        localStorage.setItem('adminAuth', 'true')
        localStorage.setItem('adminLoginTime', new Date().toISOString())
        router.push('/admin')
      } else {
        setError('Invalid password')
      }
    } catch (err) {
      setError('Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#789568] to-[#536B3E] flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-[#789568]/10 w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl font-bold text-[#536B3E] mb-2">
            Admin Portal
          </h1>
          <p className="text-[#789568] font-serif">PARN & MIKE Wedding</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="flex items-center gap-2 font-serif text-sm font-semibold text-[#536B3E] mb-2">
              <i className="ti ti-lock text-[#789568]"></i>
              Admin Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="w-full px-4 py-3 border border-[#789568]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#789568] bg-[#F5EBD2]/50 font-serif"
              autoFocus
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-red-700 font-serif text-sm">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            className="w-full px-8 py-3 bg-gradient-to-r from-[#789568] to-[#536B3E] text-white font-serif font-bold rounded-lg hover:from-[#536B3E] hover:to-[#3a4d2e] disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <i className="ti ti-login"></i>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="mt-8 p-4 bg-[#789568]/10 rounded-lg text-center">
          <p className="text-xs text-[#789568] font-serif">
            Default password: <strong>parn-mike-2026</strong>
          </p>
        </div>
      </div>
    </div>
  )
}
