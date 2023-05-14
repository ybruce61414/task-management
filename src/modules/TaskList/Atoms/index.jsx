import styles from '../styles.module.scss'
import IconButton from '@mui/material/IconButton'
import AddIcon from '@mui/icons-material/Add'
import PropTypes from 'prop-types'

// simple components will be collected here
export const TaskHeader = () => {
  return (
    <header className={styles.header}>
      Task Management
    </header>
  )
}

export const CreateBtn = props => {
  const { onCreate } = props

  return (
    <section className={styles.createBtn}>
      <IconButton
        sx={{ backgroundColor: 'rgb(0,191,255, 0.6)' }}
        onClick={onCreate}
        size="large"
        aria-label="more-btn"
      >
        <AddIcon fontSize="inherit" />
      </IconButton>
    </section>
  )
}

CreateBtn.propTypes = {
  onCreate: PropTypes.func,
}
