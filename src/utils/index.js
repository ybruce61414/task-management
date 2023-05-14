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