import { useState } from 'react'
import Head from 'next/head'
import JButton from '@Components/JButton'
import useAsync from '@Hooks/useAsync'
import useClipboard from '@Hooks/useClipboard'
import Editor from '@Routing/Editor'
import { setValues } from '@Store'
import styles from '@Styles/Editor.module.scss'
import type { Dictionary, jsonQuery } from '@Types'

function Json({ id, Value }:jsonQuery) {
  const { copyToClipboard } = useClipboard()
  const [ json, setJson ] = useState<string>(JSON.stringify(Value))
  const [ execute, value ] = useAsync(() => setValues(id, 'Json', { Value: JSON.parse(json) as Dictionary }))

  return (
    <div className={styles.editorVisualizer}>
      <Head>
        <title>JSON Endpoint - {id}</title>
      </Head>
      <div className={styles.editorField}>
        <div className={styles.fieldTitle}>
          <h1>ID:</h1>
        </div>
        <div className={styles.fieldContent}>
          <div>
            <p>{id}</p>
          </div>
          <div>
            <JButton onClick={() => copyToClipboard(id)}>Copy to Clipboard</JButton>
          </div>
        </div>
      </div>
      <div className={styles.editorField}>
        <div className={styles.fieldTitle}>
          <h1>JSON:</h1>
        </div>
        <div className={styles.fieldContent}>
          <textarea className={styles.editorInput} onChange={e => setJson(e.target.value)} defaultValue={JSON.stringify(Value, null, 2)}></textarea>
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

export default function DoJson() {
  return <Editor<jsonQuery> Content={Json} endpoint='Json' />
}