import useAsync from '@Hooks/useAsync'
import useIdentifier from '@Hooks/useIdentifier'
import Redirecter from '@Redirecter'
import { getValues } from '@Store'
import { useEffect } from 'react'
import type { dynamicQuery } from '@Types'
import DynamicEndpoint from 'components/Routes/Dynamic/DynamicEndpoint'

function Dynamic() {
  const { id } = useIdentifier()
  const { execute, value } = useAsync<dynamicQuery | null>(async () => getValues(id, 'Dynamic'))

  useEffect(() => {
    execute()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if(value.status === 'idle') return <p>Waiting for fetching to start...</p>
  if(value.status === 'pending') return <p>Loading values...</p>
  if(value.status === 'error') return <p>There&apos;s been an error. ({value.error})</p>
  if(!value.response) return <p>No values were found.</p>

  return <DynamicEndpoint {...value.response} />
}

export default function DoDynamic() {
  return <Redirecter userOnly={true} redirectTo={'/'}>
    <Dynamic />
  </Redirecter>
}