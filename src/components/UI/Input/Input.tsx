import React, { ChangeEvent } from 'react';
import classes from './Input.module.css';

type InputProps = {
  name?: string,
  type?: string,
  error?: string,
  label: string,
  valid: boolean,
  touched: boolean,
  shouldValidate: boolean,
  value?: string,
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

function isInvalid(valid, touched, shouldValidate) {
  return !valid && shouldValidate && touched;
}

function Input({ type, error, label, value, onChange, valid, touched, shouldValidate }: InputProps) {
  const inputType = type || "text";
  const cls = [
    classes.Input
  ];
  const htmlFor = `${inputType}-${Math.random()}`

  if (isInvalid(valid, touched, shouldValidate)) {
    cls.push(classes.invalid);
  }

  return (
    <div className={cls.join(' ')}>
      <label htmlFor={htmlFor}>{label}</label>
      <input
        type={inputType}
        id={htmlFor}
        value={value}
        onChange={(e)=>onChange(e)}
      />

      {
        isInvalid(valid, touched, shouldValidate) && <span>{error}</span>
      }

    </div>
  )
}

export default Input;