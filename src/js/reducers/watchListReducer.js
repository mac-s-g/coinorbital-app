import {
  RECEIVE_WATCH_LIST,
  ADD_TO_WATCH_LIST,
  REORDER_WATCH_LIST
} from "./../actions"

const default_state = {
  ranked: []
}

export default (state = default_state, { type, payload }) => {
  switch (type) {
    case RECEIVE_WATCH_LIST:
      return {
        ...state,
        ranked: [...payload]
      }
    case ADD_TO_WATCH_LIST:
      return {
        ...state,
        ranked: [...payload]
      }
    case REORDER_WATCH_LIST:
      return {
        ...state,
        ranked: [...payload]
      }
    default:
      return state
  }
}
