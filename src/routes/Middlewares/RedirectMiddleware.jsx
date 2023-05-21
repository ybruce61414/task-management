import PropTypes from 'prop-types'
import { Navigate, useLocation } from 'react-router-dom'
import { genQueryMap } from '../../utils/index.js'
import { ROUTES_CONFIG } from '../const.js'
import makeMockServer from '../../mockApiServer.js'

const RedirectMiddleware = props => {
  const { children } = props
  const { pathname } = useLocation()

  // match all query string pairs
  const matchQueries = window.location.search.match(/([^?=&]+)(=([^&]*))?/g)
  const queryMap = genQueryMap(matchQueries)

  if (![
    ROUTES_CONFIG.ROOT.route,
    ROUTES_CONFIG.TASK_LIST.route,
  ].includes(pathname)) {
    return <Navigate to={ROUTES_CONFIG.ROOT.route} replace />
  }

  // when inner routing, trigger mock server
  if (queryMap.mock === 'true') makeMockServer(queryMap)

  return <>{children}</>
}


RedirectMiddleware.propTypes = {
  children: PropTypes.element.isRequired,
}
export default RedirectMiddleware