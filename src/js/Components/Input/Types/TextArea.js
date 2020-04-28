import React from 'react'

const TextArea = ({ name, onInputChange, value, inputKey, ...args }) => (
  <textarea
    className='formlessly__input--textarea'
    name={name}
    onChange={e => onInputChange(e.target.value, name)}
    value={value}
    key={inputKey}
    {...args}
  />
)

export default TextArea
