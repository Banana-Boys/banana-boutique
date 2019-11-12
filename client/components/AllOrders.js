import React from 'react'
import {Link} from 'react-router-dom'
import OrderLineItem from './OrderLineItem'
import {Table, TableBody, Container} from 'semantic-ui-react'
import priceConvert from '../../utilFrontEnd/priceConvert'

const AllOrders = props => {
  const order = props.order || []
  const buyer = props.order.buyer || {}
  const handleStatusChange = props.handleStatusChange
  let total = 0
  const ordertotal = props.order.orderLineItems.map(
    item => (total += item.product.price)
  )
  return (
    <Container>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell singleLine>
              <Link to={`/orders/${order.id}`}>
                <div id="singleproductgateway">
                  Order Number : {order.id} <br /> Date Placed :{' '}
                  {order.datePlaced} <br /> User Name: {buyer.name} <br /> User
                  Email: {buyer.email} <br />
                  Order Total: ${priceConvert(total)}
                </div>
              </Link>
              Status:
              <select
                id="orderstatus"
                name="orderstatus"
                value={order.status}
                onChange={event => handleStatusChange(event, order.id)}
              >
                <option value="created">Created</option>
                <option value="processing">Processing</option>
                <option value="cancelled">Cancelled</option>
                <option value="completed">Completed</option>
              </select>
              <br />
              Order Total: ${priceConvert(total)}
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <TableBody>
          <Table.Row>
            <Table.Cell>
              {order.orderLineItems.map(ord => (
                <OrderLineItem key={order.id} order={ord} />
              ))}
            </Table.Cell>
          </Table.Row>
        </TableBody>
      </Table>
    </Container>
  )
}

export default AllOrders
