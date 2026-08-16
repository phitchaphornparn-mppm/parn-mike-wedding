// User Types
export interface User {
  id: string
  email: string
  full_name?: string
  role: 'admin' | 'staff' | 'photographer'
  avatar_url?: string
  created_at: string
}

// Wedding Types
export interface Wedding {
  id: string
  slug: string
  couple_name: string
  display_name: string
  wedding_date: string
  wedding_time?: string
  venue_name?: string
  venue_address?: string
  venue_map_url?: string
  logo_url?: string
  cover_image_url?: string
  theme?: string
  dress_code?: string
  parking_info?: string
  contact_phone?: string
  contact_email?: string
  online_gift_url?: string
  status: 'draft' | 'published' | 'archived'
  created_by?: string
  created_at: string
  updated_at: string
}

// Wedding Member Types
export interface WeddingMember {
  id: string
  wedding_id: string
  user_id: string
  role: 'admin' | 'planner' | 'staff' | 'photographer'
  joined_at: string
}

// Guest Types
export interface Guest {
  id: string
  wedding_id: string
  guest_code: string
  full_name: string
  display_name?: string
  phone?: string
  email?: string
  rsvp_status: 'pending' | 'confirmed' | 'declined'
  rsvp_confirmed_at?: string
  party_size: number
  table_id?: string
  seat_id?: string
  qr_token?: string
  dietary_notes?: string
  relationship?: string
  notes?: string
  created_at: string
  updated_at: string
}

// Table Types
export interface DiningTable {
  id: string
  wedding_id: string
  table_number: string
  table_name?: string
  capacity: number
  table_type: 'regular' | 'sweetheart' | 'gift'
  position_x?: number
  position_y?: number
  notes?: string
  created_at: string
  updated_at: string
}

// Seat Types
export interface TableSeat {
  id: string
  table_id: string
  seat_number: number
  guest_id?: string
  created_at: string
}

// Check-in Types
export interface CheckIn {
  id: string
  wedding_id: string
  guest_id: string
  checked_in_at: string
  checked_in_by?: string
  method: 'qr' | 'staff_search' | 'guest_self'
  notes?: string
}

// Authentication Types
export interface AuthUser {
  id: string
  email: string
  user_metadata?: Record<string, any>
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
}
