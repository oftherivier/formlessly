import React from 'react'

const Label = ({ name, required, children }) => (
  <label className='formlessly__label' htmlFor={name}>
    {children}
    {required && (
      <span className='formlessly__label__asterix--required'>*</span>
    )}
  </label>
)

export default Label
