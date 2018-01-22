import {
  CLOSE_ALL_MODALS,
  CREATE_TRANSACTION_MODAL,
  ADD_TO_WATCHLIST_MODAL,
  COIN_INFO_MODAL,
  CREATE_WALLET_MODAL
} from "./../actions"

const default_state = {
  create_transaction: false,
  add_to_watchlist: false,
  coin_info: false,
  create_wallet: false
}

export default (state = default_state, { type, payload }) => {
  switch (type) {
    case CLOSE_ALL_MODALS:
      return {
        ...state,
        create_transaction: false,
        add_to_watchlist: false,
        coin_info: false,
        create_wallet: false
      }
    case CREATE_TRANSACTION_MODAL:
      return {
        ...state,
        create_transaction: { ...payload }
      }
    case ADD_TO_WATCHLIST_MODAL:
      return {
        ...state,
        add_to_watchlist: true
      }
    case COIN_INFO_MODAL:
      return {
        ...state,
        coin_info: payload
      }
    case CREATE_WALLET_MODAL:
      return {
        ...state,
        create_wallet: true
      }
    default:
      return state
  }
}
