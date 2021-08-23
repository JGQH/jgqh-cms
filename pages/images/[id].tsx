import { ChangeEvent, useEffect, useRef, useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import JButton from '@Components/JButton'
import useAsync from '@Hooks/useAsync'
import useFile from '@Hooks/useFile'
import useClipboard from '@Hooks/useClipboard'
import Editor from '@Routing/Editor'
import { getImage, updateImage } from 'lib/supabase/StorageHandler'
import styles from '@Styles/Editor.module.scss'
import imagesStyles from './styles.module.scss'
import type { imageQuery } from '@Types'

function Images({ id }:imageQuery) {
  const { copyToClipboard } = useClipboard()

  const input = useRef<HTMLInputElement>(null)
  const { stringValue, fileValue, updateFile } = useFile()

  const [ execute, value ] = useAsync(() => updateImage(id, fileValue))
  const [ loadImage, loadValue ] = useAsync(async () => {
    const img = await getImage(id)
    updateFile(img)
  })

  useEffect(() => {
    loadImage()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function setImage(e:ChangeEvent<HTMLInputElement>){
    if(e.target.files) {
      const file = e.target.files[0]
      updateFile(file)
    }
  }

  return (
    <div className={styles.editorVisualizer}>
      <Head>
        <title>Images Endpoint - {id}</title>
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
          <h1>Image:</h1>
        </div>
        <div className={styles.fieldContent}>
          <div className={imagesStyles.imageVisualizer}>
            {stringValue ?
            <Image src={stringValue} layout='fill' alt={id} />
            :
            <>
              {loadValue.status === 'idle' && <p>Waiting for image fetching to start...</p>}
              {loadValue.status === 'pending' && <p>Loading image...</p>}
              {loadValue.status === 'error' && <p onClick={loadImage}>There&apos;s been an error ({loadValue.error}). Click here to attempt reload.</p>}
            </>}
          </div>
          <div className={imagesStyles.imageUploader}>
            <JButton onClick={() => input.current?.click()}>Upload Image</JButton>
            <input ref={input} type='file' onChange={setImage}  />
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

export default function DoImages() {
  return <Editor<imageQuery> Content={Images} endpoint='Images' />
}