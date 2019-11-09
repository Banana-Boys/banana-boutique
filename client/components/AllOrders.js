import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link, withRouter} from 'react-router-dom'
import {fetchAllOrders} from '../store/orders'

export class AllOrders extends Component {
  constructor() {
    super()
  }

  async componentDidMount() {
    await this.props.fetchAllOrders(this.props.propsId)
  }

  render() {
    const orders = this.props.orders || []
    return <div>{orders.map(order => {})}</div>
  }
}

const mapStateToProps = state => ({
  orders: state.orders
})

const mapDispatchToProps = {fetchAllOrders}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AllOrders)
)

//export default AllOrders
