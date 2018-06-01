import {
  USER_LOGOUT,
  RECEIVE_WATCH_LIST,
  REQUEST_WATCH_LIST,
  RECEIVE_WATCH_LIST_ERROR,
  ADD_TO_WATCH_LIST,
  REQUEST_ADD_TO_WATCH_LIST,
  ADD_TO_WATCH_LIST_ERROR,
  REMOVE_FROM_WATCH_LIST,
  REQUEST_REMOVE_FROM_WATCH_LIST,
  REMOVE_FROM_WATCH_LIST_ERROR,
  REORDER_WATCH_LIST,
  REQUEST_REORDER_WATCH_LIST,
  REORDER_WATCH_LIST_ERROR
} from "./../actions"

const default_state = {
  fetching: false,
  ranked: []
}

export default (state = default_state, { type, payload }) => {
  switch (type) {
    case USER_LOGOUT:
      return {
        ...default_state
      }
    case REQUEST_WATCH_LIST:
      return {
        ...state,
        fetching: true
      }
    case RECEIVE_WATCH_LIST:
      return {
        ...state,
        fetching: false,
        ranked: [...payload]
      }
    case REQUEST_ADD_TO_WATCH_LIST:
      return {
        ...state,
        ranked: [...state.ranked, ...payload]
      }
    case ADD_TO_WATCH_LIST:
      return {
        ...state,
        ranked: [...payload]
      }
    case REQUEST_REMOVE_FROM_WATCH_LIST:
      return {
        ...state,
        ranked: [
          ...state.ranked.reduce(
            (acc, symbol) => (symbol == payload ? acc : [...acc, symbol]),
            []
          )
        ]
      }
    case REMOVE_FROM_WATCH_LIST:
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
