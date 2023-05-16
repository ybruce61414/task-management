export const transFormFieldError = error => {
  if (error.isDirty && error.value) {
    return true
  }
  return false
}


