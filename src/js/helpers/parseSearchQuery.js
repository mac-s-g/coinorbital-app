export default search =>
  decodeURIComponent(search)
    .substring(1)
    .split("&")
    .filter(val => val.trim())
    .reduce(
      (accumulator, filter) => ({
        ...accumulator,
        [filter.split("=")[0]]: filter.split("=")[1]
      }),
      {}
    )
