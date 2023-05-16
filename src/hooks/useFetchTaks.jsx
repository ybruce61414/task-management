import { useEffect, useState } from 'react'
import { useTasksContext } from '../contexts/contextStore.jsx'
import { DATA_STATE } from '../reducers/index.jsx'


const useFetchTasks = () => {
  const [isFetching, setIsFetching] = useState(false)
  const { taskData, dispatchTaskData } = useTasksContext()

  const fetchData = async () => {
    try {
      setIsFetching(true)
      const res = await fetch('http://localhost:5173/api/task-list')
      const finalRes = await res.json()


      dispatchTaskData({
        type: DATA_STATE.ready,
        value: finalRes.data || [],
      })
    } catch (err) {
      console.error(err)
      dispatchTaskData({ type: DATA_STATE.failed })
    } finally {
      setIsFetching(false)
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

  return {
    isFetching,
    rawData: taskData,
  }
}

export default useFetchTasks