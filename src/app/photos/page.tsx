'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

interface Photo {
  id: string
  url: string
  caption?: string
  uploaded_at: string
}

export default function PhotosPage() {
  const [photos, setPhotos] = useState<Photo[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPhotos()
  }, [])

  const fetchPhotos = async () => {
    try {
      setLoading(true)
      const { data } = await supabase
        .from('wedding_photos')
        .select('*')
        .eq('approved', true)
        .order('uploaded_at', { ascending: false })
      setPhotos(data || [])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#F5EBD2]">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-40 border-b border-[#789568]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-3">
              <span className="font-serif font-bold text-lg text-[#789568]">PARN & MIKE</span>
            </Link>
            <div className="space-x-6">
              <Link href="/rsvp" className="text-sm font-serif font-medium text-[#536B3E] hover:text-[#789568] transition-colors">
                RSVP
              </Link>
              <Link href="/information" className="text-sm font-serif font-medium text-[#536B3E] hover:text-[#789568] transition-colors">
                Information
              </Link>
              <Link href="/schedule" className="text-sm font-serif font-medium text-[#536B3E] hover:text-[#789568] transition-colors">
                Schedule
              </Link>
              <a href="https://parn-mike-wedding.netlify.app" target="_blank" rel="noopener noreferrer" className="text-sm font-serif font-medium text-[#C9A45C] hover:text-[#789568]">อวยพร</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Main */}
      <main className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="font-serif text-4xl font-bold text-[#536B3E] mb-3 flex items-center justify-center gap-3">
            <i className="ti ti-photo text-[#789568]"></i>
            Wedding Gallery
          </h1>
          <p className="text-[#789568] font-serif text-lg">Beautiful moments from our special day</p>
        </div>

        {loading ? (
          <div className="text-center py-16 text-[#536B3E] font-serif">Loading gallery...</div>
        ) : photos.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-lg border border-[#789568]/10">
            <div className="mb-4 flex justify-center text-6xl text-[#789568]">
              <i className="ti ti-photo"></i>
            </div>
            <p className="text-[#536B3E] font-serif font-medium mb-2">No photos shared yet</p>
            <p className="text-sm text-[#789568] font-serif">Check back soon for beautiful memories!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {photos.map((photo) => (
              <div key={photo.id} className="group rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-[#789568]/10">
                <div className="bg-[#F5EBD2] aspect-square overflow-hidden relative">
                  <img src={photo.url} alt={photo.caption} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                {photo.caption && (
                  <div className="p-4 bg-white">
                    <p className="text-sm font-serif text-[#536B3E] font-medium">{photo.caption}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {photos.length > 0 && (
          <div className="mt-16 text-center">
            <p className="text-[#789568] font-serif text-lg">
              Total Photos: <span className="font-bold text-[#536B3E]">{photos.length}</span>
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-[#536B3E] to-[#3a4d2e] text-white py-12 mt-16 border-t border-[#789568]/20">
        <div className="max-w-6xl mx-auto px-4 text-center space-y-3">
          <p className="font-serif text-lg font-semibold text-[#B7A286]">PARN & MIKE</p>
          <p className="text-sm text-[#B7A286]">© 2026 Our Special Day. All our love.</p>
          <p className="text-xs text-[#B7A286]/80">Created by Bride Parn</p>
        </div>
      </footer>
    </div>
  )
}
