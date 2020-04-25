import React, { Component } from 'react'

import { Input } from '../'

// name='sandbox'
// fields={formFields}
// fieldValues={this.state.formValues}
// onSubmitSuccess={data => this.onSubmitSuccess(data)}
class Formlessly extends Component {
  constructor (props) {
    super(props)

    this.state = {
      errors: []
    }
  }

  handleSubmit (e) {
    e.preventDefault()
    onSubmitSuccess(fieldValues)
  }

  onInputValidationFailure (n, validation) {
    console.error(n, validation)
  }

  renderUI () {
    const { onInputChange, fieldValues, fields } = this.props
    return Object.entries(fieldValues).reduce((a, [fieldName, d]) => {
      return Object.assign(
        {
          [fieldName]: (
            <Input
              onInputChange={onInputChange}
              onInputValidationFailure={this.onInputValidationFailure}
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

  render () {
    const { children } = this.props
    console.warn('render formlessly')
    return (
      <form onSubmit={e => this.handleSubmit(e)}>
        {children({ fields: this.renderUI() })}
      </form>
    )
  }
}

export default Formlessly
