import { CLOSE_ALL_MODALS, NEW_TRANSACTION_MODAL } from "./../actions"

const default_state = {
  new_transaction: false
}

export default (state = default_state, action) => {
  switch (action.type) {
    case CLOSE_ALL_MODALS:
      return {
        ...state,
        new_transaction: false
      }
    case NEW_TRANSACTION_MODAL:
      return {
        ...state,
        new_transaction: true
      }
    default:
      return state
  }
}
