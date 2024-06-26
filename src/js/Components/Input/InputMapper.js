import React from 'react'

import { TextInput, TextArea, Select, Radio, Checkbox, Range } from './Types'

const InputMapper = ({ type, ...props }) => {
  switch (type) {
    case 'textarea':
      return <TextArea {...props} />
    case 'select':
      return <Select {...props} />
    case 'radio':
      return <Radio {...props} />
    case 'checkbox':
      return <Checkbox {...props} />
    case 'range':
      return <Range {...props} />
    default:
      return <TextInput type={type} {...props} />
  }
}

export default InputMapper
