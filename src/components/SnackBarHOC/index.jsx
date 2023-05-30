import { forwardRef, useCallback } from 'react'
// import PropTypes from 'prop-types'
import { makeStyles } from '@mui/styles'
import { useSnackbar, SnackbarContent } from 'notistack'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import CancelIcon from '@mui/icons-material/Cancel'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'


const useStyles = makeStyles(() => ({
  root: {
    '@media (min-width:600px)': {
      minWidth: '288px !important',
      boxShadow: '0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)',
    }
  },
  card: {
    width: '100%'
  },
  typography: {
    color: 'whitesmoke'
  },
  actionRoot: {
    padding: '8px 8px 8px 16px',
    justifyContent: 'space-between'
  },
  icons: {
    marginLeft: 'auto'
  },
  expand: {
    padding: '8px 8px',
    transform: 'rotate(0deg)',
    color: 'whitesmoke',
    transition: 'all .2s'
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  },
  paper: {
    backgroundColor: '#fff',
    padding: 16
  },
  checkIcon: {
    fontSize: 20,
    paddingRight: 4
  },
  button: {
    padding: 0,
    textTransform: 'none'
  }
}))

const getBackgroundColor = variant => {
  switch (variant) {
    case 'error':
      return '#d32f2f'
    case 'success':
      return 'green'
    default:
      return 'grey'
  }
}

const getIcon = variant => {
  switch (variant) {
    case 'error':
      return <CancelIcon  fontSize="small" style={{margin: '0 5px 0 0'}} />
    case 'success':
      return <CheckCircleIcon  fontSize="small" style={{margin: '0 5px 0 0'}} />
    default:
      return <></>
  }
}
// eslint-disable-next-line react/display-name
export const SnackBarHOC = variant => forwardRef((props, ref) => {
  // eslint-disable-next-line react/prop-types
    const { id, ...otherProps } = props
    const classes = useStyles()
    const { closeSnackbar } = useSnackbar()


    const handleDismiss = useCallback(() => {
      closeSnackbar(id)
    }, [id, closeSnackbar])

    return (
      <SnackbarContent
        ref={ref}
        className={classes.root}
      >
        <Card
          className={classes.card}
          style={{ backgroundColor: getBackgroundColor(variant) }}
        >
          <CardActions classes={{ root: classes.actionRoot }}>
            {getIcon(variant)}
            <Typography
              variant="body2"
              className={classes.typography}
            >
              {otherProps.message}
            </Typography>
            <div className={classes.icons}>
              <IconButton
                size="small"
                className={classes.expand}
                onClick={handleDismiss}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </div>
          </CardActions>
        </Card>
      </SnackbarContent>
    )
  }
)







SnackBarHOC.displayName = 'SnackBarHOC'

export default SnackBarHOC
