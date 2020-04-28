import React from 'react'

import Label from './Label'

const Input = ({
  type,
  name,
  label = name,
  value,
  onInputChange,
  invalid,
  required = false
}) => {
  return (
    <div className='formlessly__input-wrapper'>
      <Label name={name} required={required}>
        {label}
      </Label>
      <input
        className='formlessly__input'
        data-type='input'
        type={type}
        name={name}
        value={value}
        onChange={e => onInputChange(e.target.value, name)}
        invalid={invalid.toString()}
        required={required}
      />
    </div>
  )
}
export default Input
