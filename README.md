# Task Management
The project is set up by `create vite`.

## Quick Start
Run the app locally:
1. `yarn install`
2. `yarn dev`
3. open with [http://localhost:5173/task-list?mock=true](http://localhost:5173/task-list?mock=true)
- Note: the *query string* **mock=true** is used to activate mock server.

## Overview
The app demonstrates **creating/editing/deleting**  actions of tasks. A task card has 3 required input fields (*name*, *description*, *date*) and the top-left icon number represents the *order* of card. 
They are all sorted by date.
Additionally, the app has some key features:
1. The app uses to make network request instead of mocking code coupling in codebase.
2. The view list handles large amount of fetching data with no pagination using **infinite scroll**.
3. Optimizing scroll handler by using **throttle**.



## Specs
1. API spec assumptions from mock server:
   - Tasks
      1. `GET` http://localhost:5173/api/task-list
         > ```json
         > {
         >    "data": [
         >      {
         >        "taskId": "1",
         >        "name": "pricer",
         >        "description": "assignment is cool",
         >        "date": "2022-07-31T01:33:29.567Z"
         >      }
         >    ]
         > }
         > ```
      2. `PATCH` http://localhost:5173/api/task-list/{taskId}
      3. `POST` http://localhost:5173/api/task-list
   - Mock sever: [Mirage.js](https://miragejs.com/docs/getting-started/introduction/) (using in-memory database)
   - Working principle:
     - Mirage mocks the HTTP boundary, it intercepts any `XMLHttpRequest` or `fetch` requests your app makes and lets you mock the response.
2. Task form fields:
    -   | Field | Data type | Required |     Format      | Limit         |
        |:----------|:---------|:---------------:|:--------------|   :-----      |
        | name | `string`  | `true`   |        -        | maxLength=300 |
        | description | `string`  | `true`     |        -        | maxLength=300 |
        | date | `string`  | `true`     | ISO date format | -             |
3. Third-party libraries used:
   1. [React Router v6](https://reactrouter.com/en/main/start/overview)
   2. [Material UI](https://mui.com/)
   3. [Mirage](https://miragejs.com/docs/getting-started/introduction/) (mock server)
   4. [Faker](https://fakerjs.dev/) (mock data generator)

