import React, { Component } from 'react'

import { Input } from '../'
import { isEmpty, objHasValue, validate } from '~/lib'

// name='sandbox'
// fields={formFields}
// fieldValues={this.state.formValues}
// onSubmitSuccess={data => this.onSubmitSuccess(data)}
class Formlessly extends Component {
  constructor (props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleFieldValidation = this.handleFieldValidation.bind(this)
    this.handleFieldValidationFailure = this.handleFieldValidationFailure.bind(
      this
    )
    this.handleFieldValidationSuccess = this.handleFieldValidationSuccess.bind(
      this
    )
    this.handleFieldValidation = this.handleFieldValidation.bind(this)
    this.renderUI = this.renderUI.bind(this)
    this.validateEverything = this.validateEverything.bind(this)
  }

  handleSubmit (e) {
    const { fields, fieldValues } = this.props

    e.preventDefault()
    const validation = this.validateEverything(fields, fieldValues)
    console.log('submit button clicked')
    console.log('Form validation:', validation)
    // console.log('======= Submit start =======')
    // console.log(errors)
    // console.log(Object.entries(errors).length)
    // console.log('======== Submit end ========')

    // ERROR: validation stops submit
    // Are required fields filled
    // Are filled fields good
    // this.props.onSubmit(this.props.fieldValues)
  }

  handleFieldValidationFailure (field, validation) {
    const { errors } = this.props
    if (errors !== undefined) {
      const newErrors = { ...errors }
      newErrors[field] = validation
      this.props.onInputValidationChange(newErrors)
    } else {
      console.warn('"errors" Object is undefined')
    }
  }

  handleFieldValidationSuccess (field) {
    const { errors } = this.props

    if (errors !== undefined) {
      const newErrors = { ...errors }
      if (newErrors[field] !== undefined) {
        delete newErrors[field]
        this.props.onFieldValidationChange(newErrors)
      }
    } else {
      console.warn('"errors" Object is undefined')
    }
  }

  handleFieldValidation (field, value) {
    const validation = validate({
      value: value,
      ...this.props.fields[field]
    })

    setTimeout(() => {
      if (validation.length > 0) {
        this.handleFieldValidationFailure(field, validation)
      } else {
        this.handleFieldValidationSuccess(field)
      }
    })
  }

  validateEverything (fields, fieldValues) {
    const errors = {}
    Object.keys(fields).forEach(field => {
      const validation = validate({
        value: fieldValues[field],
        ...fields[field]
      })
      console.log(field, validation)
      if (validation.length > 0) {
        errors[field] = validation
      }
    })

    return errors
  }

  renderUI () {
    const { onInputChange, fieldValues, fields, errors } = this.props
    return Object.entries(fieldValues).reduce((a, [fieldName, d]) => {
      return Object.assign(
        {
          [fieldName]: (
            <Input
              onInputChange={onInputChange}
              onInputBlur={this.handleFieldValidation}
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
