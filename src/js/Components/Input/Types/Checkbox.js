import React from 'react'

const Checkbox = ({ name, onInputChange, value, inputKey, options }) => {
  return (
    <div className='formlessly__input--checkbox-wrapper'>
      {options.map((opts, i) => (
        <div
          className='formlessly__input--checkbox-option'
          key={`${inputKey}-${i}`}
        >
          <input
            className='formlessly__input--checkbox'
            type='checkbox'
            name={name}
            onChange={onInputChange(opts.value, name)}
            value={opts.value}
            checked={opts.value === value}
          />
          <label className='formlessly__input--checkbox__label'>
            {opts.label}
          </label>
        </div>
      ))}
    </div>
  )
}

export default Checkbox
