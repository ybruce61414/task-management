export const validator = props => {
  const {
    required,
    input,
    error,
    errorSetter
  } = props

  if (required) {
    if (input === '') {
      if (error.isDirty) {
        errorSetter({...error, value: 'required'})
      } else {
        errorSetter({
          ...error, isDirty: true, value: 'required'})
      }
    } else {
      errorSetter({
        ...error,
        isDirty: true,
        value: error.value? '': error.value,
      })
    }
  }
}