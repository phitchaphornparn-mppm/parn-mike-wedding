'use client'

import { useEffect, useState, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import { AuthUser } from '@/lib/types'

interface UseAuthReturn {
  user: AuthUser | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<any>
  signOut: () => Promise<void>
  error: string | null
}

export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Check if user is already logged in
  useEffect(() => {
    const checkAuth = async () => {
      try {
        setLoading(true)
        const { data, error } = await supabase.auth.getUser()

        if (error) {
          setError(error.message)
          setUser(null)
        } else {
          setUser(data.user as AuthUser)
          setError(null)
        }
      } catch (err) {
        console.error('Auth check error:', err)
        setError('Failed to check authentication')
      } finally {
        setLoading(false)
      }
    }

    checkAuth()

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session) {
        setUser(session.user as AuthUser)
        setError(null)
      } else {
        setUser(null)
      }
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const signIn = useCallback(async (email: string, password: string) => {
    try {
      setLoading(true)
      setError(null)

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        setError(error.message)
        throw error
      }

      setUser(data.user as AuthUser)
      return { success: true, data }
    } catch (err: any) {
      setError(err.message || 'Sign in failed')
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const signOut = useCallback(async () => {
    try {
      setLoading(true)
      const { error } = await supabase.auth.signOut()

      if (error) {
        setError(error.message)
        throw error
      }

      setUser(null)
      setError(null)
    } catch (err: any) {
      setError(err.message || 'Sign out failed')
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    user,
    loading,
    signIn,
    signOut,
    error,
  }
}
