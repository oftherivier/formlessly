import { isEmpty, polishArray } from './'

export const validate = ({
  value,
  type,
  required = false,
  minLength,
  maxLength,
  regex = undefined
}) => {
  const errors = []
  if (required && isEmpty(value)) {
    errors.push({
      type: 'is-required'
    })
  } else {
    switch (type) {
      case 'text':
        errors.push(testMinLength(value, minLength))
        errors.push(testMaxLength(value, maxLength))
        errors.push(testCustomRegex(value, regex))
        break
      case 'email':
        errors.push(testEmailStructure(value))
        break
      default:
        break
    }
  }
  return polishArray(errors)
}

// ABBREVIATIONS
const testMinLength = (v, min) => {
  if (min !== undefined && v.length >= min) {
    return {
      type: 'min-length-not-achieved',
      details: {
        length: v.length
      }
    }
  }
}

const testMaxLength = (v, max) => {
  if (max !== undefined && v.length > max) {
    return {
      type: 'max-length-exceeded',
      details: {
        length: v.length
      }
    }
  }
}

const testRegex = (str, regex) => {
  if (regex.startsWith('/') && regex.endsWith('/')) {
    return regex.test(str)
  } else {
    const newRegex = new RegExp(str)
    return newRegex.test(str)
  }
}

const testEmailStructure = value => {
  if (!testRegex(value, emailRegex)) {
    return {
      type: 'invalid-email-structure'
    }
  }
}

const testCustomRegex = (str, regex) => {
  if (!isEmpty(regex) && !testRegex(str, regex)) {
    return {
      type: 'custom-regex-test-failure',
      details: {
        regularExpression: regex
      }
    }
  }
}

// REGULAR EXPRESSIONS
const emailRegex = new RegExp('/^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/')
