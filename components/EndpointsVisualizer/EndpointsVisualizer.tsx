import React, { useEffect } from 'react'
import { getEndpoints, endpointsDict } from '@Store'
import { useAsync, asyncStatus } from 'lib/hooks/useAsync'
import EndpointsHandler from './EndpointsHandler'
import styles1 from './endpointsVisualizer.module.scss'
import styles2 from './endpointsHandler.module.scss'
import JButton from '@Components/JButton'


export default function EndpointsVisualizer() {
  const { execute, value } = useAsync<endpointsDict>(getEndpoints)

  useEffect(() => {
    execute()
  }, [execute])

  return (
    <div className={styles1.endpointsVisualizer}>
      <div className={styles2.endpointsContainer}>
        {value.status === asyncStatus.IDLE && 
          <p>Attempting to load your endpoints...</p>}
        {value.status === asyncStatus.PENDING &&
          <p>Loading your endpoints...</p>}
        {value.status === asyncStatus.ERROR &&
          <p>There&apos;s been an error ({value.error})</p>}
        {value.status === asyncStatus.SUCCESS && <EndpointsHandler response={value.response} />}
      </div>
      <div className={styles1.endpointsControllers}>
          <JButton onClick={execute} disabled={(value.status === asyncStatus.IDLE) || (value.status === asyncStatus.PENDING)}>
            Reload
          </JButton>
      </div>
    </div>)
}