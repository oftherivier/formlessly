import React from 'react'

import Label from './Label'

import { validate } from '../../lib'

const Input = ({
  type,
  name,
  label = name,
  value,
  onInputChange,
  invalid,
  onInputBlur
}) => {
  return (
    <div className='formlessly__input-wrapper'>
      <Label name={name}>{label}</Label>
      <input
        className='formlessly__input'
        data-type='input'
        type={type}
        name={name}
        value={value}
        onChange={e => onInputChange(e.target.value, name)}
        onBlur={() => onInputBlur(name, value)}
        invalid={invalid.toString()}
      />
    </div>
  )
}
export default Input
