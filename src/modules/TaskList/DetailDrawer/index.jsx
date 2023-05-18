import { useMemo } from 'react'
import PropTypes from 'prop-types'
import { Box, Drawer, styled } from '@mui/material'
import FormBody from '../../../components/Form/FormBody.jsx'
import FormHeader from '../../../components/Form/FormHeader.jsx'
import FormAction from '../../../components/Form/FormAction.jsx'
import useTextInput from '../../../components/Form/hooks/useTextInput.jsx'
import { DATA_STATE } from '../../../reducers/index.jsx'
import { useTasksContext } from '../../../contexts/contextStore.jsx'
import useCalendarInput from '../../../components/Form/hooks/useCalendarInput.jsx';


const getMode = detailData => {
  const keys = Object.keys(detailData)

  if (keys.length === 1 && keys[0] === 'date') {
    return 'create'
  }
  return 'edit'
}

const DrawerLayout = styled(Box)`
  width: 460px;
  height: 100vh;
`

const DetailDrawer = props => {
  const { dispatchTaskData } = useTasksContext()
  const {
    anchor,
    data,
    open,
    onClose,
  } = props

  const {
    taskId,
    name,
    description,
    date,
  } = data

  const mode = getMode(data)
  const headerTitle = useMemo(() => {
    switch (mode) {
      case 'create':
        return 'Task Creation'
      case 'edit':
        return 'Task Edition'
      default:
        return 'Unknown Action'
    }
  }, [mode])


  // form fields
  const {
    Component: NameField,
    inputValue: nameValue,
    error: nameError,
  } =useTextInput({
    mode,
    name: 'name',
    initValue: name,
    isOpen: open,
    fieldProps: {
      required: true,
    }
  })

  const {
    Component: DescriptionField,
    inputValue: descriptionValue,
    error: descError,
  } =useTextInput({
    mode,
    name: 'description',
    initValue: description,
    isOpen: open,
    fieldProps: {
      required: true,
      multiline: true,
      rows: 10,
    }
  })

  const {
    Component: CalendarField,
    inputValue: dateValue,
    error: dateError,
  } = useCalendarInput({
    mode,
    name: 'calendar',
    initValue: date,
    isOpen: open,
  })

  const error = Boolean(
    nameError.value || descError.value || dateError.value
  )

  // callbacks
  const onEdit = async () => {
    try {
      console.log('-onEdit--')
      onClose()
      dispatchTaskData({ type: DATA_STATE.reload })

      const url = `http://localhost:5173/api/task-list/${taskId}`

      const res = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
          name: nameValue,
          description: descriptionValue,
          date: dateValue,
        }),
      })
      console.log('---patch', res)
    } catch (err) {
      console.error(err)
    }
  }

  const onCreate = async () => {
    try {
      console.log('-onCreate--')
      onClose()
      dispatchTaskData({ type: DATA_STATE.reload })

      const url = 'http://localhost:5173/api/task-list'

      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
          name: nameValue,
          description: descriptionValue,
          date: dateValue,
          'create-date': null,
        }),
      })
      console.log('---create', res)
    } catch (err) {
      console.error(err)
    }
  }

  const onSubmit = () => {
    switch (mode) {
      case 'create':
        onCreate()
        break
      case 'edit':
        onEdit()
        break
      default:
        console.log('unknown mode')
    }
  }

  // todo! create and edit form validation!
  // console.log('--DetailDrawer-render-', date)
  // console.log('--DetailDrawer-dateError-', dateError)
  // console.log('--DetailDrawer-descError-', descError)

  return (
    <Drawer
      anchor={anchor}
      open={open}
      onClose={onClose}
      variant="temporary"
      PaperProps={{
        sx: {
          backgroundColor: '#121212',
          color: 'white',
        }
      }}
    >
      <DrawerLayout>
        <FormHeader title={headerTitle} />
        <FormBody>
          {NameField}
          {DescriptionField}
          {CalendarField}
        </FormBody>
        <FormAction
          onSubmit={onSubmit}
          onCancel={onClose}
          error={error}
        />
      </DrawerLayout>
    </Drawer>
  )
}

DetailDrawer.propTypes = {
  anchor: PropTypes.string.isRequired,
  open: PropTypes.bool,
  data: PropTypes.object,
  onClose: PropTypes.func,
}

DetailDrawer.defaultProps = {
  open: false,
  onClose: null
}
export default DetailDrawer