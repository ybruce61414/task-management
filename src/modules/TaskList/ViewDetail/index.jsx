import { useNavigate, useParams } from 'react-router-dom'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import IconButton from '@mui/material/IconButton'
import { ROUTES_CONFIG } from '../../../routes/const.js'

const ViewDetail = () => {
  const params = useParams()
  const navigate = useNavigate()

  const onBack = () => {
    navigate(ROUTES_CONFIG.TASK_LIST.route)
  }

  return (
    <div>
      <IconButton
        onClick={onBack}
        aria-label="back-btn"
      >
        <ArrowBackIosNewIcon />
      </IconButton>
      {`param: ${params.taskId}`}
    </div>
  )
}

export default ViewDetail