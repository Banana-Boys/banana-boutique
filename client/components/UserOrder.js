import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {createOrder} from '../store/orders'
import {Table, Button, TableBody, Card, Container} from 'semantic-ui-react'
import OrderLineItem from './OrderLineItem'

const UserOrder = props => {
  const order = props.order || {}
  return (
    <Container>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell singleLine>
              Order Number : {order.id} <br /> Date Placed : {order.datePlaced}
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <TableBody>
          <Table.Row>
            <Table.Cell>
              {order.orderLineItems.map(ord => (
                <Link key={ord.id} to={`/order/${ord.id}`}>
                  <OrderLineItem order={ord} />
                </Link>
              ))}
            </Table.Cell>
          </Table.Row>
        </TableBody>
      </Table>
    </Container>
  )
}

export default UserOrder
