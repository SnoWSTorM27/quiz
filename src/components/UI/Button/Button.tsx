import React, { MouseEvent } from 'react';
import classes from './Button.module.css';

type ButtonProps = {
  children: React.ReactNode,
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void,
  disabled?: boolean,
  type: string
}

function Button({children, onClick, disabled, type}: ButtonProps) {
  const cls = [
    classes.Button,
    classes[type]
  ]

  return (
    <button
      onClick={onClick}
      className={cls.join(' ')}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export default Button;