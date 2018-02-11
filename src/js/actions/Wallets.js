import Cabinet from "cabinet-storage"

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

export const fetchWallets = () => ({
  type: RECEIVE_WALLETS,
  payload: Cabinet.get(WALLET_BY_NAME_KEY, default_wallets)
})

export const createWallet = wallet => ({
  type: CREATE_WALLET,
  payload: Cabinet.set(
    WALLET_BY_NAME_KEY,
    Object.assign(Cabinet.get(WALLET_BY_NAME_KEY, {}), {
      [wallet.name]: wallet
    })
  )
})

export const deleteWallet = wallet_name => {
  const wallets = Cabinet.get(WALLET_BY_NAME_KEY, {})
  delete wallets[wallet_name]
  return {
    type: DELETE_WALLET,
    payload: Cabinet.set(WALLET_BY_NAME_KEY, wallets)
  }
}

export const editWallet = (original_name, revised_wallet) => {
  const existing_wallets = Cabinet.get(WALLET_BY_NAME_KEY, {})
  return {
    type: EDIT_WALLET,
    payload: Cabinet.set(
      WALLET_BY_NAME_KEY,
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
  }
}
