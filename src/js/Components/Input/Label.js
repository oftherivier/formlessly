import React from 'react'

const Label = ({ name, children }) => (
  <label className='declaform__label' htmlFor={name}>
    {children}
  </label>
)

export default Label
