import React, { useEffect } from 'react'
import { getEndpoints, endpointsDict } from '@Store'
import { useAsync, asyncStatus } from 'lib/hooks/useAsync'
import EndpointsHandler from './EndpointsHandler'

export default function EndpointsVisualizer() {
  const { execute, value } = useAsync<endpointsDict>(getEndpoints)

  useEffect(() => {
    execute()
  }, [execute])

  return (
    <>
      {value.status === asyncStatus.IDLE && 
        <p>Attempting to load your endpoints...</p>}
      {value.status === asyncStatus.PENDING &&
        <p>Loading your endpoints...</p>}
      {value.status === asyncStatus.ERROR &&
        <p>There&apos;s been an error ({value.error})</p>}
      {value.status === asyncStatus.SUCCESS && <EndpointsHandler response={value.response} />}
    </>
  )
}