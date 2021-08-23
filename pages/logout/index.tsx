import { useEffect } from 'react'
import Head from 'next/head'
import { useAuth } from '@Auth'
import useAsync from '@Hooks/useAsync'
import Redirecter from '@Routing/Redirecter'

function Logout() {
  const { signOut } = useAuth()
  const [ execute ] = useAsync(signOut)

  useEffect(() => {
    execute()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  return <p>Logging out...</p>
}

export default function DoLogout() {
  return <Redirecter userOnly={true} redirectTo={'/'}>
    <Head>
      <title>Logout - Endpoint CMS</title>
    </Head>
    <Logout />
  </Redirecter>
}