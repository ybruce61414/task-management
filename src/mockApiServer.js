import { createServer } from 'miragejs'
import { mockTasks } from './mock/index.js'

export default function () {
  createServer({
    routes() {
      // url
      const taskListUrl = '/api/task-list'

      // methods
      this.get(taskListUrl, () => {
        return mockTasks
      })
    },
  })
}