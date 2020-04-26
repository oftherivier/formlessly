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
      errors: {}
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleInputValidationFailure = this.handleInputValidationFailure.bind(
      this
    )
    this.handleInputValidationSuccess = this.handleInputValidationSuccess.bind(
      this
    )
    this.renderUI = this.renderUI.bind(this)
  }

  handleSubmit (e) {
    e.preventDefault()
    this.props.onSubmitSuccess(this.props.fieldValues)
  }

  handleInputValidationFailure (field, validation) {
    const { errors } = this.state
    const newErrors = { ...errors }
    newErrors[field] = validation
    this.setState({ errors: newErrors }, () => {
      this.props.onFormValidationChange(newErrors)
    })
  }

  handleInputValidationSuccess (field) {
    const { errors } = this.state
    const newErrors = { ...errors }
    if (newErrors[field] !== undefined) {
      delete newErrors[field]
      this.setState({ errors: newErrors }, () => {
        this.props.onFormValidationChange(newErrors)
      })
    }
  }

  renderUI () {
    const { onInputChange, fieldValues, fields } = this.props
    return Object.entries(fieldValues).reduce((a, [fieldName, d]) => {
      return Object.assign(
        {
          [fieldName]: (
            <Input
              onInputChange={onInputChange}
              onInputValidationFailure={this.handleInputValidationFailure}
              onInputValidationSuccess={this.handleInputValidationSuccess}
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
