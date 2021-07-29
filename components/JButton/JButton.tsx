import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import styles from './jbutton.module.scss'

type JButtonProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

export default function JButton({ className, ...props }:JButtonProps) {
  const extendedClass = `${className || ''} ${styles.jbutton}`

  return <button className={extendedClass} {...props}>
    {props.children}
  </button>
}