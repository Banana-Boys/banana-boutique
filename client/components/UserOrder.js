import react from 'react'
import {connect} from 'react-redux'
import {createOrder} from '../store/orders'
import {Link, withRouter} from 'react-router-dom'

class UserOrder extends react.Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div>
        <div />
        {/* orderid ordername, product,  */}

        <div>test</div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  orders: state.orders
})

const mapDispatchToProps = {createOrder}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UserOrder)
)
