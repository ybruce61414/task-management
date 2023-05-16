import styles from '../styles.module.scss'
import IconButton from '@mui/material/IconButton'
import AddIcon from '@mui/icons-material/Add'
import PropTypes from 'prop-types'
import Typography from '@mui/material/Typography'

// simple components will be collected here

export const ScrollContainer = props => {
  const { children, ...otherProps } = props
  return (
    <div className={styles.ScrollContainer} {...otherProps}>
      {children}
    </div>
  )
}

export const ScrollContent = props => {
  const { children, ...otherProps } = props
  return (
    <div className={styles.scrollContent} {...otherProps}>
      {children}
    </div>
  )
}


export const TaskHeader = () => {
  return (
    <header className={styles.header}>
      <Typography variant="h4">Task Management</Typography>
    </header>
  )
}


export const ItemCount = props => {
  const { visible: { from, to } } = props

  return (
    <div className={styles['item-count']}>
      Total Items: 1000
      <div className={styles.visible}>{from + 1}-{to + 1}</div>
    </div>
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
        <AddIcon />
      </IconButton>
    </section>
  )
}



// propTypes
ScrollContent.propTypes = {
  children: PropTypes.element.isRequired,
}

ScrollContainer.propTypes = {
  children: PropTypes.element.isRequired,
}

CreateBtn.propTypes = {
  onCreate: PropTypes.func,
}

ItemCount.propTypes = {
  visible: PropTypes.object,
}