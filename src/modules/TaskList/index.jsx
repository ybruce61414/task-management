
import { useCallback, useEffect, useRef, useState } from 'react'
import dayjs from 'dayjs'
import styles from './styles.module.scss'
import CustomCard from './Card/index.jsx'
import DetailDrawer from './DetailDrawer/index.jsx'
import useFetchTasks from '../../hooks/api/useFetchTaks.jsx'
import LoadingOverlay from '../../components/LoadingOverlay'
import {
  TaskHeader,
  CreateBtn,
  ScrollContainer,
  ItemCount,
  ScrollContent,
  TaskContent,
} from './Atoms'
import { DATA_STATE } from '../../reducers/index.jsx'
import { throttle } from './utils.js'

const ITEM_HEIGHT = 240 + 40
const BUFFER_UNIT = 10

const TaskList = () => {
  // useEffect to fetch data
  const [isOpen, setOpen] = useState(false)
  const [detailData, setDetailData] = useState({})
  const [visible, setVisible] = useState({
    viewFrom: 0,
    viewTo: 0,
    originFrom: 0,
    originTo: 0,
  })

  const { isFetching, rawData: taskData } = useFetchTasks()
  const isLoading = isFetching || taskData.state === DATA_STATE.reload

  // ref
  const container = useRef()

  // callbacks
  const onOpenDrawer = useCallback(() => {
    setOpen(true)
  }, [])

  const onCloseDrawer = useCallback(() => {
    setOpen(false)
  }, [])

  const toggleDetail = useCallback((data) => {
    setDetailData(data)
    onOpenDrawer()
  }, [onOpenDrawer])

  const toggleCreate = useCallback(() => {
    console.log('-toggleCreate--')
    setDetailData({ date: dayjs().format() })
    onOpenDrawer()
  }, [onOpenDrawer])



  // infinite scroll
  const handleOnScroll = useCallback(() => {
    const totalItems = taskData.value.length
    const { clientHeight, scrollTop } = container.current

    const _clientViewItems = Math.ceil(clientHeight / ITEM_HEIGHT)

    const _originFrom = Math.floor(scrollTop / ITEM_HEIGHT)
    const _originTo = Math.min(_originFrom + _clientViewItems, totalItems)

    const _viewFrom = (_originFrom - BUFFER_UNIT < 0)? 0:( _originFrom - BUFFER_UNIT)
    const _viewTo = Math.min(_originFrom + _clientViewItems + BUFFER_UNIT, totalItems)

    // console.log('---_originFrom----')
    if (_viewFrom !== visible.viewFrom || _viewTo !== visible.viewTo) {
      setVisible({
        viewFrom: _viewFrom,
        viewTo: _viewTo,
        originFrom: _originFrom,
        originTo: _originTo,
      })
    }

  }, [
    container.current,
    taskData.value.length,
    setVisible,
    visible.viewFrom,
    visible.viewTo
  ])

  const throttleOnScroll = throttle(handleOnScroll, 700)

  useEffect(() => {
    if (taskData.state === DATA_STATE.ready) {
      handleOnScroll()
    }
  }, [taskData.state])

  console.log('---visible', visible)

  return (
    <div className={styles.layout}>
      <TaskHeader />
      <TaskContent>
        {isLoading && <LoadingOverlay />}
        <ItemCount
          total={taskData.value?.length}
          visible={{
            from: visible.originFrom,
            to: visible.originTo,
        }}
        />
        <ScrollContainer
          ref={container}
          onScroll={throttleOnScroll}
        >
          <ScrollContent>
            <div style={{
              height: visible.viewFrom * ITEM_HEIGHT,
            }}/>
            {(taskData.value
              .slice(visible.viewFrom, visible.viewTo + 1))
              .map((card, idx) => {
              return (
                <CustomCard
                  data={card}
                  key={`card-${card?.taskId ?? idx}`}
                  toggleDetail={toggleDetail}
                />
              )
            })}
            <div style={{
              height: (taskData.value.length - visible.viewTo) * ITEM_HEIGHT,
            }}/>
          </ScrollContent>
        </ScrollContainer>
        <CreateBtn onCreate={toggleCreate} />
      </TaskContent>
      {taskData.state === DATA_STATE.ready && (
        <DetailDrawer
          anchor="right"
          open={isOpen}
          data={detailData}
          onClose={onCloseDrawer}
        />
      )}
    </div>
  )
}

export default TaskList