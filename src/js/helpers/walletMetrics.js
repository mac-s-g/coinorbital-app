const SENT = "sent"

export const calculateWalletQuantity = wallet =>
  wallet.transactions.reduce((acc, tx) => {
    acc += (tx.type === SENT ? -1 : 1) * tx.quantity
    return acc
  }, 0)

export const calculateWalletValue = (wallet, price_per_coin) =>
  calculateWalletQuantity(wallet) * price_per_coin

//aggregate total cost of original transactions
export const calculateWalletTotalTx = wallet =>
  wallet.transactions.reduce((acc, tx) => {
    if (!!tx.cost_per_coin_usd) {
      acc += (tx.type === SENT ? -1 : 1) * tx.quantity * tx.cost_per_coin_usd
    }
    return acc
  }, 0)
