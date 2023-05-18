import reactLogo from '../../assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useNavigate } from 'react-router-dom'
import { ROUTES_CONFIG } from '../../routes/const.js'


function App() {
  const navigate = useNavigate()
  const onClick = () => {
    navigate(`${ROUTES_CONFIG.TASK_LIST.route}?mock=true`)
  }

  return (
    <div className="app-layout">
      <div>
        <a
          href="https://vitejs.dev"
          target="_blank"
          rel="noreferrer"
        >
          <img
            src={viteLogo}
            className="logo"
            alt="Vite logo"
          />
        </a>
        <a
          href="https://react.dev"
          target="_blank"
          rel="noreferrer"
        >
          <img
            src={reactLogo}
            className="logo react"
            alt="React logo"
          />
        </a>
      </div>
      <div>
        <h2>Pricer Assignment</h2>
        <p style={{
          margin: 0,
          textAlign: 'center'
        }}>
          <code>crafted by Viola</code>
        </p>
      </div>
      <div className="card">
       <button
         className="btn b-1"
         onClick={onClick}
       >
         Task List Demo
       </button>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
