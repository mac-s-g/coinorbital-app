import {
  RECEIVE_WALLETS,
  CREATE_WALLET,
  DELETE_WALLET,
  EDIT_WALLET
} from "./../actions"

const default_state = {
  fetched: false,
  by_name: {}
}

export default (state = default_state, { type, payload }) => {
  switch (type) {
    case RECEIVE_WALLETS:
      return {
        ...state,
        fetched: true,
        by_name: {
          ...payload
        }
      }
    case CREATE_WALLET:
      return {
        ...state,
        by_name: {
          ...state.by_name,
          ...payload
        }
      }
    case DELETE_WALLET:
      return {
        ...state,
        by_name: {
          ...payload
        }
      }
    case EDIT_WALLET:
      return {
        ...state,
        by_name: {
          ...payload
        }
      }
    default:
      return state
  }
}
