import React from 'react'

import Label from './Label'

import InputMapper from './InputMapper'

const Input = ({
  type,
  name,
  label = name,
  value,
  required = false,
  inputKey,
  ...args
}) => {
  return (
    <div className='formlessly__input-wrapper' key={inputKey}>
      <Label name={name} required={required}>
        {label}
      </Label>
      <InputMapper
        type={type}
        name={name}
        value={value}
        required={required}
        {...args}
      />
    </div>
  )
}
export default Input
