
import styles from './styles.module.scss'
import CustomCard from './Card/index.jsx'
import {useCallback, useRef, useState} from 'react'
import DetailDrawer from './DetailDrawer/index.jsx'
import useFetchTasks from '../../hooks/useFetchTaks.jsx'
import LoadingFallback from '../../components/LoadingFallback.jsx'
import {TaskHeader, CreateBtn, ScrollContainer, ItemCount, ScrollContent} from './Atoms'
import { DATA_STATE } from '../../reducers/index.jsx'
import dayjs from 'dayjs'



const TaskList = () => {
  // useEffect to fetch data
  const [isOpen, setOpen] = useState(false)
  const [detailData, setDetailData] = useState({})

  const { isFetching, rawData: taskData } = useFetchTasks()
  const isLoading = isFetching || taskData.state === DATA_STATE.reload

  // ref
  const container = useRef()

  // callbacks
  const toggleDrawer = useCallback(open => {
    setOpen(open)
  }, [])

  const toggleDetail = useCallback((data) => {
    setDetailData(data)
    toggleDrawer(true)
  }, [toggleDrawer])

  const onCloseDrawer = useCallback(() => {
    toggleDrawer(false)
  }, [toggleDrawer])

  const toggleCreate = useCallback(() => {
    console.log('-toggleCreate--')
    setDetailData({ date: dayjs().format() })
    toggleDrawer(true)
  }, [toggleDrawer])

  console.log('---task list render', isLoading, taskData)


  // todo: infinite scroll
  const handleOnScroll = useCallback(event => {
    console.log('----onscroll', event)
  }, [])


  return (
    <div className={styles.layout}>
      <TaskHeader />
      <section className={styles.content}>
        {isLoading && <LoadingFallback />}
        <ItemCount visible={{ from:0, to: 10 }} />
        <ScrollContainer
          ref={container}
          onScroll={handleOnScroll}
        >
          <ScrollContent>
            {(taskData.value).map((card, idx) => {
              return (
                <CustomCard
                  data={card}
                  key={`card-${card?.taskId ?? idx}`}
                  toggleDetail={toggleDetail}
                />
              )
            })}
          </ScrollContent>

        </ScrollContainer>
        <CreateBtn onCreate={toggleCreate} />
      </section>
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