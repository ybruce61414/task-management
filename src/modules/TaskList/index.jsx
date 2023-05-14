
import styles from './styles.module.scss'
import CustomCard from './Card/index.jsx'
import { useState } from 'react'
import DetailDrawer from './DetailDrawer/index.jsx'
import useFetchTasks from '../../hooks/useFetchTaks.jsx'
import LoadingFallback from '../../components/LoadingFallback.jsx'
import { TaskHeader, CreateBtn } from './Atoms'


const TaskList = () => {
  // useEffect to fetch data
  const [isOpen, setOpen] = useState(false)

  const { isLoading, rawData: taskData } = useFetchTasks()

  const toggleDrawer = open => event => {
    if (
      event?.type === 'keydown' &&
      (event?.key === 'Tab' || event?.key === 'Shift')
    ) return

    setOpen(open)
  }



console.log('---taskData', taskData)



  return (
    <div className={styles.layout}>
      <TaskHeader />
      <section className={styles.content}>
        {isLoading? <LoadingFallback /> : (
          <>
            <article>
              {(taskData.value).map((card, idx) => {
                return (
                  <CustomCard
                    data={card}
                    key={`card-${card?.taskId ?? idx}`}
                    externalCallback={toggleDrawer(true)}
                  />
                )
              })}
            </article>
            <CreateBtn onCreate={null} />
          </>
        )}
      </section>
      <DetailDrawer
        anchor="right"
        open={isOpen}
        onClose={toggleDrawer(false)}
      />
    </div>
  )
}

export default TaskList