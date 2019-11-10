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
  }

  async componentDidMount() {
    await this.props.fetchAllOrders(this.props.propsId)
    await this.props.fetchUsers()
  }

  render() {
    const propsId = this.props.match.params.id
    const orders = this.props.orders || []
    const users = this.props.users || []
    return (
      <div id="admin-board">
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
