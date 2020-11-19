import React from 'react'

const Select = ({ name, onInputChange, value, options, ...args }) => (
  <select
    className='formlessly__input--select'
    name={name}
    onChange={e => onInputChange(e.target.value, name)}
    value={value}
    {...args}
  >
    {options.map(opts => (
      <option value={opts.value}>{opts.label}</option>
    ))}
  </select>
)

export default Select
