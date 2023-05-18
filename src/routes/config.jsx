import { ROUTES_CONFIG } from './const.js'
import TaskList from '../modules/TaskList'
import App from '../App.jsx'
import Index from '../components/LoadingOverlay/index.jsx'
import ViewDetail from '../modules/TaskList/ViewDetail/index.jsx'

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
    },
    {
      path: `${ROUTES_CONFIG.TASK_LIST.route}/:taskId`,
      element: <ViewDetail />,
    },
    {
      path: '*',
      element: <Index />
    },
  ]
}