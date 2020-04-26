import React, { Component } from 'react'

import { Input } from '../'
import { isEmpty, objHasValue } from '~/lib'

// name='sandbox'
// fields={formFields}
// fieldValues={this.state.formValues}
// onSubmitSuccess={data => this.onSubmitSuccess(data)}
class Formlessly extends Component {
  constructor (props) {
    super(props)

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
    // const { errors } = this.state
    console.log('submit button clicked')
    // console.log('======= Submit start =======')
    // console.log(errors)
    // console.log(Object.entries(errors).length)
    // console.log('======== Submit end ========')

    // ERROR: validation stops submit
    // Are required fields filled
    // Are filled fields good
    // this.props.onSubmitSuccess(this.props.fieldValues)
  }

  handleInputValidationFailure (field, validation) {
    const { errors } = this.props
    if (errors !== undefined) {
      const newErrors = { ...errors }
      newErrors[field] = validation
      this.props.onInputValidationChange(newErrors)
    } else {
      console.warn('"errors" Object is undefined')
    }
  }

  handleInputValidationSuccess (field) {
    const { errors } = this.props
    if (errors !== undefined) {
      const newErrors = { ...errors }
      if (newErrors[field] !== undefined) {
        delete newErrors[field]
        this.props.onInputValidationChange(newErrors)
      }
    } else {
      console.warn('"errors" Object is undefined')
    }
  }

  renderUI () {
    const { onInputChange, fieldValues, fields, errors } = this.props
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
              invalid={
                errors !== undefined ? objHasValue(errors[fieldName]) : false
              }
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
    return (
      <form onSubmit={e => this.handleSubmit(e)} noValidate>
        {children({ fields: this.renderUI() })}
      </form>
    )
  }
}

export default Formlessly
