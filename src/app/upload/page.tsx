'use client'

import { useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { savePhotoToDatabase } from '@/app/actions/savePhoto'

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [guestName, setGuestName] = useState('')
  const [caption, setCaption] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      const reader = new FileReader()
      reader.onload = (event) => {
        setPreview(event.target?.result as string)
      }
      reader.readAsDataURL(selectedFile)
    }
  }

  const sanitizeFilename = (filename: string): string => {
    return filename
      .replace(/[^a-zA-Z0-9.-]/g, '_')
      .replace(/_{2,}/g, '_')
      .toLowerCase()
  }

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!file || !guestName) {
      setError('Please select a photo and enter your name')
      return
    }

    try {
      setLoading(true)

      // Step 1: Upload file to Storage (anon key is fine)
      const timestamp = Date.now()
      const sanitizedName = sanitizeFilename(file.name)
      const storagePath = `guest-uploads/${timestamp}_${sanitizedName}`

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('wedding-photos')
        .upload(storagePath, file)

      if (uploadError) {
        setError('Storage error: ' + uploadError.message)
        setLoading(false)
        return
      }

      // Step 2: Build URL
      const fileUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/wedding-photos/${storagePath}`

      // Step 3: Save to database using server action (service role key)
      await savePhotoToDatabase(fileUrl, guestName, caption)

      setSuccess(true)
      setFile(null)
      setPreview(null)
      setGuestName('')
      setCaption('')

      setTimeout(() => setSuccess(false), 3000)
    } catch (err: any) {
      console.error('Upload error:', err)
      setError(err.message || 'Upload failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#F5EBD2]">
      <nav className="bg-white shadow-sm sticky top-0 z-40 border-b border-[#789568]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-3">
              <span className="font-serif font-bold text-lg text-[#789568]">PARN & MIKE</span>
            </Link>
            <div className="space-x-6">
              <Link href="/photos" className="text-sm font-serif font-medium text-[#536B3E] hover:text-[#789568]">Photos</Link>
              <Link href="/rsvp" className="text-sm font-serif font-medium text-[#536B3E] hover:text-[#789568]">RSVP</Link>
              <Link href="/information" className="text-sm font-serif font-medium text-[#536B3E] hover:text-[#789568]">Information</Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-2xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl font-bold text-[#536B3E] mb-3 flex items-center justify-center gap-3">
            <i className="ti ti-camera text-[#789568]"></i>
            Share Your Moments
          </h1>
          <p className="text-[#789568] font-serif text-lg">แชร์รูปความสุขของคุณ</p>
        </div>

        {success && (
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-[#789568]/10 p-12 text-center mb-8">
            <div className="mb-6 flex justify-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#789568] to-[#536B3E] flex items-center justify-center">
                <i className="ti ti-check text-white text-3xl"></i>
              </div>
            </div>
            <h2 className="font-serif text-3xl font-bold text-[#536B3E] mb-3">Upload Successful!</h2>
            <p className="text-[#789568] font-serif text-lg">ขอบคุณที่แชร์รูปนะคะ!</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
            <p className="text-red-700 font-serif">{error}</p>
          </div>
        )}

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-[#789568]/10">
          <div className="bg-gradient-to-r from-[#789568] to-[#536B3E] px-8 py-8 text-center text-white">
            <p className="font-serif text-lg opacity-90">Upload Your Photo</p>
          </div>

          <div className="p-8 md:p-12">
            <form onSubmit={handleUpload} className="space-y-8">
              <div>
                <label className="flex items-center gap-2 font-serif text-sm font-semibold text-[#536B3E] mb-4">
                  <i className="ti ti-camera text-[#789568]"></i>
                  Select Photo *
                </label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-input"
                />
                <label
                  htmlFor="file-input"
                  className="block w-full p-8 border-2 border-dashed border-[#789568]/30 rounded-2xl text-center cursor-pointer hover:border-[#789568]/60 transition-all"
                >
                  {preview ? (
                    <div className="space-y-3">
                      <img src={preview} alt="Preview" className="w-32 h-32 object-cover rounded-lg mx-auto" />
                      <p className="text-[#789568] font-serif text-sm">Click to change</p>
                    </div>
                  ) : (
                    <div className="space-y-3 py-8">
                      <i className="ti ti-cloud-upload text-[#789568] text-4xl block"></i>
                      <p className="text-[#536B3E] font-serif font-semibold">Click to upload</p>
                    </div>
                  )}
                </label>
              </div>

              <div>
                <label className="flex items-center gap-2 font-serif text-sm font-semibold text-[#536B3E] mb-2">
                  <i className="ti ti-user text-[#789568]"></i>
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="w-full px-4 py-3 border border-[#789568]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#789568] bg-[#F5EBD2]/50 font-serif"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 font-serif text-sm font-semibold text-[#536B3E] mb-2">
                  <i className="ti ti-writing text-[#789568]"></i>
                  Caption (optional)
                </label>
                <textarea
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 border border-[#789568]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#789568] bg-[#F5EBD2]/50 font-serif resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading || !file || !guestName}
                className="w-full px-8 py-3 bg-gradient-to-r from-[#789568] to-[#536B3E] text-white font-serif font-medium rounded-lg hover:from-[#536B3E] hover:to-[#3a4d2e] disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <i className="ti ti-cloud-upload"></i>
                {loading ? 'Uploading...' : 'Share Photo'}
              </button>
            </form>
          </div>
        </div>
      </main>

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
