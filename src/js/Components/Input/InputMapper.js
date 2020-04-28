import React from 'react'

import { TextInput, TextArea, Select } from './Types'

const InputMapper = ({ type, ...args }) => {
  switch (type) {
    case 'textarea':
      return <TextArea {...args} />
    case 'select':
      return <Select {...args} />
    default:
      return <TextInput type={type} {...args} />
  }
}

export default InputMapper
