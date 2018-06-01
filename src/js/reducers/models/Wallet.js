import Transactions from "./Transactions"

export default class Wallet {
  constructor(input) {
    let error = ""
    try {
      if (
        typeof input.name === "string" &&
        typeof input.symbol == "string" &&
        Array.isArray(input.transactions)
      ) {
        return {
          name: input.name,
          symbol: input.symbol,
          transactions: new Transactions(input.transactions)
        }
      }
    } catch (error) {}
    throw `malformatted wallet:\n${JSON.stringify(input, null, 2)}\n${error}`
  }
}
