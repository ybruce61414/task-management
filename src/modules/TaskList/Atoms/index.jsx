import styles from '../styles.module.scss'
import IconButton from '@mui/material/IconButton'
import AddIcon from '@mui/icons-material/Add'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import PropTypes from 'prop-types'
import Typography from '@mui/material/Typography'
import { forwardRef } from 'react'

// simple components will be collected here
export const TaskContent = props => {
  const { children, ...otherProps } = props
  return (
    <section className={styles.content} {...otherProps}>
      {children}
    </section>
  )
}

export const ScrollContainer = forwardRef((props, ref) => {
  const { children, ...otherProps } = props
  return (
    <div
      className={styles['scroll-container']}
      {...otherProps}
      ref={ref}
    >
      {children}
    </div>
  )
})

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
  const { total, visible: { from, to } } = props

  return (
    <div className={styles['item-count-wrapper']}>
      <div className={styles['item-count']}>
        {`Total: ${total}`}
        <div className={styles.visible}>{from === 0? 0: from + 1}-{to}</div>
      </div>
    </div>
  )
}

export const CreateBtn = props => {
  const { onCreate } = props

  return (
    <section className={styles['create-button']}>
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
export const ScrollTopBtn = props => {
  const { onTop } = props

  return (
    <section className={styles['scroll-to-top-button']}>
      <IconButton
        sx={{ backgroundColor: 'rgb(0,191,255, 0.6)' }}
        onClick={onTop}
        size="large"
        aria-label="more-btn"
      >
        <KeyboardArrowUpIcon />
      </IconButton>
    </section>
  )
}

export const NoData = () => {
  return (
    <div className={styles['no-data']}>
      No data
    </div>
  )
}

export const ServerError = () => {
  return (
    <div className={styles['no-data']}>
      <div>No data</div>
      <p><code>server error</code></p>
    </div>
  )
}


// propTypes
TaskContent.propTypes = {
  children: PropTypes.array.isRequired,
}

ScrollContent.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.element,
  ]),
}
ScrollContent.defaultProps = {
  children: <></>
}

ScrollContainer.propTypes = {
  children: PropTypes.element.isRequired,
}

CreateBtn.propTypes = {
  onCreate: PropTypes.func,
}

ScrollTopBtn.propTypes = {
  onTop: PropTypes.func,
}

ItemCount.propTypes = {
  visible: PropTypes.object,
  total: PropTypes.number,
}
ItemCount.defaultProps = {
  total: 0
}

ScrollContainer.displayName = 'ScrollContainer'