import {
  CLOSE_ALL_MODALS,
  NEW_TRANSACTION_MODAL,
  ADD_TO_WATCHLIST_MODAL,
  COIN_INFO_MODAL
} from "./../actions"

const default_state = {
  new_transaction: false,
  add_to_watchlist: false,
  coin_info: false
}

export default (state = default_state, { type, payload }) => {
  switch (type) {
    case CLOSE_ALL_MODALS:
      return {
        ...state,
        new_transaction: false,
        add_to_watchlist: false,
        coin_info: false
      }
    case NEW_TRANSACTION_MODAL:
      return {
        ...state,
        new_transaction: true,
        add_to_watchlist: false,
        coin_info: false
      }
    case ADD_TO_WATCHLIST_MODAL:
      return {
        ...state,
        add_to_watchlist: true,
        new_transaction: false,
        coin_info: false
      }
    case COIN_INFO_MODAL:
      return {
        ...state,
        coin_info: payload,
        add_to_watchlist: false,
        new_transaction: false
      }
    default:
      return state
  }
}
