'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Upload, Trash2, Eye, EyeOff } from 'lucide-react'

interface Photo {
  id: string
  url: string
  caption?: string
  approved: boolean
  uploaded_at: string
}

export default function PhotosPage() {
  const [photos, setPhotos] = useState<Photo[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [caption, setCaption] = useState('')

  useEffect(() => {
    fetchPhotos()
  }, [])

  const fetchPhotos = async () => {
    try {
      setLoading(true)
      const { data } = await supabase
        .from('wedding_photos')
        .select('*')
        .order('uploaded_at', { ascending: false })
      setPhotos(data || [])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      setUploading(true)
      const fileName = `${Date.now()}_${file.name}`
      const { data, error: uploadError } = await supabase.storage
        .from('wedding-photos')
        .upload(`public/${fileName}`, file)

      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage
        .from('wedding-photos')
        .getPublicUrl(`public/${fileName}`)

      await supabase.from('wedding_photos').insert([
        {
          url: publicUrl,
          caption: caption,
          approved: false,
          uploaded_at: new Date().toISOString(),
        },
      ])

      alert('Photo uploaded! Waiting for approval.')
      setCaption('')
      fetchPhotos()
    } catch (err: any) {
      alert('Error: ' + err.message)
    } finally {
      setUploading(false)
    }
  }

  const toggleApproval = async (photoId: string, approved: boolean) => {
    try {
      await supabase
        .from('wedding_photos')
        .update({ approved: !approved })
        .eq('id', photoId)
      alert('Updated!')
      fetchPhotos()
    } catch (err: any) {
      alert('Error: ' + err.message)
    }
  }

  const deletePhoto = async (photoId: string) => {
    if (confirm('Delete this photo?')) {
      try {
        await supabase.from('wedding_photos').delete().eq('id', photoId)
        alert('Photo deleted!')
        fetchPhotos()
      } catch (err: any) {
        alert('Error: ' + err.message)
      }
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl font-bold text-[#789568]">Photos</h1>
        <p className="text-[#B7A286] mt-2 font-serif">Manage wedding photo gallery</p>
      </div>

      {/* Upload Section */}
      <div className="bg-white rounded-lg shadow-lg p-6 border border-[#789568]/20">
        <h2 className="font-serif text-xl font-bold text-[#789568] mb-4">Upload Photo</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-serif font-medium text-[#789568] mb-2">Photo</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleUpload}
              disabled={uploading}
              className="w-full px-4 py-2 border-2 border-dashed border-[#789568]/30 rounded-lg focus:outline-none bg-[#F5EBD2]/50 cursor-pointer font-serif"
            />
          </div>
          <div>
            <label className="block text-sm font-serif font-medium text-[#789568] mb-2">Caption (Optional)</label>
            <input
              type="text"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Add a caption..."
              className="w-full px-4 py-2 border border-[#789568]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#789568] bg-[#F5EBD2]/50 font-serif"
            />
          </div>
        </div>
      </div>

      {/* Photos Grid */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-[#789568]/20">
        {loading ? (
          <div className="p-8 text-center text-[#789568] font-serif">Loading photos...</div>
        ) : photos.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-[#B7A286] font-serif">No photos uploaded yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
            {photos.map((photo) => (
              <div key={photo.id} className="rounded-lg overflow-hidden border-2 border-[#789568]/20 hover:border-[#789568] transition">
                <div className="relative bg-[#F5EBD2] aspect-square overflow-hidden">
                  <img src={photo.url} alt={photo.caption} className="w-full h-full object-cover hover:scale-105 transition" />
                  <div className="absolute top-2 right-2 flex gap-2">
                    <button
                      onClick={() => toggleApproval(photo.id, photo.approved)}
                      className={`p-2 rounded-full ${photo.approved ? 'bg-green-500' : 'bg-gray-400'} text-white hover:scale-110 transition`}
                    >
                      {photo.approved ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => deletePhoto(photo.id)}
                      className="p-2 rounded-full bg-red-500 text-white hover:scale-110 transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="p-3">
                  <p className="text-xs text-[#789568] font-serif">{photo.caption || 'No caption'}</p>
                  <p className={`text-xs font-serif font-bold ${photo.approved ? 'text-green-600' : 'text-yellow-600'}`}>
                    {photo.approved ? '✅ Approved' : '⏳ Pending'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-lg shadow-lg p-6 border border-[#789568]/20">
          <p className="text-[#B7A286] text-sm font-serif">Total Photos</p>
          <p className="text-3xl font-bold text-[#789568] font-serif">{photos.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6 border border-[#789568]/20">
          <p className="text-[#B7A286] text-sm font-serif">Approved</p>
          <p className="text-3xl font-bold text-green-600 font-serif">{photos.filter(p => p.approved).length}</p>
        </div>
      </div>
    </div>
  )
}
