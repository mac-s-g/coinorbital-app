export default coin_list =>
  coin_list.reduce(
    (accumulator, coin) => ({
      ...accumulator,
      [coin.symbol]: { ...coin }
    }),
    {}
  )
