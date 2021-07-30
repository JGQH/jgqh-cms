import { useState } from 'react'
import Router from 'next/router'
import Redirecter from '@Routing/Redirecter'
import { useAuth } from '@Auth'
import JButton from '@Components/JButton'
import styles from '@Styles/Modal.module.scss'

function Login() {
  const { signIn } = useAuth()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  async function attemptLogin() {
    try {
      await signIn(email, password)
      await Router.push('/')
    } catch (e) {
      alert((e as Error).message)
    }
  }

  return (
    <div className={styles.modalPage}>
      <div className={styles.modalContainer}>
        <div className={styles.modalTitle}>
          <h1>Login Form</h1>
        </div>
        <div className={styles.modalContent}>
          <div className={styles.modalInput}>
            <div className={styles.inputTitle}>
              <p>Email</p>
            </div>
            <div className={styles.inputField}>
              <input type='email' onChange={e => setEmail(e.target.value)} />
            </div>
          </div>
          <div className={styles.loginInput}>
            <div className={styles.inputTitle}>
              <p>Password</p>
            </div>
            <div className={styles.inputField}>
              <input type='password' onChange={e => setPassword(e.target.value)} />
            </div>
          </div>
        </div>
        <div className={styles.modalActions}>
          <JButton onClick={() => Router.push('/')}>Return</JButton>
          <JButton onClick={attemptLogin}>Login</JButton>
        </div>
      </div>
    </div>
  )
}

export default function DoLogin() {
  return <Redirecter userOnly={false} redirectTo={'/'}>
    <Login />
  </Redirecter>
}