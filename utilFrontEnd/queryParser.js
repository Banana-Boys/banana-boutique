export const queryParser = encodedQuery => {
  const queryArr = encodedQuery.slice(1).split(/\=|\&/)
  const query = {}
  while (Object.keys(queryArr).length > 0) {
    const key = queryArr.shift()
    let value = queryArr.shift()
    if (value && value.includes('+')) {
      value = value.split(/\+/)
    }
    query[key] = value
  }
  return query
}
