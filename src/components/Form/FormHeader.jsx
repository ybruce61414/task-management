import styles from '../../modules/TaskList/styles.module.scss'
import Typography from '@mui/material/Typography'
import PropTypes from 'prop-types'

const FormHeader = props => {
  const { title } = props

  return (
    <div className={styles.formHeader}>
      <Typography variant="h5">
        {title}
      </Typography>
    </div>
  )
}

FormHeader.propTypes = {
  title: PropTypes.string
}

export default FormHeader