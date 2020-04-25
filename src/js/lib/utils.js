export const polishArray = array => {
  return array.filter(item => !isEmpty(item))
}

export const isEmpty = value =>
  value === '' ||
  value == null ||
  ((Array.isArray(value) && value.length === 0) || value === undefined)
