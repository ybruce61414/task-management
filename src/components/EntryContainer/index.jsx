import { useMemo } from 'react'
import {createTheme, CssBaseline, ThemeProvider} from '@mui/material'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { genRouteConfigs } from '../../routes/config.jsx'
import LoadingFallback from '../LoadingFallback.jsx'
import styles from './styles.module.scss'


const EntryContainer = () => {

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
        <RouterProvider
          router={router}
          fallbackElement={<LoadingFallback />}
        />
      </main>
    </ThemeProvider>
  )
}

export default EntryContainer