export const NEW_TRANSACTION_MODAL = "NEW_TRANSACTION_MODAL"
export const ADD_TO_WATCHLIST_MODAL = "ADD_TO_WATCHLIST_MODAL"
export const COIN_INFO_MODAL = "COIN_INFO_MODAL"
export const CREATE_WALLET_MODAL = "CREATE_WALLET_MODAL"
export const CLOSE_ALL_MODALS = "CLOSE_ALL_MODALS"

export const newTransactionModal = () => ({
  type: NEW_TRANSACTION_MODAL
})

export const addToWatchListModal = () => ({
  type: ADD_TO_WATCHLIST_MODAL
})

export const coinInfoModal = symbol => ({
  type: COIN_INFO_MODAL,
  payload: symbol
})

export const createWalletModal = () => ({
  type: CREATE_WALLET_MODAL
})

export const closeAllModals = () => ({
  type: CLOSE_ALL_MODALS
})
