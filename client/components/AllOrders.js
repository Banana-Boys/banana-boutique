import React from 'react'
import {Link} from 'react-router-dom'
import OrderLineItem from './OrderLineItem'
import {Table, TableBody, Container} from 'semantic-ui-react'

const AllOrders = props => {
  const order = props.order || []
  const buyer = props.order.buyer || {}
  return (
    <Container>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell singleLine>
              Order Number : {order.id} <br /> Date Placed : {order.datePlaced}{' '}
              <br /> User Name: {buyer.name} <br /> User Email: {buyer.email}
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

export default AllOrders
