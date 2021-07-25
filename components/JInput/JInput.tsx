import { DetailedHTMLProps, InputHTMLAttributes } from 'react'
import styles from './jinput.module.scss'

type JInputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

export default function JInput(props:JInputProps) {
  const extendedClass = `${props.className || ''} ${styles.jinput}`

  return <input className={extendedClass} {...props} />
}