import {createServer, Model, Response} from 'miragejs'
import { faker } from '@faker-js/faker'
import { httpError, STATUS_CODES } from './utils/index.js'
// import { mockTasks } from './mock/index.js'



export default function (query) {
  createServer({
    models: {
      task: Model,
    },
    seeds(server) {
      const count = 10000

      for (let i = 0; i < count; i++) {
        // date format: '2022-07-31T01:33:29.567Z'
        server.create('task', {
          taskId: faker.string.uuid(),
          name: faker.commerce.productName(),
          description: faker.commerce.productDescription(),
          date: faker.date.anytime(),
        })
      }
    },
    routes() {
      // url
      const taskListUrl = '/api/tasks'

      // http methods:
      // get tasks
      this.get(taskListUrl, (schema) => {
        // return mockTasks
        const statusCode = query['code']
        const method = query['method']

        if (method === 'get') {
          switch (statusCode) {
            case STATUS_CODES.badRequest:
              return new Response(
                400,
                { prop: 'header' },
                httpError[STATUS_CODES.badRequest]
              )
            case STATUS_CODES.notFound:
              return new Response(
                404,
                { prop: 'header' },
                httpError[STATUS_CODES.notFound]
              );
            case STATUS_CODES.internalServerError:
              return new Response(
                500,
                { prop: 'header' },
                httpError[STATUS_CODES.internalServerError]
              )
            case STATUS_CODES.success:
            default:
              return { data: schema.tasks.all().models }
          }
        }
        return { data: schema.tasks.all().models }
      }, { timing: 1500 })

      // delete task
      this.delete(`${taskListUrl}/:taskId`, (schema, request) => {
        const taskId = request.params.taskId

        return schema.tasks.findBy({ taskId }).destroy()
      }, { timing: 1000 })

      // edit task
      this.patch(`${taskListUrl}/:taskId`, (schema, request) => {
        const statusCode = query['code']
        const method = query['method']

        const taskId = request.params.taskId
        const payload = JSON.parse(request.requestBody)


        if (method === 'patch') {
          switch (statusCode) {
            case STATUS_CODES.badRequest:
              return new Response(
                400,
                { prop: 'header' },
                httpError[STATUS_CODES.badRequest]
              )
            case STATUS_CODES.internalServerError:
              return new Response(
                500,
                { prop: 'header' },
                httpError[STATUS_CODES.internalServerError]
              )
            case STATUS_CODES.success:
            default:
              return schema.tasks.findBy({ taskId }).update({ ...payload })
          }
        }


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