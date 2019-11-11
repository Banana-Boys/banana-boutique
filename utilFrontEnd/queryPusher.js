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
  // if (applyPriority) {
  //   if (minPriority) {
  //     queryPush.push(`minPriority=${minPriority}`);
  //   }
  //   if (maxPriority) {
  //     queryPush.push(`maxPriority=${maxPriority}`);
  //   }
  // }
  // if (applyRobots) {
  //   if (minRobots) {
  //     queryPush.push(`minRobots=${minRobots}`);
  //   }
  //   if (maxRobots) {
  //     queryPush.push(`maxRobots=${maxRobots}`);
  //   }
  // }
  // if (applyCompletionStatus) {
  //   queryPush.push(`completionStatus=${completionStatus}`);
  // }
  if (Number(numPerPage) !== 10) {
    queryPush.push(`numPerPage=${numPerPage}`)
  }
  // if (applySearch && searchQuery.length > 0) {
  //   queryPush.push(`searchQuery=${searchQuery}`);
  // }
  history.push({
    search: queryPush.length > 0 ? `?${queryPush.join('&')}` : '',
    hash: location.hash
  })
}
