import PropTypes from 'prop-types'
import CustomCard from '../Card/index.jsx'
import { NoData } from '../Atoms/index.jsx'
import { DATA_STATE } from '../../../reducers/index.jsx'



const CardSection = props => {
  const {
    taskData,
    visible,
    toggleDetail,
    ITEM_HEIGHT,
    externalRef,
  } = props


  if ([
    DATA_STATE.ready,
    DATA_STATE.reload,
  ].includes(taskData.state)) {
    if (taskData.value?.length > 0) {
      // drawing cards
      return (
        <>
          <div style={{
            height: visible.viewFrom * ITEM_HEIGHT,
          }}/>
          {(taskData.value
            .slice(visible.viewFrom, visible.viewTo + 1))
            .map((card, idx) => {
              return (
                <CustomCard
                  data={card}
                  ref={idx === 0? externalRef: null}
                  key={`card-${card?.taskId ?? idx}`}
                  toggleDetail={toggleDetail}
                />
              )
            })}
          <div style={{
            height: (taskData.value?.length - visible.viewTo) * ITEM_HEIGHT,
          }}/>
        </>
      )
    }

   return <NoData />
  } else if (taskData.state ===DATA_STATE.failed) {
    // todo: failed state error handling <ServerError />
    return <NoData />
  }

  return <></>
}

CardSection.propTypes = {
  taskData: PropTypes.object,
  visible: PropTypes.object,
  toggleDetail: PropTypes.func,
  ITEM_HEIGHT: PropTypes.number,
  externalRef: PropTypes.object,
}

CardSection.defaultProps = {
  externalRef: {}
}
export default CardSection