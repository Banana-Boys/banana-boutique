import React from 'react'
import {Table, Button, TableBody, Card, Image} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import priceConvert from '../../utilFrontEnd/priceConvert'

const OrderLineItem = props => {
  const product = props.order.product || {}
  return (
    <Table>
      <Link to={`/products/${product.id}`}>
        <Card>
          <Table.Header>
            <Table.HeaderCell singleLine>
              Product Name: {product.name}
              <Image src={product.imageUrl} />
            </Table.HeaderCell>
          </Table.Header>
          <TableBody>
            <Table.Row>
              <Table.Cell>Price: ${priceConvert(product.price)}</Table.Cell>
              <Table.Cell>Description: {product.description}</Table.Cell>
              <Table.Cell>Qty: {props.order.quantity}</Table.Cell>
            </Table.Row>
          </TableBody>
        </Card>
      </Link>
    </Table>
  )
}

export default OrderLineItem
