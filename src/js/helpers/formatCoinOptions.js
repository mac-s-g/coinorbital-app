export default options =>
  Object.keys(options).map(key => ({
    key: options[key].symbol,
    value: options[key].symbol,
    text: options[key].name + " (" + options[key].symbol + ")"
  }))
