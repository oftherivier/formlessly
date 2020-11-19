import React from 'react'

const Radio = ({ name, onInputChange, value, options }) => {
  return (
    <div className='formlessly__input--radio-wrapper'>
      {options.map(opts => (
        <div className='formlessly__input--radio-option'>
          <input
            className='formlessly__input--radio-btn'
            type='radio'
            name={name}
            onChange={onInputChange(opts.value, name)}
            value={opts.value}
            checked={opts.value === value}
          />
          <label className='formlessly__input--radio__label'>
            {opts.label}
          </label>
        </div>
      ))}
    </div>
  )
}

export default Radio
