import Wallet from "./Wallet"

export default class Wallets {
  constructor(input) {
    try {
      return Object.keys(input).reduce((acc, wallet_name) => {
        let wallet
        try {
          const wallet = new Wallet(input[wallet_name])
          return { ...acc, [wallet_name]: wallet }
        } catch (e) {
          console.error(e)
          return acc
        }
      }, {})
    } catch (e) {
      console.error(
        `malformatted wallets:\n${JSON.stringify(input, null, 2)}\n`,
        e
      )
      return {}
    }
  }
}
