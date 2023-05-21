export const genQueryMap = arr => {
  /*
    input format: ['position=detail', 'mock=true']
    output format: { position: 'detail',mock: 'true' }
  */
  const map = {}

  if (!Array.isArray(arr)) return map

  arr?.forEach(item => {
    const [queryKey, queryVal] = item.split('=')
    if (queryKey && queryVal) {
      map[queryKey] = queryVal
    }
  })
  return map
}

export const getUrlQueryMap = () => {
  const matchQueries = window.location.search.match(/([^?=&]+)(=([^&]*))?/g)
  return genQueryMap(matchQueries)
}

export const dateFormatter = (year, month, date) => {
  const MONTHS = {
    0: 'January',
    1: 'February',
    2: 'March',
    3: 'April',
    4: 'May',
    5: 'June',
    6: 'July',
    7: 'August',
    8: 'September',
    9: 'October',
    10: 'November',
    11: 'December',
  }

  return `${MONTHS[month]} ${date}, ${year}`
}


export const STATUS_CODES = {
  success: '200',
  createdSuccess: '201',
  badRequest: '400',
  notFound: '404',
  internalServerError: '500',
};

export const httpError = {
  400: {
    'error': {
      'code': 'Bad Request',
      'message': 'Bad Request'
    }
  },
  401: {
    'error': {
      'code': 'Unauthorized',
      'message': 'Unauthorized'
    }
  },
  404: {
    'error': {
      'code': 'Not Found',
      'message': 'Not Found'
    }
  },
  500: {
    'error': {
      'code': 'Internal Server Error',
      'message': 'Internal Server Error'
    }
  },
}