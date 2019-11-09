import React, {Component} from 'react'
import AllOrders from './AllOrders'
import AllUsers from './AllUsers'
import {fetchAllOrders} from '../store/orders'
import {fetchUsers, removeUserFromBoard} from '../store/users'
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
    console.log('users', this.props)
    return (
      <div>
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
  fetchUsers
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AdminBoard)
)
