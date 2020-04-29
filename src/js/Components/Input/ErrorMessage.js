import React from 'react'

const ErrorMessage = ({ name, errors }) => {
  console.log(errors)
  return errors.length > 1 ? (
    <ul className='formlessly__error-list'>
      {errors.map((error, i) => (
        <li key={`${name}-${i}`} className='formlessly__error-list__item'>
          <p className='formlessly__error-msg'>{error.defaultText}</p>
        </li>
      ))}
    </ul>
  ) : (
    <p className='formlessly__error-msg'>{errors[0].defaultText}</p>
  )
}

export default ErrorMessage
