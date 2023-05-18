import { useMemo } from 'react'
import {
  createTheme,
  CssBaseline,
  ThemeProvider
} from '@mui/material'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { genRouteConfigs } from '../../routes/config.jsx'
import LoadingOverlay from '../LoadingOverlay/index.jsx'
import styles from './styles.module.scss'
import TasksProvider from '../../contexts/providers/TasksProvider.jsx'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'


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
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TasksProvider>
            <RouterProvider
              router={router}
              fallbackElement={<LoadingOverlay />}
            />
          </TasksProvider>
        </LocalizationProvider>
      </main>
    </ThemeProvider>
  )
}

export default EntryContainer