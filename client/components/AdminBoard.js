import React, {Component} from 'react'
import AllOrders from './AllOrders'
import AllUsers from './AllUsers'
import {fetchAllOrders} from '../store/orders'
import {fetchUsers} from '../store/user'
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
    const users = this.props.user || []
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
            users.map(user => <AllUsers key={user.id} user={user} />)
          )}
        </h5>
      </div>
    )
  }
}

const mapStateToProps = ({orders, user}) => ({
  orders,
  user
})

const mapDispatchToProps = {
  fetchAllOrders,
  fetchUsers
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AdminBoard)
)
