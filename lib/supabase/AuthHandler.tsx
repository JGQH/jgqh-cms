import React, { createContext, useContext, useEffect, useState } from 'react'
import Supabase from './Supabase'
import type { User } from '@supabase/gotrue-js'

const AuthContext = createContext<Partial<AuthProps>>({})

// Creates 'Provider' to pass down all the needed data
interface ProviderProps {
  children: JSX.Element | JSX.Element[]
}

export default function AuthProvider({ children }: ProviderProps) {
  const auth = useAuthProvider()

  return <AuthContext.Provider value={auth} >
    {!auth.loading && children}
  </AuthContext.Provider>
}

// Handles all logic passed down with the provider
interface AuthProps {
  user?: User | null | undefined
  loading: boolean
}

function useAuthProvider(): AuthProps {
  const [user, setUser] = useState<User | null | undefined>()
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const startSession = Supabase.auth.session()
    
    setUser(startSession?.user)
    setLoading(false)

    const disconnect = Supabase.auth.onAuthStateChange(async (_, session) => {
      setUser(session?.user)
      setLoading(false)
    })

    return () => {
      disconnect.data?.unsubscribe()
    }
  }, [])

  return {
    user,
    loading
  }
}

//Hook to use the context without the need of explicit 'Consumer'
export function useAuth() {
  return useContext(AuthContext)
}

