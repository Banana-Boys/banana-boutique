import React, {Component} from 'react'
import AllOrders from './AllOrders'
import AllUsers from './AllUsers'
import {fetchAllOrders} from '../store/orders'
import {
  fetchUsers,
  removeUserFromBoard,
  promoteUserBoard,
  demoteUserBoard
} from '../store/users'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

export class AdminBoard extends Component {
  constructor() {
    super()
    this.state = {
      filter: 'all'
    }
    this.onFilter = this.onFilter.bind(this)
  }

  async componentDidMount() {
    await this.props.fetchAllOrders()
    await this.props.fetchUsers()
  }

  async onFilter(event) {
    event.persist()
    if (event.target.value === 'all') {
      await this.props.fetchAllOrders()
    } else {
      const query = {status: event.target.value}
      await this.props.fetchAllOrders(query)
    }
    this.setState({
      filter: event.target.value
    })
  }

  render() {
    const propsId = this.props.match.params.id
    const orders = this.props.orders || []
    const users = this.props.users || []
    return (
      <div id="admin-board">
        <div id="order-filters">
          <select onChange={this.onFilter}>
            <option value="all">All</option>
            <option value="created">Created</option>
            <option value="processing">Processing</option>
            <option value="cancelled">Cancelled</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <h5>
          All Orders:{' '}
          {orders.map(order => (
            <AllOrders key={order.id} propsId={propsId} order={order} />
          ))}
        </h5>

        <h5>
          All Users:{' '}
          {!users.length ? (
            <div>No users in database</div>
          ) : (
            users.map(user => (
              <AllUsers
                key={user.id}
                user={user}
                deleteUser={this.props.removeUserFromBoard}
                promote={this.props.promoteUserBoard}
                demote={this.props.demoteUserBoard}
              />
            ))
          )}
        </h5>
      </div>
    )
  }
}

const mapStateToProps = ({orders, user, users}) => ({
  orders,
  user,
  users
})

const mapDispatchToProps = {
  fetchAllOrders,
  removeUserFromBoard,
  fetchUsers,
  promoteUserBoard,
  demoteUserBoard
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AdminBoard)
)
