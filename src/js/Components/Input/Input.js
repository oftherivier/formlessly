import React from 'react'

import Label from './Label'

import { validate } from '../../lib'

const Input = ({
  type,
  name,
  label = name,
  value,
  onInputChange,
  onInputValidationFailure,
  ...xArgs
}) => {
  console.log('xArgs:', xArgs)

  const handleInputChange = v => {
    const validation = validate({
      value: v,
      type: type,
      minLength: xArgs.minLength,
      maxLength: xArgs.maxLength
    })

    if (validation.length === 0) {
      onInputChange(v, name)
    } else {
      onInputValidationFailure(name, validation)
    }
  }

  return (
    <div className='formlessly__input-wrapper'>
      <Label name={name}>{label}</Label>
      <input
        className='formlessly__input'
        type={type}
        name={name}
        value={value}
        onChange={e => handleInputChange(e.target.value)}
      />
    </div>
  )
}
export default Input
