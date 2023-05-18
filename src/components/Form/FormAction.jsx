import { Stack, styled } from '@mui/material'
import styles from '../../modules/TaskList/styles.module.scss'
import Button from '@mui/material/Button'
import PropTypes from 'prop-types'

const CustomButton = styled(Button)`
  background-color: #535bf2;
`
const FormAction = props => {
  const { onSubmit, onCancel, error } = props

  return (
    <div className={styles['for-action-bar']}>
      <Stack
        sx={{ width: '100%', padding: '0 20px' }}
        spacing={2}
        direction="row-reverse"
      >
        <CustomButton
          onClick={onSubmit}
          disabled={error}
          variant="contained"
          size="small"
        >
          Submit
        </CustomButton>
        <Button
          onClick={onCancel}
          variant="outlined"
          size="small"
        >
          Cancel
        </Button>
      </Stack>
    </div>
  )
}

FormAction.propTypes = {
  error: PropTypes.bool,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
}

export default FormAction