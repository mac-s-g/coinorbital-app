export const CREATE_TRANSACTION_MODAL = "CREATE_TRANSACTION_MODAL"
export const ADD_TO_WATCHLIST_MODAL = "ADD_TO_WATCHLIST_MODAL"
export const COIN_INFO_MODAL = "COIN_INFO_MODAL"
export const CREATE_WALLET_MODAL = "CREATE_WALLET_MODAL"
export const EDIT_WALLET_MODAL = "EDIT_WALLET_MODAL"
export const DELETE_WALLET_MODAL = "DELETE_WALLET_MODAL"
export const CLOSE_ALL_MODALS = "CLOSE_ALL_MODALS"

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

export const editWalletModal = wallet => ({
  type: EDIT_WALLET_MODAL,
  payload: wallet
})

export const createTransactionModal = wallet => ({
  type: CREATE_TRANSACTION_MODAL,
  payload: wallet
})

export const deleteWalletModal = wallet_name => ({
  type: DELETE_WALLET_MODAL,
  payload: wallet_name
})

export const closeAllModals = () => ({
  type: CLOSE_ALL_MODALS
})
