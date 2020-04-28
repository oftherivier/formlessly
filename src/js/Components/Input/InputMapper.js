import React from 'react'

import { TextInput, TextArea, Select, Radio } from './Types'

const InputMapper = ({ type, ...args }) => {
  switch (type) {
    case 'textarea':
      return <TextArea {...args} />
    case 'select':
      return <Select {...args} />
    case 'radio':
      return <Radio {...args} />
    default:
      return <TextInput type={type} {...args} />
  }
}

export default InputMapper
