/* eslint-disable complexity */
export const queryPusher = (state, props) => {
  const {location, history} = props
  const {categories, search, inStock, sort, numPerPage} = state
  let queryPush = []
  if (categories.length) {
    queryPush.push(`categories=${categories.join('+')}`)
  }
  if (search.length) {
    queryPush.push(`search=${search}`)
  }
  if (inStock) {
    queryPush.push(`inStock=true`)
  }
  if (sort.length) {
    queryPush.push(`sort=${sort}`)
  }
  if (Number(numPerPage) !== 10) {
    queryPush.push(`numPerPage=${numPerPage}`)
  }
  history.push({
    search: queryPush.length > 0 ? `?${queryPush.join('&')}` : '',
    hash: location.hash
  })
}
