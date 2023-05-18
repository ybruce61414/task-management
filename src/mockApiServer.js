import { createServer, Model } from 'miragejs'
import { faker } from '@faker-js/faker'
// import { mockTasks } from './mock/index.js'



export default function () {
  createServer({
    models: {
      task: Model,
    },
    seeds(server) {

      // mockTasks.data.forEach(task => {
      //   server.create('task', {
      //     ...task,
      //     taskId: faker.number.hex({ min: 10, max: 100 }),
      //     name: faker.commerce.productName(),
      //     description: faker.commerce.productDescription(),
      //     // priority: faker.number.int(),
      //     // format: '2022-07-31T01:33:29.567Z'
      //     date: faker.date.anytime(),
      //     'create-date': null,
      //   })
      // })
      const count = 10000

      for (let i = 0; i < count; i++) {
        server.create('task', {
          taskId: faker.string.uuid(),
          name: faker.commerce.productName(),
          description: faker.commerce.productDescription(),
          // format: '2022-07-31T01:33:29.567Z'
          date: faker.date.anytime(),
          'create-date': null,
        })
      }
    },
    routes() {
      // url
      const taskListUrl = '/api/task-list'

      // http methods:
      // get tasks
      this.get(taskListUrl, (schema) => {
        // return mockTasks
        return { data: schema.tasks.all().models }
      }, { timing: 1500 })

      // delete task
      this.delete(`${taskListUrl}/:taskId`, (schema, request) => {
        const taskId = request.params.taskId

        return schema.tasks.findBy({ taskId }).destroy()
      }, { timing: 1000 })

      // edit task
      this.patch(`${taskListUrl}/:taskId`, (schema, request) => {
        const taskId = request.params.taskId
        const payload = JSON.parse(request.requestBody)

        return schema.tasks.findBy({ taskId }).update({ ...payload })
      }, { timing: 1000 })

      // create task
      this.post(`${taskListUrl}`, (schema, request) => {
        const payload = JSON.parse(request.requestBody)
        const taskId = faker.number.hex({ min: 100, max: 300 })
        const newPayload = { ...payload, taskId }

        return schema.tasks.create(newPayload)
      }, { timing: 1000 })
    },
  })
}