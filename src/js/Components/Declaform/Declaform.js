import React from 'react'

import { Input } from '../'

// name='sandbox'
// fields={formFields}
// fieldValues={this.state.formValues}
// onSubmitSuccess={data => this.onSubmitSuccess(data)}

const Declaform = ({
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

  const renderUI = data => {
    return Object.entries(data).reduce((a, [fieldName, d]) => {
      return Object.assign(
        {
          [fieldName]: (
            <Input
              onInputChange={onInputChange}
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

  return (
    <form onSubmit={e => handleSubmit(e)}>
      {children({ fields: renderUI(fieldValues) })}
    </form>
  )
}

export default Declaform
