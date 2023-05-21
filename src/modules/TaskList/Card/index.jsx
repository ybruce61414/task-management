import { useState, forwardRef } from 'react'
import PropTypes from 'prop-types'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import { red } from '@mui/material/colors'
import { useNavigate } from 'react-router-dom'
import { ROUTES_CONFIG } from '../../../routes/const.js'
import { useTasksContext } from '../../../contexts/contextStore.jsx'
import { DATA_STATE } from '../../../reducers/index.jsx'
import ActionGroup from './ActionGroup.jsx'
import dayjs from 'dayjs'
import { dateFormatter } from '../../../utils/index.js'
import { styled } from '@mui/material'
import {enqueueSnackbar} from "notistack";


const CustomTypography = styled(Typography)`
  // something wrong with padding
  height: 120px;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 6;
  white-space: pre-wrap;
`

const CustomCard = forwardRef((props, ref) => {
  const { data, toggleDetail } = props
  const {
    taskId,
    name,
    description,
    date,
    order,
  } = data
  // order is an additional info

  const navigate = useNavigate()
  const { dispatchTaskData } = useTasksContext()


  const [anchorEl, setAnchorEl] = useState(null)

  // callbacks
  const onMore = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const onEdit = () => {
    handleClose()

    if (toggleDetail) {
      toggleDetail(data)
    } else {
      navigate(`${ROUTES_CONFIG.TASK_LIST.route}/${taskId}`)
    }

  }

  const onDelete = async () => {
    try {
      handleClose()
      dispatchTaskData({ type: DATA_STATE.reload })

      const res = await fetch(`http://localhost:5173/api/task-list/${taskId}`, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json'
        }
      })

      switch (res.status) {
        case 400:
        case 500: {
          dispatchTaskData({
            type: DATA_STATE.failed,
            value: res.statusText,
          })
          enqueueSnackbar(res.statusText, { variant: 'error' })
          break
        }
        case 200:
        case 204:
          enqueueSnackbar('deleted successfully', { variant: 'success' })
          break
        default:
          break
      }

      // await for the resource to be deleted
      // Return response data

    } catch (err) {
      console.error(err)
    }
  }


  return (
    <Card
      ref={ref}
      sx={{
        width: '90%',
        height: 240,
        boxSizing: 'borer-box',
        margin: '20px 0',
        borderLeft: '3px solid #f44337',
    }}>
      <CardHeader
        style={{
          boxSizing: 'border-box',
          height: '72px'
      }}
        avatar={
          <Avatar
            sx={{
              bgcolor: red[500],
              fontSize:'16px',
          }}
            aria-label="task-number"
          >
            {/*{taskId}*/}
            {order}
          </Avatar>
        }
        action={
        <ActionGroup
          onMore={onMore}
          anchorEl={anchorEl}
          handleClose={handleClose}
          onDelete={onDelete}
          onEdit={onEdit}
        />
        }
        title={name}
        subheader={dateFormatter(
          dayjs(date).year(),
          dayjs(date).month(),
          dayjs(date).date()
        )}
      />
      <CardContent
        style={{
          boxSizing: 'border-box',
          height: 'calc(100% - 72px)'
        }}
      >
        <CustomTypography
          variant="body2"
          color="text.secondary"
        >
          {description}
        </CustomTypography>
      </CardContent>
    </Card>
  )
})

CustomCard.propTypes = {
  data: PropTypes.object.isRequired,
  toggleDetail: PropTypes.func
}

CustomCard.displayName = 'CustomCard'
export default CustomCard