import { useEffect } from 'react'
import { useTasksContext } from '../../contexts/contextStore.jsx'
import { DATA_STATE } from '../../reducers/index.jsx'
import { processApiData } from '../../modules/TaskList/utils.js'
import { enqueueSnackbar } from 'notistack'


const useFetchTasks = () => {
  const { taskData, dispatchTaskData } = useTasksContext()

  const fetchData = async () => {
    try {
      if (taskData.state !== DATA_STATE.init) {
        dispatchTaskData({ type: DATA_STATE.fetching })
      }

      const res = await fetch('http://localhost:5173/api/task-list')
      let successRes

      switch (res.status) {
        case 404:
        case 400:
        case 500: {
          dispatchTaskData({
            type: DATA_STATE.failed,
            value: res.statusText,
          })
          enqueueSnackbar(res.statusText, { variant: 'error' })
          break
        } case 200:
          default: {
            successRes = await res.json()
            dispatchTaskData({
              type: DATA_STATE.ready,
              value: processApiData(successRes.data),
            })
            break
          }
      }
    } catch (err) {
      console.error(err)
      dispatchTaskData({ type: DATA_STATE.failed })
    }
  }

  useEffect(() => {
    if ([
      DATA_STATE.init,
      DATA_STATE.reload,
    ].includes(taskData.state)) {
      fetchData()
    }
  }, [taskData.state])

  return { rawData: taskData }
}

export default useFetchTasks