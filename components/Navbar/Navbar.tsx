import { useAuth } from '@Auth'
import Router from 'next/router'
import styles from './navbar.module.scss'

export default function Navbar() {
  const { user } = useAuth()

  return (
    <div className={styles.navbarContainer}>
      <div className={styles.navbarTitle}>
        <h1>Endpoints CMS</h1>
      </div>
      <div className={styles.navbarOptions}>
        <button onClick={() => Router.push('/')}>Home</button>
        {user ?
        <button onClick={() => Router.push('/logout')}>Logout</button>
        :
        <button onClick={() => Router.push('/login')}>Login</button>}
      </div>
    </div>
  )
}