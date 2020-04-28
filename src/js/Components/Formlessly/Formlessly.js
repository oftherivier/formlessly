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

    this.state = {
      activeEl: ''
    }

    this.onElementFocus = this.onElementFocus.bind(this)
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

  // shouldComponentUpdate (nextProps, nextState) {
  //   if (nextState.activeEl !== this.state.activeEl) {
  //     return false
  //   }
  //   return true
  // }

  onElementFocus (field) {
    const prevActiveEl = this.state.activeEl
    this.setState({ activeEl: field }, () => {
      if (!isEmpty(prevActiveEl)) {
        this.handleFieldValidation(prevActiveEl)
      }
    })
  }

  handleSubmit (e) {
    const { fields, fieldValues } = this.props

    e.preventDefault()
    const validation = this.validateEverything(fields, fieldValues)
    console.log('Form validation:', validation)

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
        this.props.onInputValidationChange(newErrors)
      }
    } else {
      console.warn('"errors" Object is undefined')
    }
  }

  handleFieldValidation (field) {
    const validation = validate({
      value: this.props.fieldValues[field],
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
    const { children, errors } = this.props
    return (
      <form
        onSubmit={e => this.handleSubmit(e)}
        onFocus={e => this.onElementFocus(e.target.name)}
        noValidate
      >
        {children({ fields: this.renderUI() })}
      </form>
    )
  }
}

export default Formlessly
