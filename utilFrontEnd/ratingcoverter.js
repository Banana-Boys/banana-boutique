export default rating => {
  const array = []
  for (let i = 0; i <= rating - 1; i++) {
    array.push(i)
  }
  return array
}
