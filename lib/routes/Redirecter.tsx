import { ReactNode, useEffect, useState } from 'react'
import Router from 'next/router'
import { useAuth } from '@Auth'

type redirectProps = {
  userOnly: boolean /* */
  redirectTo: string
  children: ReactNode
}

export default function Redirecter({ userOnly, redirectTo, children }: redirectProps): JSX.Element {
  const { user } = useAuth()
  const [isLoading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const doRedirect = (userOnly && !user) || (!userOnly && user)

    if(doRedirect) {
      Router.push(redirectTo)
    } else {
      setLoading(false)
    }
  }, [userOnly, redirectTo, user])

  if(isLoading) return <p>Loading...</p>

  return <>{children}</>
}