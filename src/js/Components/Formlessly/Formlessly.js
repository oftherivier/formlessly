import React, { Component, Fragment } from 'react'

import { Input, ErrorMessage } from '../'
import { isEmpty, objHasValue, validate, objLength } from '~/lib'

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
    this.onCustomBtnClick = this.onCustomBtnClick.bind(this)
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
    this.validateEverything = this.validateEverything.bind(this)
  }

  onElementFocus (field) {
    const prevActiveEl = this.state.activeEl
    this.setState({ activeEl: field }, () => {
      if (!isEmpty(prevActiveEl)) {
        this.handleFieldValidation(prevActiveEl)
      }
    })
  }

  onCustomBtnClick (e, fn) {
    e.preventDefault()
    fn(e)
  }

  handleSubmit (e) {
    const { fields, fieldValues } = this.props
    e.preventDefault()
    const validation = this.validateEverything(fields, fieldValues)
    console.log('onSubmit Validation:', validation)
    if (objLength(validation) === 0) {
      this.props.onSubmit(fieldValues)
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

  renderTemplate () {
    const { onInputChange, fieldValues, fields, errors } = this.props
    return Object.entries(fieldValues).reduce((a, [fieldName, d]) => {
      return Object.assign(
        {
          [fieldName]: (
            <Input
              onInputChange={onInputChange}
              name={fieldName}
              value={d}
              inputKey={`${name}-${fieldName}`}
              invalid={(errors !== undefined
                ? objHasValue(errors[fieldName])
                : false
              ).toString()}
              {...fields[fieldName]}
            />
          )
        },
        a
      )
      // }
    }, {})
  }

  renderAutoTemplate () {
    const {
      fields,
      fieldValues,
      name,
      errors,
      onInputChange,
      submitText = 'Submit',
      cancelText = 'Cancel',
      onCancel
    } = this.props

    const inputUI = Object.entries(fields).map(([fieldName, { ...args }]) => (
      <Fragment>
        <Input
          onInputChange={onInputChange}
          name={fieldName}
          value={fieldValues[fieldName]}
          inputKey={`${name}-${fieldName}`}
          key={`${name}-${fieldName}`}
          invalid={(errors !== undefined
            ? objHasValue(errors[fieldName])
            : false
          ).toString()}
          {...args}
        />
        {errors[fieldName] !== undefined && (
          <ErrorMessage name={fieldName} errors={errors[fieldName]} />
        )}
      </Fragment>
    ))
    inputUI.push(
      <input
        className='formlessly__btn formlessly__btn--submit'
        type='submit'
        key={`${name}-submit-btn`}
        value={submitText}
      />
    )

    if (onCancel !== undefined) {
      inputUI.push(
        <button
          className='formlessly__btn formlessly__btn--cancel'
          onClick={e => this.onCustomBtnClick(e, onCancel)}
          key={`${name}-cancel-btn`}
        >
          {cancelText}
        </button>
      )
    }

    return inputUI
  }

  render () {
    const { children } = this.props
    return (
      <form
        onSubmit={e => this.handleSubmit(e)}
        onFocus={e => this.onElementFocus(e.target.name)}
        noValidate
      >
        {children !== undefined
          ? children({ fields: this.renderTemplate() })
          : this.renderAutoTemplate()}
      </form>
    )
  }
}

export default Formlessly
