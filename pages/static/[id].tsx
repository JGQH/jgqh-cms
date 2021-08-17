import { useState } from 'react'
import JButton from '@Components/JButton'
import useAsync from '@Hooks/useAsync'
import useJson from '@Hooks/useJson'
import useClipboard from '@Hooks/useClipboard'
import Editor from '@Routing/Editor'
import { setValues } from '@Store'
import styles from '@Styles/Editor.module.scss'
import staticStyles from './styles.module.scss'
import type { staticQuery } from '@Types'

function Static({ id, URL, Parameters } : staticQuery) {
  const { copyToClipboard } = useClipboard()
  const [ url, setUrl ] = useState<string>(URL)
  const { map, modifyKey, modifyValue, deleteRow, appendRow, getJson } = useJson(Parameters)
  const { execute, value } = useAsync(() => setValues<staticQuery>(id, 'Static', { URL: url, Parameters: getJson() }))

  return (
    <div className={styles.editorVisualizer}>
      <div className={styles.editorField}>
        <div className={styles.fieldTitle}>
          <h1>ID:</h1>
        </div>
        <div className={styles.fieldContent}>
          <div>
            <p>{id}</p>
          </div>
          {<div>
            <JButton onClick={() => copyToClipboard(id)}>Copy to Clipboard</JButton>
          </div>}
        </div>
      </div>
      <div className={styles.editorField}>
        <div className={styles.fieldTitle}>
          <h1>URL:</h1>
        </div>
        <div className={styles.fieldContent}>
          <input className={styles.editorMainInput} type='text' defaultValue={URL} onChange={e => setUrl(e.target.value)} />
        </div>
      </div>
      <div className={styles.editorField}>
        <div className={styles.fieldTitle}>
          <h2>Parameters:</h2>
        </div>
        <div className={styles.fieldContent}>
          {map((key:string, value:string, i:number) => (
            <div key={i} className={staticStyles.fieldParam} >
              <div className={staticStyles.paramKey}>
                <input className={styles.editorInput} type='text' onChange={e => modifyKey(i, e.target.value)} defaultValue={key} />
              </div>
              <div className={staticStyles.paramValue}>
                <input className={styles.editorInput} type='text' onChange={e => modifyValue(i, e.target.value)} defaultValue={value} />
              </div>
              <JButton onClick={() => deleteRow(i)} className={staticStyles.paramDel}>Delete Row</JButton>
            </div>
          ))}
          <div>
            <JButton onClick={appendRow}>Append Row</JButton>
          </div>
        </div>
      </div>
      <div className={styles.editorActions}>
        <JButton onClick={execute} disabled={value.status === 'pending'}>Update</JButton>
        {value.status === 'pending' && <p>Updating values...</p>}
        {value.status === 'success' && <p>Values successfully updated.</p>}
        {value.status === 'error' && <p>There&apos;s been an error ({value.error})</p>}
      </div>
    </div>
  )
}

export default function DoStatic() {
  return <Editor<staticQuery> Content={Static} endpoint='Static' />
}