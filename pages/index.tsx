import { useEffect } from 'react'
import Head from 'next/head'
import Router from 'next/router'
import { useAuth } from '@Auth'
import EndpointsHandler from '@Components/EndpointsHandler'
import JButton from '@Components/JButton'
import useAsync from '@Hooks/useAsync'
import { endpointsDict, getEndpoints } from '@Store'
import styles from '@Styles/Home.module.scss'


export default function Home() {
  const { user } = useAuth()
  const [ execute, value ] = useAsync<endpointsDict>(getEndpoints)
  const disabled = (value.status === 'idle') || (value.status === 'pending')

  useEffect(() => {
    execute()
  }, [execute])

  return (
    <div className={styles.endpointsVisualizer}>
      <Head>
        <title>Endpoints CMS</title>
      </Head>
      <div className={styles.endpointsContainer}>
        {value.status === 'idle' &&
          <p>Attempting to load your endpoints...</p>}
        {value.status === 'pending' &&
          <p>Loading your endpoints...</p>}
        {value.status === 'error' &&
          <p>There&apos;s been an error ({value.error})</p>}
        {value.status === 'success' && 
          <EndpointsHandler response={value.response} />}
      </div>
      <div className={styles.endpointsControllers}>
        <JButton onClick={execute} disabled={disabled}>
          Reload
        </JButton>
        {user &&
        <JButton onClick={() => Router.push('/create')} disabled={!(value.status === 'success')}>
          Add Endpoint
        </JButton>}
      </div>
    </div>
  )
}
