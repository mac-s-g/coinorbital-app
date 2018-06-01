export default class Coin {
  constructor(input) {
    let error = ""
    try {
      return {
        ...input,
        ...input.quotes.USD,
        name: input.name,
        symbol: input.symbol,
        price_usd: input.quotes.USD.price
      }
    } catch (error) {}
    throw `malformatted coin:\n${JSON.stringify(input, null, 2)}\n${error}`
  }
}
