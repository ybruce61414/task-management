import {useState} from 'react'
import PropTypes from 'prop-types'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
// import CardActions from '@mui/material/CardActions'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { red } from '@mui/material/colors'
import MoreVertIcon from '@mui/icons-material/MoreVert'
// import FavoriteIcon from '@mui/icons-material/Favorite'
// import ShareIcon from '@mui/icons-material/Share'
import { useNavigate } from 'react-router-dom'
import { ROUTES_CONFIG } from '../../../routes/const.js'
import {
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'



const CustomCard = props => {
  const { data, externalCallback } = props
  const {
    taskId,
    name,
    description,
    'create-date': createDate,
  } = data
  const navigate = useNavigate()


  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const onEdit = () => {
    // detail
    // navigate(`${ROUTES_CONFIG.TASK_LIST.route}/${taskId}`)

    console.log('---onEdit')

    if (externalCallback) {
      externalCallback()
    } else {
      navigate(`${ROUTES_CONFIG.TASK_LIST.route}/${taskId}`)
    }
    handleClose()
  }

  const onDelete = () => {
    console.log('-onDelete--')
  }

  return (
    <Card sx={{
      maxWidth: 450,
      minWidth: 360,
      margin: '20px 0',
      borderLeft: '3px solid #f44337',
    }}>
      <CardHeader
        avatar={
          <Avatar
            sx={{ bgcolor: red[500] }}
            aria-label="recipe"
          >
            {taskId}
          </Avatar>
        }
        action={
          <>
            <IconButton
              onClick={handleClick}
              aria-label="more-btn"
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="long-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'long-button',
                style: {
                  padding: 0,
                }
              }}
              PaperProps={{
                style: {
                  width: 160
                },
              }}
            >
              <MenuList dense>
                <MenuItem onClick={onDelete}>
                  <ListItemIcon>
                    <DeleteIcon />
                  </ListItemIcon>
                  <ListItemText>Delete</ListItemText>
                </MenuItem>
                <MenuItem onClick={onEdit}>
                  <ListItemIcon>
                    <EditIcon />
                  </ListItemIcon>
                  <ListItemText>Edit</ListItemText>
                </MenuItem>
              </MenuList>
            </Menu>
          </>
        }
        title={name}
        subheader="September 14, 2016"
      />
      <CardContent>
        <Typography
          variant="body2"
          color="text.secondary"
        >
          {description}
        </Typography>
      </CardContent>
    </Card>
  )
}

CustomCard.propTypes = {
  data: PropTypes.object.isRequired,
  externalCallback: PropTypes.func
}

// CustomCard.defaultProps = {
// }

export default CustomCard