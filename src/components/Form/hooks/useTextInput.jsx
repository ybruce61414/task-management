import { useEffect, useRef, useState } from 'react'
import { styled, TextField } from '@mui/material'
import { transFormFieldError } from '../../../modules/TaskList/utils.js'
import { maxLengthFilter, validator } from '../utils.js'

const CustomTextField = styled(TextField)`
  box-sizing: border-box;
  width: 300px;
  margin: 10px 25px;
`

const initError = {
  mode: 'init',
  isDirty: false,
  value: '',
}


const useTextInput = props => {
  const {
    mode,
    name,
    isOpen,
    maxlength = 500,
    initValue = '',
    fieldProps = {},
  } = props

  const { required } = fieldProps
  const effectCalledCount = useRef(0)

  const [value, setValue] = useState(initValue)
  const [error, setError] = useState(initError)


  const onChange= event => {
    let input = maxLengthFilter(event.target.value, maxlength)

    validator({
      required,
      input,
      error,
      errorSetter: setError,
    })
    setValue(input)
  }

  const onBlur = () => {
    // trigger validation when onBlur
    validator({
      required,
      input: value,
      error,
      errorSetter: setError,
    })
  }

  useEffect(() => {
    // set drilling detail
    setValue(maxLengthFilter(initValue, maxlength))
    switch (mode) {
      case 'edit':
        setError({ mode, value: '' })
        break
      case 'create':
        setError({ mode, value: required? 'required': '' })
        break
      default:
        console.error('unknown mode')
    }

    // reset value when close drawer
    // prevent init render(react 18 render twice)
    effectCalledCount.current += 1
    if (effectCalledCount.current > 2) {
      if (!isOpen) {
        setValue(initValue)
        setError(initError)
      }
    }
  }, [initValue, mode, isOpen])


  return {
    Component: (
      <CustomTextField
        error={transFormFieldError(error)}
        label={name}
        required={required}
        value={value}
        margin="normal"
        onChange={onChange}
        onBlur={onBlur}
        {...fieldProps}
      />
    ),
    inputValue: value,
    error,
  }
}

export default useTextInput