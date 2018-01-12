import { RECEIVE_WATCH_LIST, ADD_TO_WATCH_LIST } from "./../actions"

const default_state = {
  ranked: []
}

export default (state = default_state, action) => {
  switch (action.type) {
    case RECEIVE_WATCH_LIST:
      return {
        ...state
      }
    case ADD_TO_WATCH_LIST:
      return {
        ...state
      }
    default:
      return state
  }
}
