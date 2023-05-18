export const transFormFieldError = error => {
  if (error.isDirty && error.value) {
    return true
  }
  return false
}

export const processApiData = data => {
  if (!data) return []

  data.sort((prev, cur) => {
    // date in ascending order
    return new Date(prev.date) - new Date(cur.date)
  })
  return data.map((data, idx) => {
    return {
      ...data,
      order: idx + 1
    }
  })
}

export function throttle(func, ms) {
  let isThrottled = false
  let savedArgs
  let savedThis

  function wrapper() {
    if (isThrottled) {
      savedArgs = arguments
      savedThis = this
      return
    }
    isThrottled = true

    func.apply(this, arguments)

    setTimeout(function() {
      isThrottled = false
      if (savedArgs) {
        wrapper.apply(savedThis, savedArgs)
        savedArgs = null
        savedThis = null
      }
    }, ms)
  }

  return wrapper
}

