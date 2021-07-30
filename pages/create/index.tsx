import JButton from '@Components/JButton'
import JInput from '@Components/JInput'
import Redirecter from '@Routing/Redirecter'
import styles from '@Styles/Modal.module.scss'
import { endpointsTypes } from '@Types'
import Router from 'next/router'

function Create() {
  return (
    <div className={styles.modalPage}>
      <div className={styles.modalContainer}>
        <div className={styles.modalTitle}>
          <h1>Create Endpoint</h1>
        </div>
        <div className={styles.modalContent}>
          <div className={styles.modalInput}>
            <div className={styles.inputTitle}>
              <p>Type:</p>
            </div>
            <div className={styles.inputField}>
              <select>
                <option>{endpointsTypes.STATIC}</option>
                <option>{endpointsTypes.DYNAMIC}</option>
              </select>
            </div>
          </div>
          <div className={styles.modalInput}>
            <div className={styles.inputTitle}>
              <p>Name:</p>
            </div>
            <div className={styles.inputField}>
              <JInput />
            </div>
          </div>
          <div className={styles.modalInput}>
            <div className={styles.inputTitle}>
              <p>Wait:</p>
            </div>
            <div className={styles.inputField}>
              <JInput />
            </div>
          </div>
        </div>
        <div className={styles.modalActions}>
          <JButton onClick={() => Router.push('/')}>Return</JButton>
          <JButton>Create</JButton>
        </div>
      </div>
    </div>)
}

export default function DoCreate() {
  return <Redirecter userOnly={true} redirectTo={'/'} >
    <Create />
  </Redirecter>
}