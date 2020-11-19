import React from 'react'

const Range = ({ name, onInputChange, ...attr }) => (
  <div className='formlessly__input--range-wrapper'>
    <span className='formlessly__input--range__num'>{attr.min}</span>
    <input
      name={name}
      type='range'
      className='formlessly__input--range'
      onChange={e => onInputChange(e.target.value, name)}
      {...attr}
    />
    <span className='formlessly__input--range__num'>{attr.max}</span>
  </div>
)

export default Range
