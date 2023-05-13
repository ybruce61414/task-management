
import styles from './styles.module.scss'
import CustomCard from './Card/index.jsx'
import { useState } from 'react'

const TaskList = () => {
  const [cards, setCards] = useState([1,2,3,4,5,6,7,8,9,10])

  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        Task Management
      </header>
      <section className={styles.content}>
        <article>
          {cards.map((card, idx) => {
            return (
              <CustomCard
                id={idx}
                key={idx}
                data={card}
              />
            )
          })}
        </article>
      </section>
    </div>
  )
}

export default TaskList