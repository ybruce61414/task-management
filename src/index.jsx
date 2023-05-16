import React from 'react'
import ReactDOM from 'react-dom/client'
import EntryContainer from './components/EntryContainer'
import { getUrlQueryMap } from './utils/index.js'
import makeMockServer from './mockApiServer'
// import './index.css'


const urlQueryMap = getUrlQueryMap()


if (urlQueryMap?.mock === 'true') {
  // activate mock server
  makeMockServer()
}

ReactDOM.createRoot(
  document.getElementById('root')
).render(
  <React.StrictMode>
    <EntryContainer />
  </React.StrictMode>
)
