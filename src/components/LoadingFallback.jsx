import { Backdrop, CircularProgress } from '@mui/material'

const LoadingFallback = () => {
  return (
    <Backdrop
      sx={{
        color: '#fff',
        zIndex: (theme) => theme.zIndex.drawer + 1
    }}
      open={true}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  )

  // return <div>fallback</div>
}

export default LoadingFallback