"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { createClient } from "@/lib/supabase/client"
import { Profile } from '@/lib/types'
import type { User } from "@supabase/supabase-js"

interface AuthContextType {
    user: User | null
    isLoading: boolean
    profile: Profile | null
    signOut: () => Promise<void>
    login: (email: string, password: string) => Promise<void>
    signup: (email: string, password: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const supabase = createClient()

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [profile, setProfile] = useState<Profile | null>(null)
    const [isLoading, setIsLoading] = useState(true)

const fetchProfile = async (userId: string) => {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()
    
    if (data) {
      setProfile(data as Profile)
    }
  }

  const refreshProfile = async () => {
    if (user) {
      await fetchProfile(user.id)
    }
  }


    useEffect(() => {
        const checkSession = async () => {
            const {
                data: { session },
            } = await supabase.auth.getSession()
            setUser(session?.user || null)
            setIsLoading(false)
        }

        checkSession()

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event: any, session: { user: any }) => {
            setUser(session?.user || null)
        })

        return () => subscription?.unsubscribe()
    }, [])

    const login = async (email: string, password: string) => {
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if (error) {
            console.error("Login error:", error)
            throw error
        }
    }

    const signup = async (email: string, password: string) => {
        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${window.location.origin}/auth`,
            },
        })

        if (error) {
            console.error("Signup error:", error)
            throw error
        }
    }

    const signOut = async () => {
        const { error } = await supabase.auth.signOut()
        if (error) {
            console.error("signOut error:", error)
            throw error
        }
    }

    return <AuthContext.Provider value={{ user, isLoading, profile, login, signup, signOut  }}>{children}</AuthContext.Provider>
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useAuth must be used within AuthProvider")
    }
    return context
}