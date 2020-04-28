import React from 'react'

const TextInput = ({ name, onInputChange, inputKey, ...args }) => (
  <input
    className='formlessly__input--text'
    name={name}
    onChange={e => onInputChange(e.target.value, name)}
    key={inputKey}
    {...args}
  />
)

export default TextInput