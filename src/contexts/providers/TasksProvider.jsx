import { useReducer } from 'react'
import PropTypes from 'prop-types'
import {apiDataReducer, DATA_STATE } from '../../reducers/index.jsx'
import { TasksContext } from '../contextStore'

const initialTasks = {
  state: DATA_STATE.init,
  value: [],
}

const taskReducer = apiDataReducer([])
const TasksProvider = props => {
  const { children } = props

  const [taskData, dispatchTaskData] = useReducer(
    taskReducer,
    initialTasks,
  )

  return (
    <TasksContext.Provider
      value={{
        taskData,
        dispatchTaskData
      }}
    >
      {children}
    </TasksContext.Provider>
  );
}

TasksProvider.propTypes = {
  children: PropTypes.element.isRequired,
}

export default TasksProvider