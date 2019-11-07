// converts int into string with decimal
export default (price = 9999) => {
  let string = price.toString()
  return string.slice(0, -2) + '.' + string.slice(-2)
}
