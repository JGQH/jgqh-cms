import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import Supabase from './Supabase'
import type { User } from '@supabase/gotrue-js'
import type { Provider, Session } from '@supabase/supabase-js'

const AuthContext = createContext<AuthProps>({
  user: null,
  loading: true,
  signIn: async () => ({}) as SignInProps
})

// Creates 'Provider' to pass down all the needed data
interface ProviderProps {
  children: ReactNode
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
  signIn: (email:string, password:string) => Promise<SignInProps>
}

interface SignInProps {
  session: Session | null
  user: User | null
  provider?: Provider | undefined
  url?: string | null | undefined
  error: Error | null
  data: Session | null
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

  async function signIn(email:string, password:string):Promise<SignInProps> {
    return await Supabase.auth.signIn({ email, password })
  }

  return {
    user,
    loading,
    signIn
  }
}

//Hook to use the context without the need of explicit 'Consumer'
export function useAuth() {
  return useContext(AuthContext)
}

