import { useState } from 'react';

const VALID_FORMATS = ['image/gif', 'image/jpeg', 'image/png']

export default function useFile() {
  const [ stringValue, setString ] = useState<string | null>(null)
  const [ fileValue, setFile ] = useState<File | null>(null)

  function updateFile(file:File) {
    if(VALID_FORMATS.includes(file.type)) {
      const reader = new FileReader()
      reader.onload = () => {
        setFile(file)
        setString(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return { stringValue, fileValue, updateFile }
}