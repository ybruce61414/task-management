export const DATA_STATE = {
  init: 'INIT',
  fetching: 'FETCHING',
  ready: 'READY',
  reload: 'RELOAD',
  failed: 'FAILED'
};

export const initialDataState = {
  state: DATA_STATE.init,
  value: {},
}

export const apiDataReducer = initValue => (state, action) => {
  switch (action.type) {
    case DATA_STATE.fetching:
      return { state: DATA_STATE.fetching, value: state.value }
    case DATA_STATE.reload:
      return { state: DATA_STATE.reload, value: state.value }
    case DATA_STATE.ready:
      return { state: DATA_STATE.ready, value: action.value }
    case DATA_STATE.failed:
      return { state: DATA_STATE.failed, value: action.value || [] }
    default:
      throw new Error('unknown action type')
  }
}