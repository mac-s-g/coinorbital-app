import {
  CLOSE_ALL_MODALS,
  CREATE_TRANSACTION_MODAL,
  ADD_TO_WATCHLIST_MODAL,
  COIN_INFO_MODAL,
  EDIT_WALLET_MODAL,
  DELETE_WALLET_MODAL,
  CREATE_WALLET_MODAL,
  DELETE_TRANSACTION_MODAL,
  EDIT_TRANSACTION_MODAL,
  TRANSACTION_NOTE_MODAL
} from "./../actions"

const default_state = {
  create_transaction: false,
  add_to_watchlist: false,
  coin_info: false,
  create_wallet: false,
  edit_wallet: false,
  delete_wallet: false,
  delete_transaction: false,
  edit_transaction: false,
  transaction_note: false
}

export default (state = default_state, { type, payload }) => {
  switch (type) {
    case CLOSE_ALL_MODALS:
      return {
        ...state,
        create_transaction: false,
        add_to_watchlist: false,
        coin_info: false,
        create_wallet: false,
        edit_wallet: false,
        delete_wallet: false,
        delete_transaction: false,
        edit_transaction: false,
        transaction_note: false
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
    case EDIT_WALLET_MODAL:
      return {
        ...state,
        edit_wallet: { ...payload }
      }
    case DELETE_WALLET_MODAL:
      return {
        ...state,
        delete_wallet: payload
      }
    case DELETE_TRANSACTION_MODAL:
      return {
        ...state,
        delete_transaction: payload
      }
    case EDIT_TRANSACTION_MODAL:
      return {
        ...state,
        edit_transaction: payload
      }
    case TRANSACTION_NOTE_MODAL:
      return {
        ...state,
        transaction_note: payload
      }
    default:
      return state
  }
}
