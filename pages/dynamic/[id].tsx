import JButton from '@Components/JButton'
import useAsync from '@Hooks/useAsync'
import Editor from '@Routing/Editor'
import { setValues } from '@Store'
import type { dynamicQuery } from '@Types'
import { useState } from 'react'
import styles from '@Styles/Editor.module.scss'

function copyToClipboard(text:string) {
  navigator.clipboard.writeText(text)
}

function Dynamic({ id, URL }:dynamicQuery) {
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
          {navigator?.clipboard && //Confirms if the method is supported to show the button
          <div>
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
        <JButton onClick={execute} disabled={value.status === 'pending'} >Update</JButton>
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