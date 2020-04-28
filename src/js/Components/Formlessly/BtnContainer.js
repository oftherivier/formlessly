import React from 'react'

const BtnContainer = ({
  submitText = 'Submit',
  cancelText = 'Cancel',
  onCancel
}) => {
  const onCustomBtnClick = e => {
    e.preventDefault()
    onCancel()
  }
  return (
    <div className='formlessly__btn-container'>
      <input
        className='formlessly__btn formlessly__btn--submit'
        type='submit'
        value={submitText}
      />
      {onCancel !== undefined && (
        <button
          className='formlessly__btn formlessly__btn--cancel'
          onClick={e => onCustomBtnClick(e, onCancel)}
        >
          {cancelText}
        </button>
      )}
    </div>
  )
}

export default BtnContainer
