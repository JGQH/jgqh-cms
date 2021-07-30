import { useAuth } from '@Auth'
import useAsync from '@Hooks/useAsync'
import Redirecter from '@Routing/Redirecter'
import { useEffect } from 'react'

function Logout() {
  const { signOut } = useAuth()
  const { execute } = useAsync(signOut)

  useEffect(() => {
    execute()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  return <p>Logging out...</p>
}

export default function DoLogout() {
  return <Redirecter userOnly={true} redirectTo={'/'}>
    <Logout />
  </Redirecter>
}