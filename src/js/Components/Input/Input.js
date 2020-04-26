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
  onInputValidationSuccess,
  invalid,
  ...xArgs
}) => {
  const handleInputValidation = e => {
    const validation = validate({
      value: value,
      type: type,
      minLength: xArgs.minLength,
      maxLength: xArgs.maxLength
    })

    if (validation.length > 0) {
      onInputValidationFailure(name, validation)
    } else {
      onInputValidationSuccess(name)
    }
  }

  console.log(name, invalid)
  return (
    <div className='formlessly__input-wrapper'>
      <Label name={name}>{label}</Label>
      <input
        className='formlessly__input'
        type={type}
        name={name}
        value={value}
        onChange={e => onInputChange(e.target.value, name)}
        onBlur={e => handleInputValidation(e)}
        invalid={invalid.toString()}
      />
    </div>
  )
}
export default Input
