import { Box, Drawer } from '@mui/material'
import PropTypes from 'prop-types'

const DetailDrawer = props => {
  const {
    anchor,
    open,
    onClose,
  } = props

  return (
    <Drawer
      anchor={anchor}
      open={open}
      onClose={onClose}
      variant="temporary"
      PaperProps={{
        sx: {
          backgroundColor: '#121212',
          color: 'red',
        }
      }}
    >
      <Box
        sx={{ width: '370px' }}
        role="presentation"
        onClick={null}
        onKeyDown={onClose}
      >
        hello world
      </Box>
    </Drawer>
  )
}

DetailDrawer.propTypes = {
  anchor: PropTypes.string.isRequired,
  open: PropTypes.bool,
  onClose: PropTypes.func,
}

DetailDrawer.defaultProps = {
  open: false,
  onClose: null
}
export default DetailDrawer