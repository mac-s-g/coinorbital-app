import Transaction from "./Transaction"

export default class Transactions {
  constructor(txs) {
    try {
      return txs.reduce((acc, tx) => {
        try {
          tx = new Transaction(tx)
          return [...acc, tx]
        } catch (e) {
          console.error(e)
          return acc
        }
      }, [])
    } catch (e) {
      console.error(
        `malformatted transactions:\n${JSON.stringify(txs, null, 2)}\n`,
        e
      )
      return []
    }
  }
}
