import { useState } from 'react'
import Router from 'next/router'
import Redirecter from '@Routing/Redirecter'
import { useAuth } from '@Auth'
import JButton from '@Components/JButton'
import styles from '@Styles/Modal.module.scss'
import useAsync from '@Hooks/useAsync'

function Login() {
  const { signIn } = useAuth()
  const [ email, setEmail ] = useState<string>('')
  const [ password, setPassword ] = useState<string>('')
  const { execute, value:{ status } } = useAsync(() => signIn(email, password))

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
          <div className={styles.modalInput}>
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
          <JButton onClick={execute} disabled={status === 'pending'} >Login</JButton>
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