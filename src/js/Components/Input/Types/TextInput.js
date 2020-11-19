import React from 'react'

const TextInput = ({ name, onInputChange, ...args }) => (
  <input
    className='formlessly__input--text'
    name={name}
    onChange={e => onInputChange(e.target.value, name)}
    {...args}
  />
)

export default TextInput
