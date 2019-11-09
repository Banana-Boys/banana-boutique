import React from 'react'
import {Table, Button, TableBody, Card, Image} from 'semantic-ui-react'

const OrderLineItem = props => {
  const product = props.order.product || {}
  return (
    <Table>
      <Card>
        <Table.Header>
          <Table.HeaderCell singleLine>
            Product Name: {product.name}
            <Image src={product.imageUrl} />
          </Table.HeaderCell>
        </Table.Header>
        <TableBody>
          <Table.Row>
            <Table.Cell>Price: {product.price}</Table.Cell>
            <Table.Cell>Description: {product.description}</Table.Cell>
            <Table.Cell>Qty: {props.order.quantity}</Table.Cell>
          </Table.Row>
        </TableBody>
      </Card>
    </Table>
  )
}

export default OrderLineItem
