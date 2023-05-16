import { useEffect, useRef, useState } from 'react'
import { styled, TextField } from '@mui/material'
import { transFormFieldError } from '../../../modules/TaskList/utils.js'

const CustomTextField = styled(TextField)`
  width: 300px
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
    initValue = '',
    fieldProps = {},
  } = props

  const { required } = fieldProps
  const effectCalledCount = useRef(0)

  const [value, setValue] = useState(initValue)
  const [error, setError] = useState(initError)

  const onChange= event => {
    const input = event.target.value


    // todo: extract validator
    if (required) {
      if (input === '') {
        if (error.isDirty) {
          setError({...error, value: 'required'})
        } else {
          setError({
            ...error, isDirty: true, value: 'required'})
        }
      } else {
        setError({
          ...error,
          isDirty: true,
          value: error.value? '': error.value,
        })
      }
    }
    setValue(input)
  }

  const onBlur = () => {
    // implement validation
    console.log('---onBlur', value)
  }


  useEffect(() => {
    // set drilling detail
    setValue(initValue)
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

    //  reset value when close drawer
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