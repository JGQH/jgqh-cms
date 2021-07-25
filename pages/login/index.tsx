import { useAuth } from '@Auth'
import JButton from '@Components/JButton'
import JInput from 'components/JInput/JInput'
import Router from 'next/router'
import { useState } from 'react'
import styles from './index.module.scss'

export default function Login() {
  const { signIn } = useAuth()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  async function attemptLogin() {
    try {
      await signIn(email, password)
      Router.push('/')
    } catch (e) {
      alert((e as Error).message)
    }
  }

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginContainer}>
        <div className={styles.loginTitle}>
          <h1>Login Form</h1>
        </div>
        <div className={styles.loginContent}>
          <div className={styles.loginInput}>
            <div className={styles.inputTitle}>
              <p>Email:</p>
            </div>
            <div className={styles.inputField}>
              <JInput type='email' onChange={e => setEmail(e.target.value)} />
            </div>
          </div>
          <div className={styles.loginInput}>
            <div className={styles.inputTitle}>
              <p>Password:</p>
            </div>
            <div className={styles.inputField}>
              <JInput type='password' onChange={e => setPassword(e.target.value)} />
            </div>
          </div>
        </div>
        <div className={styles.loginActions}>
          <JButton onClick={() => Router.push('/')}>Return</JButton>
          <JButton onClick={attemptLogin}>Login</JButton>
        </div>
      </div>
    </div>
  )
}