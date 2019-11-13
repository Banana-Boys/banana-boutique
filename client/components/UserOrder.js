import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {createOrder} from '../store/orders'
import {
  Table,
  Button,
  TableBody,
  Card,
  Container,
  Item,
  Header
} from 'semantic-ui-react'
import OrderLineItem from './OrderLineItem'
import priceConvert from '../../utilFrontEnd/priceConvert'
import dateFormat from '../../utilFrontEnd/dateformat'

const UserOrder = props => {
  const order = props.order || {}
  let total = 0
  const ordertotal =
    order.orderLineItems.map(item => (total += item.product.price)) || []
  return (
    <div className="userhomeorderholder">
      <Link to={`/orders/${order.id}`}>
        <Header as="a" singleLine>
          Order Number : {order.id} <br /> Date Placed :{' '}
          {dateFormat(order.datePlaced)} <br />
          Order Total: ${priceConvert(total)} <br /> Status: {order.status}
        </Header>
      </Link>
      <Container id="containuserhomeproduct">
        {order.orderLineItems.map(ord => (
          <OrderLineItem key={order.id} order={ord} />
        ))}
      </Container>
    </div>
  )
}

export default UserOrder
