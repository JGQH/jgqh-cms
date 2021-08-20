import { ChangeEvent, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import JButton from '@Components/JButton'
import useAsync from '@Hooks/useAsync'
import useClipboard from '@Hooks/useClipboard'
import Editor from '@Routing/Editor'
import { getImage, updateImage } from 'lib/supabase/StorageHandler'
import styles from '@Styles/Editor.module.scss'
import imagesStyles from './styles.module.scss'
import type { imageQuery } from '@Types'

function Images({ id }:imageQuery) {
  const { copyToClipboard } = useClipboard()
  const input = useRef<HTMLInputElement>(null)
  const [ url, setUrl ] = useState<string | null>(null)
  const [ file, setFile ] = useState<File | null>(null)
  const [ loadImage, imgValue ] = useAsync(() => getImage(id))
  const [ execute, value ] = useAsync(() => updateImage(id, file))

  useEffect(() => {
    loadImage()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if(imgValue.status === 'success') {
      setUrl(imgValue.response)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imgValue.status])

  function setImage(e:ChangeEvent<HTMLInputElement>){
    if(e.target.files) {
      const file = e.target.files[0]
      
      if(['image/gif', 'image/jpeg', 'image/png'].includes(file.type)) {
        const reader = new FileReader()
        reader.onload = () => {
          setUrl(reader.result as string | null)
          setFile(file)
        }
        reader.readAsDataURL(file)
      }
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
          
          <div className={imagesStyles.imageVisualizer}>
            {url ?
            <Image src={url} layout='fill' alt={id} />
            :
            (imgValue.status === 'success') && <Image src={imgValue.response} layout='fill' alt={id} />}
          </div>
          <div className={imagesStyles.imageUploader}>
            <JButton onClick={() => input.current?.click()}>Upload Image</JButton>
            <input ref={input} type='file' onChange={setImage}  />
          </div>
        </div>
      </div>
      <div className={styles.editorActions}>
        <JButton onClick={execute} disabled={!(file && value.status !== 'pending')}>Update</JButton>
        {value.status === 'pending' && <p>Updating values...</p>}
        {value.status === 'success' && <p>Values successfully updated.</p>}
        {value.status === 'error' && <p>There&apos;s been an error ({value.error})</p>}
      </div>
    </div>
  )
}

export default function DoImages() {
  return <Editor<imageQuery> Content={Images} endpoint='Images' />
}