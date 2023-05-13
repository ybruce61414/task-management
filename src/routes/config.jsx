import { ROUTES_CONFIG } from './const.js'
import TaskList from '../modules/TaskList'
import App from '../App.jsx'
import LoadingFallback from '../components/LoadingFallback.jsx'

// todo: need middleware
export const genRouteConfigs = () => {
  return [
    {
      path: ROUTES_CONFIG.ROOT.route,
      element: <App />,
    },
    {
      path: ROUTES_CONFIG.TASK_LIST.route,
      element: <TaskList />,
    },{
      path: '*',
      // element: <div>non-where</div>,
      element: <LoadingFallback />
    },
  ]
}