import Cabinet from "cabinet-storage"

const WALLET_BY_NAME_KEY = "wallet.by_name"

export const CREATE_WALLET = "CREATE_WALLET"
export const RECEIVE_WALLETS = "RECEIVE_WALLETS"

export const fetchWallets = () => ({
  type: RECEIVE_WALLETS,
  payload: Cabinet.get(WALLET_BY_NAME_KEY, {})
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
