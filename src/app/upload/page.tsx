'use client'

import { useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { savePhotoToDatabase } from '@/app/actions/savePhoto'

export default function UploadPage() {
  const [files, setFiles] = useState<File[]>([])
  const [previews, setPreviews] = useState<string[]>([])
  const [guestName, setGuestName] = useState('')
  const [caption, setCaption] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files
    if (selectedFiles) {
      const fileArray = Array.from(selectedFiles)
      setFiles(fileArray)
      
      const newPreviews: string[] = []
      fileArray.forEach((file) => {
        const reader = new FileReader()
        reader.onload = (event) => {
          newPreviews.push(event.target?.result as string)
          if (newPreviews.length === fileArray.length) {
            setPreviews(newPreviews)
          }
        }
        reader.readAsDataURL(file)
      })
    }
  }

  const sanitizeFilename = (filename: string): string => {
    return filename.replace(/[^a-zA-Z0-9.-]/g, '_').replace(/_{2,}/g, '_').toLowerCase()
  }

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (files.length === 0 || !guestName) {
      setError('Please select photos and enter your name')
      return
    }

    try {
      setLoading(true)

      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const timestamp = Date.now()
        const sanitizedName = sanitizeFilename(file.name)
        const storagePath = `guest-uploads/${timestamp}_${i}_${sanitizedName}`

        const { error: uploadError } = await supabase.storage
          .from('wedding-photos')
          .upload(storagePath, file)

        if (uploadError) {
          setError(`Error uploading ${file.name}: ${uploadError.message}`)
          setLoading(false)
          return
        }

        const fileUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/wedding-photos/${storagePath}`
        await savePhotoToDatabase(fileUrl, guestName, caption)
      }

      setSuccess(true)
      setFiles([])
      setPreviews([])
      setGuestName('')
      setCaption('')

      setTimeout(() => setSuccess(false), 3000)
    } catch (err: any) {
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
              <a href="https://parn-mike-wedding.netlify.app" target="_blank" rel="noopener noreferrer" className="text-sm font-serif font-medium text-[#C9A45C] hover:text-[#789568]">อวยพร</a>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-2xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl font-bold text-[#536B3E] mb-3">
            <i className="ti ti-camera text-[#789568]"></i> Share Your Moments
          </h1>
        </div>

        {success && (
          <div className="bg-white rounded-3xl shadow-2xl p-12 text-center mb-8 border border-[#789568]/10">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#789568] to-[#536B3E] flex items-center justify-center mx-auto mb-6">
              <i className="ti ti-check text-white text-3xl"></i>
            </div>
            <h2 className="font-serif text-3xl font-bold text-[#536B3E] mb-3">Upload Successful!</h2>
            <p className="text-[#789568] font-serif">ขอบคุณที่แชร์รูปนะคะ!</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
            <p className="text-red-700 font-serif">{error}</p>
          </div>
        )}

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-[#789568]/10">
          <div className="bg-gradient-to-r from-[#789568] to-[#536B3E] px-8 py-8 text-center text-white">
            <p className="font-serif text-lg">Upload Your Photos (Multiple) 📸</p>
          </div>

          <div className="p-8">
            <form onSubmit={handleUpload} className="space-y-8">
              <div>
                <label className="flex items-center gap-2 font-serif text-sm font-semibold text-[#536B3E] mb-4">
                  <i className="ti ti-camera text-[#789568]"></i> Select Photos *
                </label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  multiple
                  className="hidden"
                  id="file-input"
                />
                <label
                  htmlFor="file-input"
                  className="block w-full p-8 border-2 border-dashed border-[#789568]/30 rounded-2xl text-center cursor-pointer hover:border-[#789568]/60"
                >
                  {files.length > 0 ? (
                    <div>
                      <p className="text-[#789568] font-serif font-semibold mb-3">
                        {files.length} photo(s) selected
                      </p>
                      <div className="grid grid-cols-3 gap-2">
                        {previews.map((preview, idx) => (
                          <img key={idx} src={preview} alt={`Preview ${idx}`} className="w-full h-20 object-cover rounded-lg" />
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="py-8">
                      <i className="ti ti-cloud-upload text-[#789568] text-4xl block mb-3"></i>
                      <p className="text-[#536B3E] font-serif font-semibold">Click to upload multiple photos</p>
                    </div>
                  )}
                </label>
              </div>

              <div>
                <label className="flex items-center gap-2 font-serif text-sm font-semibold text-[#536B3E] mb-2">
                  <i className="ti ti-user text-[#789568]"></i> Your Name *
                </label>
                <input
                  type="text"
                  required
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="w-full px-4 py-3 border border-[#789568]/30 rounded-lg focus:ring-2 focus:ring-[#789568] bg-[#F5EBD2]/50 font-serif"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 font-serif text-sm font-semibold text-[#536B3E] mb-2">
                  <i className="ti ti-writing text-[#789568]"></i> Caption
                </label>
                <textarea
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 border border-[#789568]/30 rounded-lg focus:ring-2 focus:ring-[#789568] bg-[#F5EBD2]/50 font-serif resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading || files.length === 0 || !guestName}
                className="w-full px-8 py-3 bg-gradient-to-r from-[#789568] to-[#536B3E] text-white font-serif font-medium rounded-lg hover:from-[#536B3E] hover:to-[#3a4d2e] disabled:opacity-50"
              >
                <i className="ti ti-cloud-upload"></i> Upload {files.length} Photo{files.length !== 1 ? 's' : ''}
              </button>
            </form>
          </div>
        </div>
      </main>

      <footer className="bg-gradient-to-r from-[#536B3E] to-[#3a4d2e] text-white py-12 mt-16 border-t border-[#789568]/20">
        <div className="max-w-6xl mx-auto px-4 text-center space-y-3">
          <p className="font-serif text-lg font-semibold text-[#B7A286]">PARN & MIKE</p>
          <p className="text-sm text-[#B7A286]">© 2026 Our Special Day.</p>
        </div>
      </footer>
    </div>
  )
}
