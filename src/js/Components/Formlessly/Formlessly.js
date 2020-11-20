import React, { Component, Fragment } from 'react'

import { Input, ErrorMessage } from '../'
import BtnContainer from './BtnContainer'
import { isEmpty, objHasValue, validate, objLength } from '~/lib'

class Formlessly extends Component {
  constructor (props) {
    super(props)

    this.state = {
      activeEl: ''
    }

    this.getInputProps = this.getInputProps.bind(this)
    this.onElementFocus = this.onElementFocus.bind(this)
    this.onElementBlur = this.onElementBlur.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleFieldValidation = this.handleFieldValidation.bind(this)
    this.handleFieldValidationFailure = this.handleFieldValidationFailure.bind(
      this
    )
    this.handleFieldValidationSuccess = this.handleFieldValidationSuccess.bind(
      this
    )
    this.handleFieldValidation = this.handleFieldValidation.bind(this)
    this.renderTemplate = this.renderTemplate.bind(this)
    this.renderAutoTemplate = this.renderAutoTemplate.bind(this)
    this.validateAllFields = this.validateAllFields.bind(this)
  }

  onElementBlur (e) {
    const field = e.target.name
    const focussedEl = e.relatedTarget
    if (!focussedEl) {
      this.handleFieldValidation(field)
    }
  }

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
    const validation = this.validateAllFields(fields, fieldValues)
    if (objLength(validation) === 0) {
      this.props.onSubmit(fieldValues)
    } else {
      this.props.onInputValidationChange(validation)
    }
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
      name: field,
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

  validateAllFields (fields, fieldValues) {
    const errors = {}
    Object.keys(fields).forEach(field => {
      const validation = validate({
        name: field,
        value: fieldValues[field],
        ...fields[field]
      })
      if (validation.length > 0) {
        errors[field] = validation
      }
    })

    return errors
  }

  getInputProps (fieldName) {
    const {
      onInputChange,
      errors = undefined,
      fieldValues,
      fields
    } = this.props
    const prettyFields = { ...fields[fieldName] }
    delete prettyFields['customComponent']
    delete prettyFields['regexErrorMsg']
    return {
      onInputChange: onInputChange,
      name: fieldName,
      value: fieldValues[fieldName],
      inputKey: `${name}-${fieldName}`,
      invalid: objHasValue(errors[fieldName]).toString(),
      ...prettyFields
    }
  }

  renderTemplate () {
    const { fieldValues } = this.props
    return Object.entries(fieldValues).reduce((a, [fieldName]) => {
      return Object.assign(
        {
          [fieldName]: <Input {...this.getInputProps(fieldName)} />
        },
        a
      )
    }, {})
  }

  renderAutoTemplate () {
    const {
      fields,
      name,
      errors,
      submitText,
      cancelText,
      onCancel
    } = this.props

    const inputUI = Object.entries(fields).map(([fieldName]) => {
      const inputProps = this.getInputProps(fieldName)

      return fields[fieldName].customComponent !== undefined ? (
        fields[fieldName].customComponent(inputProps)
      ) : (
        <Fragment key={`${name}-${fieldName}-frag`}>
          <Input {...inputProps} />
          {inputProps.invalid === 'true' && (
            <ErrorMessage name={fieldName} errors={errors[fieldName]} />
          )}
        </Fragment>
      )
    })

    inputUI.push(
      <BtnContainer
        key={`${name}-btn-container`}
        submitText={submitText}
        cancelText={cancelText}
        onCancel={onCancel}
      />
    )
    return inputUI
  }

  render () {
    const { children, noValidate = true } = this.props
    return (
      <form
        className='formlessly__form'
        onSubmit={e => this.handleSubmit(e)}
        onFocus={e => this.onElementFocus(e.target.name)}
        onBlur={e => this.onElementBlur(e)}
        noValidate={noValidate}
      >
        {children !== undefined
          ? children({ fields: this.renderTemplate() })
          : this.renderAutoTemplate()}
      </form>
    )
  }
}

export default Formlessly
