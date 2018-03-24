export const CREATE_TRANSACTION_MODAL = "CREATE_TRANSACTION_MODAL"
export const ADD_TO_WATCHLIST_MODAL = "ADD_TO_WATCHLIST_MODAL"
export const COIN_CHART_MODAL = "COIN_CHART_MODAL"
export const CREATE_WALLET_MODAL = "CREATE_WALLET_MODAL"
export const EDIT_WALLET_MODAL = "EDIT_WALLET_MODAL"
export const DELETE_WALLET_MODAL = "DELETE_WALLET_MODAL"
export const CLOSE_ALL_MODALS = "CLOSE_ALL_MODALS"
export const DELETE_TRANSACTION_MODAL = "DELETE_TRANSACTION_MODAL"
export const EDIT_TRANSACTION_MODAL = "EDIT_TRANSACTION_MODAL"
export const TRANSACTION_NOTE_MODAL = "TRANSACTION_NOTE_MODAL"
export const CONTACT_ME_MODAL = "CONTACT_ME_MODAL"
export const DONATE_MODAL = "DONATE_MODAL"
export const ROADMAP_MODAL = "ROADMAP_MODAL"

export const addToWatchListModal = () => ({
  type: ADD_TO_WATCHLIST_MODAL
})

export const coinChartModal = symbol => ({
  type: COIN_CHART_MODAL,
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

export const deleteTransactionModal = (wallet, transaction_id) => ({
  type: DELETE_TRANSACTION_MODAL,
  payload: {
    wallet,
    transaction_id
  }
})

export const editTransactionModal = (wallet, transaction_id) => ({
  type: EDIT_TRANSACTION_MODAL,
  payload: {
    wallet,
    transaction_id
  }
})

export const transactionNoteModal = (wallet, transaction_id) => ({
  type: TRANSACTION_NOTE_MODAL,
  payload: {
    wallet,
    transaction_id
  }
})

export const contactMeModal = () => ({
  type: CONTACT_ME_MODAL
})

export const donateModal = () => ({
  type: DONATE_MODAL
})

export const roadmapModal = () => ({
  type: ROADMAP_MODAL
})
