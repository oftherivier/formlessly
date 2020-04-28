import React from 'react'

const Radio = ({ name, onInputChange, value, inputKey, options }) => {
  return (
    <div className='formlessly__input--radio-wrapper'>
      {options.map((opts, i) => (
        <div
          className='formlessly__input--radio-option'
          key={`${inputKey}-${i}`}
        >
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
