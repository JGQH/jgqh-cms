import Router from 'next/router'
import { useState } from 'react'
import JButton from '@Components/JButton'
import useAsync from '@Hooks/useAsync'
import Redirecter from '@Routing/Redirecter'
import { createValues } from '@Store'
import styles from '@Styles/Modal.module.scss'
import { endpointsTypes } from '@Types'

const endpointsList = [endpointsTypes.STATIC, endpointsTypes.DYNAMIC, endpointsTypes.JSON]

function Create() {
  const [ index, setIndex ] = useState<number>(0)
  const [ name, setName ] = useState<string>('')
  const [ wait, setWait ] = useState<string>('0')
  const { execute, value } = useAsync<void>(() => createValues(endpointsList[index], name, +wait))

  return (
    <div className={styles.modalPage}>
      <div className={styles.modalContainer}>
        <div className={styles.modalTitle}>
          <h1>Create Endpoint</h1>
        </div>
        <div className={styles.modalContent}>
          <div className={styles.modalInput}>
            <div className={styles.inputTitle}>
              <p>Type</p>
            </div>
            <div className={styles.inputField}>
              <select onChange={e => setIndex(+e.target.value)}>
                {endpointsList.map((val, i) => (
                  <option key={i} value={i}>{val}</option>
                ))}
              </select>
            </div>
          </div>
          <div className={styles.modalInput}>
            <div className={styles.inputTitle}>
              <p>Name</p>
            </div>
            <div className={styles.inputField}>
              <input type='text' onChange={e => setName(e.target.value)}/>
            </div>
          </div>
          <div className={styles.modalInput}>
            <div className={styles.inputTitle}>
              <p>Wait</p>
            </div>
            <div className={styles.inputField}>
              <input type='text' onChange={e => setWait(e.target.value)} defaultValue='0'/>
            </div>
          </div>
        </div>
        <div className={styles.modalActions}>
          <JButton onClick={() => Router.push('/')}>Return</JButton>
          <JButton onClick={execute} disabled={value.status === 'pending'}>Create</JButton>
        </div>
        <div className={styles.modalMessages}>
          {value.status === 'pending' && <p>Creating endpoint...</p>}
          {value.status === 'success' && <p>Endpoint created successfully</p>}
          {value.status === 'error' && <p>There&apos;s been an error ({value.error})</p>}
        </div>
      </div>
    </div>)
}

export default function DoCreate() {
  return <Redirecter userOnly={true} redirectTo={'/'} >
    <Create />
  </Redirecter>
}