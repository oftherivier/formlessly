import React from 'react'

import Label from './Label'

const Input = ({ type, name, label = name, value, onInputChange }) => (
  <div className='formlessly__input-wrapper'>
    <Label name={name}>{label}</Label>
    <input
      className='formlessly__input'
      type={type}
      name={name}
      value={value}
      onChange={e => onInputChange(e.target.value, name)}
    />
  </div>
)

export default Input
