import React, { ChangeEvent } from 'react';
import { IOptionSelect } from '../../../models/models';
import classes from './Select.module.css';

type SelectProps = {
  label: string,
  value: string,
  options: IOptionSelect[],
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void
}

function Select({ label, value, options, onChange }: SelectProps) {
  const htmlFor = `${label}-${Math.random()}`;
  return (
    <div className={classes.Select} >
      <label htmlFor={htmlFor}>{label}</label>
      <select
        id={htmlFor}
        value={value}
        onChange={onChange}
      >
        { options.map((option, index) => {
          return (
            <option
              value={option.value}
              key={option.value + index}
            >
              {option.text}
            </option>
          )
        }) }
      </select>
    </div>
  )
}

export default Select;
