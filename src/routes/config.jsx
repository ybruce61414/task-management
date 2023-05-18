import { ROUTES_CONFIG } from './const.js'
import TaskList from '../modules/TaskList'
import App from '../modules/LandingView'
import LoadingOverlay from '../components/LoadingOverlay'
// import ViewDetail from '../modules/TaskList/ViewDetail/index.jsx'
import Middlewares, { MiddlewareHOC } from './Middlewares/index.jsx'


const RedirectProtector = MiddlewareHOC(Middlewares.RedirectMiddleware)

export const genRouteConfigs = () => {
  return [
    {
      path: ROUTES_CONFIG.ROOT.route,
      element: RedirectProtector(App)
    },
    {
      path: ROUTES_CONFIG.TASK_LIST.route,
      element: RedirectProtector(TaskList)
    },
    // {
    //   path: `${ROUTES_CONFIG.TASK_LIST.route}/:taskId`,
    //   element: RedirectProtector(ViewDetail),
    // },
    {
      path: '*',
      element: RedirectProtector(LoadingOverlay)
    },
  ]
}