import { supabase } from './supabase'
import { AuthUser } from './types'

export class AuthError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'AuthError'
  }
}

/**
 * Sign up a new user
 */
export async function signup(email: string, password: string, fullName: string) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    })

    if (error) throw new AuthError(error.message)
    return { data, error: null }
  } catch (error) {
    return { data: null, error }
  }
}

/**
 * Sign in with email and password
 */
export async function signin(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) throw new AuthError(error.message)
    return { data, error: null }
  } catch (error) {
    return { data: null, error }
  }
}

/**
 * Sign out current user
 */
export async function signout() {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) throw new AuthError(error.message)
    return { error: null }
  } catch (error) {
    return { error }
  }
}

/**
 * Get current session
 */
export async function getSession() {
  try {
    const { data, error } = await supabase.auth.getSession()
    if (error) throw new AuthError(error.message)
    return { data: data.session, error: null }
  } catch (error) {
    return { data: null, error }
  }
}

/**
 * Get current user
 */
export async function getCurrentUser(): Promise<AuthUser | null> {
  try {
    const { data, error } = await supabase.auth.getUser()
    if (error) throw new AuthError(error.message)
    return data.user as AuthUser
  } catch (error) {
    console.error('Error getting current user:', error)
    return null
  }
}

/**
 * Verify user's wedding access
 */
export async function verifyWeddingAccess(
  userId: string,
  weddingId: string
): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from('wedding_members')
      .select('id')
      .eq('user_id', userId)
      .eq('wedding_id', weddingId)
      .single()

    if (error) return false
    return !!data
  } catch (error) {
    return false
  }
}

/**
 * Reset password (send reset email)
 */
export async function resetPassword(email: string) {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password`,
    })

    if (error) throw new AuthError(error.message)
    return { error: null }
  } catch (error) {
    return { error }
  }
}

/**
 * Update password
 */
export async function updatePassword(newPassword: string) {
  try {
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    })

    if (error) throw new AuthError(error.message)
    return { error: null }
  } catch (error) {
    return { error }
  }
}
