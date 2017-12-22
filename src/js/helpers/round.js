// example helper function
export default (number, precision) => {
  if (precision === undefined) {
    precision = 0
  }
  precision = Math.pow(10, precision - 1)
  return Math.round(number * 10 * precision) / (10 * precision)
}
