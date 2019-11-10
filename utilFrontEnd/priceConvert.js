// converts int into string with decimal
export default (price = 9999) => {
  let string = price.toString()
  if (price < 100) {
    string = '0' + string
  }
  return string.slice(0, -2) + '.' + string.slice(-2)
}
