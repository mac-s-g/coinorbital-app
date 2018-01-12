import {
  CLOSE_ALL_MODALS,
  NEW_TRANSACTION_MODAL,
  ADD_TO_WATCHLIST_MODAL
} from "./../actions"

const default_state = {
  new_transaction: false,
  add_to_watchlist: false
}

export default (state = default_state, action) => {
  switch (action.type) {
    case CLOSE_ALL_MODALS:
      return {
        ...state,
        new_transaction: false,
        add_to_watchlist: false
      }
    case NEW_TRANSACTION_MODAL:
      return {
        ...state,
        new_transaction: true,
        add_to_watchlist: false
      }
    case ADD_TO_WATCHLIST_MODAL:
      return {
        ...state,
        add_to_watchlist: true,
        new_transaction: false
      }
    default:
      return state
  }
}
