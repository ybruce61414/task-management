
import { useCallback, useEffect, useRef, useState } from 'react'
import dayjs from 'dayjs'
import styles from './styles.module.scss'
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
  ScrollTopBtn,
} from './Atoms'
import { DATA_STATE } from '../../reducers/index.jsx'
import { throttle } from './utils.js'
import CardSection from './CardSection/index.jsx'

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

  // refs
  // for scroll container
  const container = useRef({})

  // for top element
  // const topElementRef = useRef(null)

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
    setDetailData({ date: dayjs().format() })
    onOpenDrawer()
  }, [onOpenDrawer])

  // const onScrollTop = useCallback(() => {
  //   // todo: only anchor the first render element
  //   topElementRef.current?.scrollIntoView({
  //     behavior: 'instant',
  //     block: 'end',
  //     inline: 'start'
  //   })
  // }, [topElementRef.current])


  // infinite scroll
  const handleOnScroll = useCallback(() => {
    const totalItems = taskData.value?.length || 0
    const { clientHeight, scrollTop } = container.current

    const _clientViewItems = Math.ceil(clientHeight / ITEM_HEIGHT)

    const _originFrom = Math.floor(scrollTop / ITEM_HEIGHT)
    const _originTo = Math.min(_originFrom + _clientViewItems, totalItems)

    const _viewFrom = (_originFrom - BUFFER_UNIT < 0)? 0:( _originFrom - BUFFER_UNIT)
    const _viewTo = Math.min(_originFrom + _clientViewItems + BUFFER_UNIT, totalItems)

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
    taskData.value?.length,
    setVisible,
    visible.viewFrom,
    visible.viewTo
  ])

  const throttleOnScroll = throttle(handleOnScroll, 300)

  useEffect(() => {
    if (taskData.state === DATA_STATE.ready) {
      handleOnScroll()
    }
  }, [taskData.state])


  return (
    <div className={styles.layout}>
      <TaskHeader />
      <TaskContent>
        {isLoading && <LoadingOverlay />}
        <ItemCount
          total={taskData.value?.length || 0}
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
            <CardSection
              taskData={taskData}
              visible={visible}
              toggleDetail={toggleDetail}
              ITEM_HEIGHT={ITEM_HEIGHT}
              // externalRef={topElementRef}
            />
          </ScrollContent>
        </ScrollContainer>
        <CreateBtn onCreate={toggleCreate} />
        {/*<ScrollTopBtn onTop={onScrollTop} />*/}
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