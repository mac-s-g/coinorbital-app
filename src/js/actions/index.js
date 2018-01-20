//centralize action exports

export {
  //action constants
  CLOSE_ALL_MODALS,
  NEW_TRANSACTION_MODAL,
  ADD_TO_WATCHLIST_MODAL,
  COIN_INFO_MODAL,
  //dispatcher calls
  closeAllModals,
  newTransactionModal,
  addToWatchListModal,
  coinInfoModal
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

export {
  //action constants
  RECEIVE_WATCH_LIST,
  ADD_TO_WATCH_LIST,
  REMOVE_FROM_WATCH_LIST,
  REORDER_WATCH_LIST,
  //dispatcher calls
  fetchWatchList,
  addToWatchList,
  removeFromWatchList,
  reorderWatchList
} from "./WatchList"
