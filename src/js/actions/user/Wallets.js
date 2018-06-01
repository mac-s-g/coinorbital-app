import Cabinet from "cabinet-storage"

import auth from "./../../auth/Auth"
import axiosInstance from "./axiosInstance"

import { api, local_user } from "./../../constants"
import { default_wallets } from "./fixtures/wallets"

const WALLET_BY_NAME_KEY = "wallet.by_name"

export const REQUEST_CREATE_WALLET = "REQUEST_CREATE_WALLET"
export const CREATE_WALLET = "CREATE_WALLET"
export const CREATE_WALLET_ERROR = "CREATE_WALLET_ERROR"
export const REQUEST_WALLETS = "REQUEST_WALLETS"
export const RECEIVE_WALLETS = "RECEIVE_WALLETS"
export const RECEIVE_WALLETS_ERROR = "RECEIVE_WALLETS_ERROR"
export const REQUEST_DELETE_WALLET = "REQUEST_DELETE_WALLET"
export const DELETE_WALLET = "DELETE_WALLET"
export const DELETE_WALLET_ERROR = "DELETE_WALLET_ERROR"
export const REQUEST_EDIT_WALLET = "REQUEST_EDIT_WALLET"
export const EDIT_WALLET = "EDIT_WALLET"
export const EDIT_WALLET_ERROR = "EDIT_WALLET_ERROR"

const wallet_name_key = `${WALLET_BY_NAME_KEY}.${local_user}`

const requestWallets = () => ({ type: REQUEST_WALLETS })
const receiveWallets = payload => ({ type: RECEIVE_WALLETS, payload })
const receiveWalletsError = payload => ({
  type: RECEIVE_WALLETS_ERROR,
  payload
})

export const fetchWallets = () => dispatch => {
  if (auth.isAuthenticated()) {
    dispatch(requestWallets())
    axiosInstance()
      .get(api.paths.investment)
      .then(response => dispatch(receiveWallets(response.data)))
      .catch(error => dispatch(receiveWalletsError(error)))
  } else {
    dispatch(receiveWallets(Cabinet.get(wallet_name_key, default_wallets)))
  }
}

const createWalletRequest = payload => ({
  type: REQUEST_CREATE_WALLET,
  payload
})
const createWalletSuccess = payload => ({ type: CREATE_WALLET, payload })
const createWalletError = payload => ({
  type: CREATE_WALLET_ERROR,
  payload
})

export const createWallet = wallet => dispatch => {
  if (auth.isAuthenticated()) {
    dispatch(createWalletRequest({ [wallet.name]: wallet }))
    axiosInstance()
      .post(`${api.paths.investment}${wallet.name}`, { investment: wallet })
      .then(response =>
        dispatch(createWalletSuccess({ [wallet.name]: wallet }))
      )
      .catch(error => dispatch(createWalletError(error)))
  } else {
    dispatch(
      createWalletSuccess(
        Cabinet.set(
          wallet_name_key,
          Object.assign(Cabinet.get(wallet_name_key, {}), {
            [wallet.name]: wallet
          })
        )
      )
    )
  }
  return true
}

const deleteWalletRequest = payload => ({
  type: REQUEST_DELETE_WALLET,
  payload
})
const deleteWalletSuccess = payload => ({ type: DELETE_WALLET, payload })
const deleteWalletError = payload => ({
  type: DELETE_WALLET_ERROR,
  payload
})

export const deleteWallet = wallet_name => dispatch => {
  if (auth.isAuthenticated()) {
    dispatch(deleteWalletRequest(wallet_name))
    axiosInstance()
      .delete(`${api.paths.investment}${wallet_name}`)
      .then(response =>
        dispatch(deleteWalletSuccess(response.data.investments))
      )
      .catch(error => dispatch(deleteWalletError(error)))
  } else {
    const wallets = Cabinet.get(wallet_name_key, {})
    delete wallets[wallet_name]
    dispatch({
      type: DELETE_WALLET,
      payload: Cabinet.set(wallet_name_key, wallets)
    })
  }
  return true
}

const editWalletRequest = payload => ({ type: REQUEST_EDIT_WALLET, payload })
const editWalletSuccess = payload => ({ type: EDIT_WALLET, payload })
const editWalletError = payload => ({
  type: EDIT_WALLET_ERROR,
  payload
})

export const editWallet = (original_name, revised_wallet) => dispatch => {
  if (auth.isAuthenticated()) {
    dispatch(editWalletRequest({ original_name, revised_wallet }))
    axiosInstance()
      .post(`${api.paths.investment}${original_name}`, {
        investment: revised_wallet
      })
      .then(response => dispatch(editWalletSuccess(response.data.investments)))
      .catch(error => dispatch(editWalletError(error)))
  } else {
    const existing_wallets = Cabinet.get(wallet_name_key, {})
    dispatch({
      type: EDIT_WALLET,
      payload: Cabinet.set(
        wallet_name_key,
        Object.keys(existing_wallets).reduce((acc, wallet_name) => {
          if (wallet_name === original_name) {
            acc[revised_wallet.name] = {
              ...existing_wallets[wallet_name],
              ...revised_wallet
            }
          } else {
            acc[wallet_name] = existing_wallets[wallet_name]
          }
          return acc
        }, {})
      )
    })
  }
  return true
}
