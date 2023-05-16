import IconButton from '@mui/material/IconButton'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import {
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import PropTypes from 'prop-types'



const ActionGroup = props => {
  const {
    onMore,
    anchorEl,
    handleClose,
    onDelete,
    onEdit,
  } = props

  const open = Boolean(anchorEl)

  return (
    <>
      <IconButton
        onClick={onMore}
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
  )
}

ActionGroup.propTypes = {
  onMore: PropTypes.func,
  anchorEl: PropTypes.object,
  handleClose: PropTypes.func,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
}
export default ActionGroup