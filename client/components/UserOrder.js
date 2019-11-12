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

const UserOrder = props => {
  const order = props.order || {}
  return (
    <div className="userhomeorderholder">
      <Header as="a" singleLine>
        Order Number : {order.id} <br /> Date Placed : {order.datePlaced}
      </Header>
      <Container id="containuserhomeproduct">
        {order.orderLineItems.map(ord => (
          <Link key={ord.id} to={`/order/${ord.id}`}>
            <OrderLineItem order={ord} />
          </Link>
        ))}
      </Container>
    </div>
  )
}

export default UserOrder
