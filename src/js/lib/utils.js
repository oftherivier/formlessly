export const polishArray = array => {
  return array.filter(item => !isEmpty(item))
}

export const isEmpty = value =>
  value === '' ||
  value == null ||
  ((Array.isArray(value) && value.length === 0) || value === undefined)

export const objHasValue = obj =>
  obj !== undefined && Object.entries(obj).length > 0

export const objLength = obj => Object.keys(obj).length
