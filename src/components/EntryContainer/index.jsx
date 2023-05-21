import { useMemo } from 'react'
import {
  createTheme,
  CssBaseline,
  ThemeProvider
} from '@mui/material'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { SnackbarProvider } from 'notistack'
import { genRouteConfigs } from '../../routes/config.jsx'
import LoadingOverlay from '../LoadingOverlay/index.jsx'
import styles from './styles.module.scss'
import TasksProvider from '../../contexts/providers/TasksProvider.jsx'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import SnackBarHOC  from '../snackBars/index.jsx'


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
          <SnackbarProvider
            Components={{
              error: SnackBarHOC('error'),
              success: SnackBarHOC('success'),
            }}
          >
            <TasksProvider>
              <RouterProvider
                router={router}
                fallbackElement={<LoadingOverlay />}
              />
            </TasksProvider>
          </SnackbarProvider>
        </LocalizationProvider>
      </main>
    </ThemeProvider>
  )
}

export default EntryContainer