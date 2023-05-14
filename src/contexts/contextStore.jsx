import { createContext, useContext } from 'react'

// tasks
export const TasksContext = createContext()

export const useTasksContext = () => useContext(TasksContext)