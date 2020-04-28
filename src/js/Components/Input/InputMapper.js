import React from 'react'

import { TextInput, TextArea } from './Types'

const InputMapper = ({ type, ...args }) => {
  switch (type) {
    case 'textarea':
      return <TextArea {...args} />
    default:
      return <TextInput type={type} {...args} />
  }
}

export default InputMapper
