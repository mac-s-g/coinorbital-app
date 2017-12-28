//centralize action exports

export {
  //action constants
  CLOSE_ALL_MODALS,
  NEW_TRANSACTION_MODAL,
  //dispatcher calls
  closeAllModals,
  newTransactionModal
} from "./Modals"

export {
  //action constants
  CREATE_TRANSACTION,
  //dispatcher calls
  createTransaction
} from "./Transactions"

export {
  //action constants
  REQUEST_COINS,
  RECEIVE_COINS,
  RECEIVE_COINS_ERROR,
  //dispatcher calls
  fetchCoins
} from "./Coins"
