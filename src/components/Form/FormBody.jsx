import PropTypes from 'prop-types'
import { Box } from '@mui/material'


const FormBody = props => {
  const { children } = props
  
  return (
    <Box
      sx={{
        // '& .MuiTextField-root': { m: 1, width: '25ch' },
        height: 'calc(100% - 60px - 100px)',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
      }}
    >
      {children}
    </Box>
  )
}


FormBody.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element.isRequired,
    PropTypes.array,
  ])
}

export default FormBody