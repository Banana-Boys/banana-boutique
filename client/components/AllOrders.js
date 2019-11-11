import React from 'react'
import {Link} from 'react-router-dom'
import OrderLineItem from './OrderLineItem'
import {Table, TableBody, Container} from 'semantic-ui-react'

const AllOrders = props => {
  const order = props.order || []
  const buyer = props.order.buyer || {}
  const handleStatusChange = props.handleStatusChange
  console.log(props)
  return (
    <Container>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell singleLine>
              Order Number : {order.id} <br /> Date Placed : {order.datePlaced}{' '}
              <br /> User Name: {buyer.name} <br /> User Email: {buyer.email}{' '}
              <br />
              Status:
              <select
                value={order.status}
                onChange={event => handleStatusChange(event, order.id)}
              >
                <option value="created">Created</option>
                <option value="processing">Processing</option>
                <option value="cancelled">Cancelled</option>
                <option value="completed">Completed</option>
              </select>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <TableBody>
          <Table.Row>
            <Table.Cell>
              {order.orderLineItems.map(ord => (
                <Link key={order.id} to={`/orders/${order.id}`}>
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
