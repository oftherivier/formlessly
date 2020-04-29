export const types = {
  isRequired: name => ({
    type: 'is-required',
    defaultText: `${name} is a required field.`,
    details: {}
  }),
  minNum: min => ({
    type: 'min-value-not-achieved-num',
    defaultText: `This value may not be lower than ${min}.`,
    details: {}
  }),
  maxNumExceeded: max => ({
    type: 'max-value-exceeded-num',
    defaultText: `This value may not be larger than ${max}.`,
    details: {}
  }),
  minLengthNotAchievedTxt: (min, details) => ({
    type: 'min-length-not-achieved-txt',
    defaultText: `Must contain at least ${min} characters.`,
    details: {
      ...details
    }
  }),
  maxLengthExceededTxt: (max, details) => ({
    type: 'max-length-exceeded-txt',
    defaultText: `Must not contain more than ${max} characters.`,
    details: {
      ...details
    }
  }),
  minLengthNotAchievedOpts: (min, details) => ({
    type: 'min-length-not-achieved-opts',
    defaultText: `Must select at least ${min} options.`,
    details: { ...details }
  }),
  maxLengthExceededOpts: (max, details) => ({
    type: 'max-length-exceeded-opts',
    defaultText: `Must not select more than ${max} options.`,
    details: { ...details }
  }),
  minDate: (min, details) => ({
    type: 'min-date',
    defaultText: `Must choose a date after ${min}.`,
    details: { ...details }
  }),
  maxDateExceeded: (max, details) => ({
    type: 'max-date-exceeded',
    defaultText: `Must choose a date before ${max}`,
    details: { ...details }
  }),
  invalidEmail: () => ({
    type: 'invalid-email',
    defaultText: 'The email address entered is not valid.',
    details: {}
  }),
  customRegexFailure: (msg, details) => ({
    type: 'custom-regex-failure',
    defaultText: msg !== undefined ? msg : 'Entry is not valid.',
    details: {
      ...details
    }
  })
}
