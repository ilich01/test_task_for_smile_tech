import React from 'react'
import s from './Button.module.scss'
interface ButtonProps {
    onClick: () => void,
    children?: React.ReactNode,
    type?: 'submit' | 'reset' | 'button'
    className?: string
}
const Button: React.FC<ButtonProps> = ({onClick, children, type = 'button', className}) => {
  return (
    <div>
      <button type={type} onClick={onClick} className={`${s.button} ${className}`}>{children}</button>
    </div>
  )
}

export default Button
