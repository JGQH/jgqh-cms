import { ChangeEvent, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import JButton from '@Components/JButton'
import useAsync from '@Hooks/useAsync'
import useClipboard from '@Hooks/useClipboard'
import Editor from '@Routing/Editor'
import { getImage } from 'lib/supabase/StorageHandler'
import styles from '@Styles/Editor.module.scss'
import imagesStyles from './styles.module.scss'
import type { imageQuery } from '@Types'

function Images({ id }:imageQuery) {
  const { copyToClipboard } = useClipboard()
  const input = useRef<HTMLInputElement>(null)
  const { execute, value } = useAsync(() => getImage(id))
  const [ url, setUrl ] = useState<string | null>()

  useEffect(() => {
    execute()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if(value.status === 'success') {
      setUrl(value.response)
      console.log(value.response)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value.status])

  function loadImage(e:ChangeEvent<HTMLInputElement>){
    if(e.target.files) {
      console.log(e.target.files[0])
    }
    
  }

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
          <div>
            <JButton onClick={() => copyToClipboard(id)}>Copy to Clipboard</JButton>
          </div>
        </div>
      </div>
      <div className={styles.editorField}>
        <div className={styles.fieldTitle}>
          <h1>Image:</h1>
        </div>
        <div className={styles.fieldContent}>
          {value.status === 'success' &&
          <div className={imagesStyles.imageVisualizer}>
            <Image src={url || value.response} layout='fill' alt={id} />
          </div>}
          <div className={imagesStyles.imageUploader}>
            <JButton onClick={() => input.current?.click()}>Upload Image</JButton>
            <input ref={input} type='file' onChange={loadImage}  />
          </div>
        </div>
      </div>
      <div className={styles.editorActions}>
        <JButton>Update</JButton>
      </div>
    </div>
  )
}

export default function DoImages() {
  return <Editor<imageQuery> Content={Images} endpoint='Images' />
}