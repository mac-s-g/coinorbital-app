import Cabinet from "cabinet-storage"

import auth from "./../../auth/Auth"

const WALLET_BY_NAME_KEY = "wallet.by_name"

export const CREATE_WALLET = "CREATE_WALLET"
export const RECEIVE_WALLETS = "RECEIVE_WALLETS"
export const DELETE_WALLET = "DELETE_WALLET"
export const EDIT_WALLET = "EDIT_WALLET"

const default_wallets = {
  Bitcoin: {
    name: "Bitcoin",
    symbol: "BTC",
    transactions: []
  },
  Ethereum: {
    name: "Ethereum",
    symbol: "ETH",
    transactions: []
  },
  Litecoin: {
    name: "Litecoin",
    symbol: "LTC",
    transactions: []
  }
}

const walletNameKey = user_id => `${WALLET_BY_NAME_KEY}.${user_id}`

export const fetchWallets = () => dispatch =>
  auth.getUserId().then(user_id =>
    dispatch({
      type: RECEIVE_WALLETS,
      payload: Cabinet.get(walletNameKey(user_id), default_wallets)
    })
  )

export const createWallet = wallet => dispatch =>
  auth.getUserId().then(user_id =>
    dispatch({
      type: CREATE_WALLET,
      payload: Cabinet.set(
        walletNameKey(user_id),
        Object.assign(Cabinet.get(walletNameKey(user_id), {}), {
          [wallet.name]: wallet
        })
      )
    })
  )

export const deleteWallet = wallet_name => dispatch =>
  auth.getUserId().then(user_id => {
    const wallets = Cabinet.get(walletNameKey(user_id), {})
    delete wallets[wallet_name]
    dispatch({
      type: DELETE_WALLET,
      payload: Cabinet.set(walletNameKey(user_id), wallets)
    })
  })

export const editWallet = (original_name, revised_wallet) => {
  return dispatch =>
    auth.getUserId().then(user_id => {
      const existing_wallets = Cabinet.get(walletNameKey(user_id), {})
      dispatch({
        type: EDIT_WALLET,
        payload: Cabinet.set(
          walletNameKey(user_id),
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
    })
}
