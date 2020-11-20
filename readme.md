# formlessly
_🌈 A declarative and customizable React form library for quick and easy form creation without markup  🌈_
### Table of Contents

## Introduction

Great for when you have an app with alot of forms or if you need to create a quick prototype without wanting to bother with markup.

```js
const formFields = {
  name: {
    type: 'text',
    label: 'Fullname',
    required: true
  },
  email: {
    type: 'email',
    label: 'Email address'
  }
}
 ...
<Formlessly
  fields={formFields}
  fieldValues={values} // from state
  onSubmit={data => console.log('submitted!', data)}
  onInputChange={(value, name) => handleInputChange(value, name)}
  onInputValidationChange={errors => handleErrors(errors)}
  errors={errors} // from state
/>
```

_formlessly_ allows you to create forms using a `fields` obj with or without a UI template. The template allows for more complex layouts and custom input components. However custom components can be used without a template but more on that later.

```js
<Formlessly
...
>
{({ fields }) => (
  <Fragment>
    {fields.name}
    <ErrorMessage name='name' error={errors.name} />

    {fields.email}
    <ErrorMessage name='email' error={errors.email} />

    <label htmlFor='colour'>Favourite colour</label>
    <select
      name='colour'
      onChange={handleInputChange}
    >
      <option value=''>Select</option>
      <option value='blue'>Blue</option>
      <option value='red'>Red</option>
    </select>
    <input type='submit' value='Submit form' />
  </Fragment>
)}
</Formlessly>
```

Html5 input elements are used for the UI and validation. The styling is very limited so that there is less to be overwritten.

If you do not care about styling  and just need a kind of decent looking form library then our `formlessly-pretty` package is for you. It works exactly the same way except it has prettier UI (still under construction though).

## Installation

```
npm i formlessly
# or
yarn add formlessly
```

_formlessly_ can be used in both es-module-aware and commonjs bundlers/environments.

```js
// es module
import { int } from 'fictional'
// commonjs
const { int } = require('fictional')
```

## Usage

_formlessly_ makes use of the `fields` object to render the input fields. Each input object must have a type. The input name is derived from the object key. We recommend using this key as the state name for your input field.

When an input is updated then the `onInputChange` is called. It provides the new value and name/key of the affected input field. The new values are passed down to _formlessly_ through the `fieldValues` prop.

## Templating

It is possible to generate a form without the use of a template. However there might be times when a more complicated layout is required. In those circumstances a form of templating is supported.

```js
<Formlessly
...
>
{({ fields }) => (
  <Fragment>

    {fields.name}

    {fields.email}

    <label htmlFor='colour'>Favourite colour:</label>
    <select
      name='colour'
      onChange={handleInputChange}
    >
      <option value=''>Select</option>
      <option value='blue'>Blue</option>
      <option value='red'>Red</option>
    </select>

    <input type='submit' value='Submit form' />

  </Fragment>
)}
</Formlessly>
```

A template can be placed as a child of _formlessly_ in the form of a function which accepts the `fields` object that maps the input UI to the key/value pair in the template.

The template can also be used to render custom input components. It is important to note that the field data should still be added to the `fields` object for proper validation.

When using a template you would also need to add your own submit input to allow for the most customisable layouts. When not using the template, a submit button will be automatically created. The text for it can be changed using the `submitText` prop. Optionally, an additional cancel button can be added by passing a function to handle form cancellation to the `onCancel` prop. To customise the text for this button use the `cancelText` prop.

```js
<Formlessly
  ...
  onSubmit={data => console.log('submitted!', data)}
  submitText='Log data' // default: Submit
  onCancel={() => console.log('form cancelled')}
  cancelText='Cancel form' // default: Cancel
  />
```
The buttons will appear in their own container at the bottom of the form.

## Form Submission
_formlessly_ handles validation therefore the form will not be submitted if validation fails. Any actions that should happen onSubmit should be passed to the `onSubmit` prop. This will return an object with the form values.

## Error Handling
Every input field gets validated when focus changes to a new field (onBlur). The validation result, an error object, is passed back to _formlessly_'s parent via the `onInputValidationChange` prop. The object received must then be stored in the state and passed back to _formlessly_ using the `errors` prop.

Example:
```js
{
  name: [{
    type: 'max-length-exceeded-txt',
    defaultText: `Must not contain more than 4 characters.`,
    details: {
      length: 7
    }
  }],
  email: [{
    type: 'invalid-email',
    defaultText: 'The email address entered is not valid.',
    details: {}
  }]
}
```
You can use this to display error messages inside the template.

```js
<Formlessly
...
>
fields }) => (
  <Fragment>
    {fields.name}
    <ErrorMessage text={errors.name} />

    {fields.email}
    <ErrorMessage text={errors.email} />

    <input type='submit' value='Submit form' />
  </Fragment>
)}
</Formlessly>
```
When not using the template the error messages are displayed automatically in the form.

Input type elements have a attribute `invalid` that can be used for the purpose of styling.

```
.formlessly__input--text:invalid {
  border-color: red;
}
```

## Custom components

As mentioned earlier one way of using custom components is by simply adding them to the template. You still would need to add the field data to the `fields` object so that _formlessly_ knows how to validate the value entered into the custom component.

Another method to use your own custom components is by adding them to the `customComponent` prop of the `field` object as a function returning UI. Unlike when using the template, _formlessly_ will add its own label UI.

```js
const formFields = {
  name: {
    type: 'text',
    label: 'Fullname',
  },
  email: {
    type: 'email',
    label: 'Email address'
  },
  colour: {
    type: 'select',
    label: 'Choose the colour you like best',
    customComponent: ({ value, options, onInputChange }) => (
      <select
        name='colour'
        value={value}
        onChange={e => onInputChange(e.target.value, 'colour')}
      >
        {options.map((opt, i) => (
          <option key={`colour-${i}`} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    )
  }
}
```

## Styling

With this version of _formlessly_ the styling is as basic as it gets so that you can style the UI the way you want.

## Regular Expressions
Text fields can be given regular expressions to test strings. A custom error message may be added in the field object to make error handling easier for users.

```
name: {
  ...
  regex: '^D',
  regexErrorMsg: 'Name must start with the letter "D"',
  ...
},
```

## Notes

This is a hobby project so not everything will work first time around.

### Unsupported Input Types
I have tried to make provision for html5 form field types however I may have missed something. If you need a particular input type that isn't supported then please use _customComponent_. Also feel free create an issue on Github and I will try to get to it ASAP

### Coming Up
Also if you want a slightly prettier version keep an eye out for _formlessly-pretty_ which will have customised UI

## Thank You!

Thank you for making it this far. If you find any bugs or have any questions please make an issue or something
