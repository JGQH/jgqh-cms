import useAsync from '@Hooks/useAsync'
import useIdentifier from '@Hooks/useIdentifier'
import Redirecter from '@Redirecter'
import { getValues } from '@Store'
import { useEffect } from 'react'

interface valueQuery {
  id: string
  Endpoint_id: string
  URL: string
}

function Dynamic() {
  const { id } = useIdentifier()
  const { execute, value } = useAsync<valueQuery>(async () => await getValues(id, 'Dynamic'))

  useEffect(() => {
    execute()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  return (
  <>
    {value.status === 'idle' && <p>Waiting for fetching to start...</p>}
    {value.status === 'pending' && <p>Fetching data...</p>}
    {value.status === 'error' && <p>There&apos;s been an error</p>}
    {value.status === 'success' && JSON.stringify(value.response)}
  </>)
}

export default function DoDynamic() {
  return <Redirecter userOnly={true} redirectTo={'/'}>
    <Dynamic />
  </Redirecter>
}