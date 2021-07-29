import JButton from '@Components/JButton'
import useAsync from '@Hooks/useAsync'
import useJson from '@Hooks/useJson'
import Editor from '@Routing/Editor'
import { setValues } from '@Store'
import type { staticQuery } from '@Types'
import { useState } from 'react'

function copyToClipboard(text:string) {
  navigator.clipboard.writeText(text)
}

function Static({ id, URL, Parameters } : staticQuery) {
  const [ url, setUrl ] = useState<string>(URL)
  const { map, modifyKey, modifyValue, deleteRow, appendRow, getJson } = useJson(Parameters)
  const { execute, value } = useAsync(() => setValues<staticQuery>(id, 'Static', { URL: url, Parameters: getJson() }))

  return (
    <div>
      <div>
        <div>
          <h2>ID:</h2>
        </div>
        <div>
          <p>{id}</p>
        </div>
        {navigator?.clipboard && //Confirms if the method is supported to show the button
        <div>
          <JButton onClick={() => copyToClipboard(id)}>Copy to Clipboard</JButton>
        </div>}
      </div>
      <div>
        <div>
          <h2>URL:</h2>
        </div>
        <div>
          <input type='text' defaultValue={URL} onChange={e => setUrl(e.target.value)} />
        </div>
      </div>
      <div>
        <div>
          <h2>Parameters:</h2>
        </div>
        <div>
          {map((key:string, value:string, i:number) => (
            <div key={i}>
              <div>
                <input type='text' onChange={e => modifyKey(i, e.target.value)} defaultValue={key} />
              </div>
              <div>
                <input type='text' onChange={e => modifyValue(i, e.target.value)} defaultValue={value} />
              </div>
              <div>
                <JButton onClick={() => deleteRow(i)}>Delete Row</JButton>
              </div>
            </div>
          ))}
        </div>
        <div>
          <JButton onClick={appendRow}>Append Row</JButton>
        </div>
      </div>
      <div>
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