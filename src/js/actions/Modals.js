export const NEW_TRANSACTION_MODAL = "NEW_TRANSACTION_MODAL"
export const ADD_TO_WATCHLIST_MODAL = "ADD_TO_WATCHLIST_MODAL"
export const CLOSE_ALL_MODALS = "CLOSE_ALL_MODALS"

export const newTransactionModal = () => ({
  type: NEW_TRANSACTION_MODAL
})

export const addToWatchListModal = () => ({
  type: ADD_TO_WATCHLIST_MODAL
})

export const closeAllModals = () => ({
  type: CLOSE_ALL_MODALS
})
