// options: object containing coins indexed by symbol
// blacklist: list of coin symbols to exclude
export default (options = {}, blacklist = []) => {
  let blackmap = blacklist.reduce(
    (acc, symbol) => ({
      ...acc,
      [symbol]: true
    }),
    {}
  )

  return Object.keys(options).reduce((acc, key) => {
    if (!blackmap[key]) {
      acc.push({
        key: options[key].symbol,
        value: options[key].symbol,
        text: options[key].name + " (" + options[key].symbol + ")"
      })
    }
    return acc
  }, [])
}
