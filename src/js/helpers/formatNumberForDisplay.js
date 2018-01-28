export default number =>
  Intl.NumberFormat("en-US", {
    maximumFractionDigits: 9
  }).format(number)
