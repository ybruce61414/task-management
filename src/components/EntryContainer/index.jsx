import { useMemo } from 'react'
import {
  createTheme,
  CssBaseline,
  ThemeProvider
} from '@mui/material'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { genRouteConfigs } from '../../routes/config.jsx'
import LoadingFallback from '../LoadingFallback.jsx'
import styles from './styles.module.scss'
import TasksProvider from '../../contexts/providers/TasksProvider.jsx'


const EntryContainer = () => {

  // RWD implement here
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  })

  const router = useMemo(() => {
    return createBrowserRouter(genRouteConfigs())
  }, [])

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <main className={styles.layout}>
        <TasksProvider>
          <RouterProvider
            router={router}
            fallbackElement={<LoadingFallback />}
          />
        </TasksProvider>
      </main>
    </ThemeProvider>
  )
}

export default EntryContainer