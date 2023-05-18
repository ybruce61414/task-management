import { useEffect, useRef, useState } from 'react'
import dayjs from 'dayjs'
import { styled } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'


const CustomDatePicker = styled(DatePicker)`
  margin: 16px 0 8px 0;
  width: 300px
`

const HelperText = styled('p')`
  color: rgb(244, 67, 54);
  font-family: Roboto, Helvetica, Arial, sans-serif;
  font-weight: 400;
  font-size: 0.75rem;
  line-height: 1.66;
  letter-spacing: 0.03333em;
  text-align: left;
  margin: 3px 14px 0;
`

const initError = {
  mode: 'init',
  value: '',
}


const useCalendarInput = props => {
  const {
    mode,
    name,
    isOpen,
    initValue = '',
    fieldProps = {},
  } = props


  const effectCalledCount = useRef(0)
  
  const [value, setValue] = useState(initValue)
  const [error, setError] = useState(initError)

  const onChange = value => {
    setValue(dayjs(value)?.format())
  }
  const onError = inputErr => {
    setError({
      ...error,
      mode,
      value: inputErr === 'minDate'?  'minDate: 1920-1-1': inputErr
    })

  }


  useEffect(() => {
    setValue(initValue)
  }, [initValue])


  useEffect(() => {
    //  reset value when close drawer
    // prevent init render(react 18 render twice)
    effectCalledCount.current += 1
    if (effectCalledCount.current > 2) {
      if (!isOpen) {
        setValue(initValue)
        setError(initError)
      }
    }
  }, [isOpen])


  return {
    Component: (
      <>
        <CustomDatePicker
          label={name}
          margin="normal"
          formatDensity="dense"
          value={dayjs(value)}
          minDate={dayjs('1920-1-1')}
          onChange={onChange}
          onError={onError}
          {...fieldProps}
        />
        {error?.value && <HelperText>{error?.value}</HelperText>}
      </>
    ),
    inputValue: value,
    error,
  }
}


export default useCalendarInput