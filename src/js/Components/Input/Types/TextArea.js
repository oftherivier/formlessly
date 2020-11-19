import React from 'react'

const TextArea = ({ name, onInputChange, value, ...args }) => (
  <textarea
    className='formlessly__input--textarea'
    name={name}
    onChange={e => onInputChange(e.target.value, name)}
    value={value}
    {...args}
  />
)

export default TextArea
