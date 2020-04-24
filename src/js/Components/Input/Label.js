import React from 'react'

const Label = ({ name, children }) => (
  <label className='formlessly__label' htmlFor={name}>
    {children}
  </label>
)

export default Label
