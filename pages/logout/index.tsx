import { useAuth } from '@Auth'
import Router from 'next/router'
import { useEffect } from 'react'

export default function Logout() {
  const { user, signOut } = useAuth()

  useEffect(() => {
    const logout = async () => {
      if( user ) {
        await signOut()
      }
      await Router.push('/')
    }

    logout()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  return <p>Logging out...</p>
}