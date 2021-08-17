import { useState } from 'react'
import JButton from '@Components/JButton'
import useAsync from '@Hooks/useAsync'
import useClipboard from '@Hooks/useClipboard'
import Editor from '@Routing/Editor'
import { setValues } from '@Store'
import styles from '@Styles/Editor.module.scss'
import type { dynamicQuery } from '@Types'

function Dynamic({ id, URL }:dynamicQuery) {
  const { copyToClipboard } = useClipboard()
  const [ url, setUrl ] = useState<string>(URL)
  const { execute, value } = useAsync(() => setValues<dynamicQuery>(id, 'Dynamic', { URL: url }))

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
      <div className={styles.editorActions}>
        <JButton onClick={execute} disabled={value.status === 'pending'}>Update</JButton>
        {value.status === 'pending' && <p>Updating values...</p>}
        {value.status === 'success' && <p>Values successfully updated.</p>}
        {value.status === 'error' && <p>There&apos;s been an error ({value.error})</p>}
      </div>
    </div>
  )
}

export default function DoDynamic() {
  return <Editor<dynamicQuery> Content={Dynamic} endpoint='Dynamic'  />
}