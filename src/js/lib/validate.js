import { isEmpty, polishArray } from './'
import { types } from './errorTypes'

export const validate = ({
  value,
  type,
  required = false,
  min, // minimum value allowed
  max, // maximum value allowed
  minLength, // Amount of selections/text length allowed
  maxLength,
  regex = undefined,
  multiple = false,
  regexErrorMsg,
  name
}) => {
  const errors = []
  if (required && isEmpty(value)) {
    errors.push(types.isRequired(name))
  } else if (!isEmpty(value)) {
    switch (type) {
      case 'text':
        errors.push(testMinLength(value, minLength, 'minLengthNotAchievedTxt'))
        errors.push(testMaxLength(value, maxLength, 'maxLengthExceededTxt'))
        errors.push(testCustomRegex(value, regex, regexErrorMsg))
        break
      case 'email':
        errors.push(testEmailStructure(value))
        break
      case 'select':
        if (multiple) {
          errors.push(testMinLength(value, minLength, 'minLengthExceededOpts'))
          errors.push(testMaxLength(value, maxLength, 'maxLengthExceededOpts'))
        }
        break
      case 'checkbox':
        errors.push(testMinLength(value, minLength, 'minLengthExceededOpts'))
        errors.push(testMaxLength(value, maxLength, 'maxLengthExceededOpts'))
        break
      case 'date':
        errors.push(testMinDate(value, min))
        errors.push(testMaxDate(value, max))
        break
      case 'number':
        errors.push(testMinNum(value, min))
        errors.push(testMaxNum(value, max))
        break
      default:
        break
    }
  }
  return polishArray(errors)
}

// ABBREVIATIONS

const testMinLength = (v, min, error) => {
  if (min !== undefined && v.length > min) {
    return types[error](min, { length: v.length })
  }
}

const testMaxLength = (v, max, error) => {
  if (max !== undefined && v.length > max) {
    return types[error](max, { length: v.length })
  }
}

const testMinNum = (v, min) => {
  if (min !== undefined && v < min) {
    return types.minNum(min)
  }
}

const testMaxNum = (v, max) => {
  if (max !== undefined && v > max) {
    return types.maxNumExceeded(max)
  }
}

const testMinDate = (v, min) => {
  if (min !== undefined && v.getTime() < min.getTime()) {
    return types.minDate(min, { minDate: min })
  }
}

const testMaxDate = (v, max) => {
  if (max !== undefined && v.getTime() > max.getTime()) {
    return types.maxDateExceeded(max, { maxDate: max })
  }
}

const testRegex = (str, regex) => {
  if (
    typeof regex === 'string' &&
    regex.startsWith('/') &&
    regex.endsWith('/')
  ) {
    return regex.test(str)
  } else {
    const newRegex = new RegExp(regex)
    return newRegex.test(str)
  }
}

const testEmailStructure = value => {
  if (!testRegex(value, emailRegex)) {
    return types.invalidEmail()
  }
}

const testCustomRegex = (str, regex, regexErrorMsg) => {
  if (!isEmpty(regex) && !testRegex(str, regex)) {
    return types.customRegexFailure(regexErrorMsg, {
      regularExpression: regex,
      value: str
    })
  }
}

// REGULAR EXPRESSIONS
const emailRegex = new RegExp(
  "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+(?:[A-Z]{2}|com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum)"
)
