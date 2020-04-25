import React from 'react'

import { Input } from '../'

// name='sandbox'
// fields={formFields}
// fieldValues={this.state.formValues}
// onSubmitSuccess={data => this.onSubmitSuccess(data)}

const Formlessly = ({
  name,
  fields,
  fieldValues,
  onSubmitSuccess,
  onInputChange,
  children
}) => {
  const handleSubmit = e => {
    e.preventDefault()
    onSubmitSuccess(fieldValues)
  }

  const onInputValidationFailure = (n, validation) => {
    console.log('VALIATION FAILURE:')
    console.log(n, validation)
  }

  const renderUI = data => {
    return Object.entries(data).reduce((a, [fieldName, d]) => {
      return Object.assign(
        {
          [fieldName]: (
            <Input
              onInputChange={onInputChange}
              onInputValidationFailure={onInputValidationFailure}
              name={fieldName}
              value={d}
              inputKey={`${name}-${fieldName}`}
              {...fields[fieldName]}
            />
          )
        },
        a
      )
    }, {})
  }

  console.log('render formlessly fields', fields)
  return (
    <form onSubmit={e => handleSubmit(e)}>
      {children({ fields: renderUI(fieldValues) })}
    </form>
  )
}

export default Formlessly
