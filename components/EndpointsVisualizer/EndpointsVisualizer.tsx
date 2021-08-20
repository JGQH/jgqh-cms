import React, { useEffect } from 'react'
import { getEndpoints, endpointsDict } from '@Store'
import useAsync from 'lib/hooks/useAsync'
import EndpointsHandler from './EndpointsHandler'
import styles1 from './endpointsVisualizer.module.scss'
import styles2 from './endpointsHandler.module.scss'
import JButton from '@Components/JButton'
import Router from 'next/router'
import { useAuth } from '@Auth'


export default function EndpointsVisualizer() {
  const { user } = useAuth()
  const [ execute, value ] = useAsync<endpointsDict>(getEndpoints)

  useEffect(() => {
    execute()
  }, [execute])

  return (
    <div className={styles1.endpointsVisualizer}>
      <div className={styles2.endpointsContainer}>
        {value.status === 'idle' && 
          <p>Attempting to load your endpoints...</p>}
        {value.status === 'pending' &&
          <p>Loading your endpoints...</p>}
        {value.status === 'error' &&
          <p>There&apos;s been an error ({value.error})</p>}
        {value.status === 'success' && <EndpointsHandler response={value.response} />}
      </div>
      <div className={styles1.endpointsControllers}>
          <JButton onClick={execute} disabled={(value.status === 'idle') || (value.status === 'pending')}>
            Reload
          </JButton>
          {user &&
          <JButton onClick={() => Router.push('/create')} disabled={!(value.status === 'success')}>
            Add Endpoint
          </JButton>}
      </div>
    </div>)
}