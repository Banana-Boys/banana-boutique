import React from 'react'
import {
  Table,
  Button,
  TableBody,
  Card,
  Image,
  Item,
  ItemMeta,
  Container
} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import priceConvert from '../../utilFrontEnd/priceConvert'

const OrderLineItem = props => {
  const product = props.order.product || {}
  return (
    <div>
      <Item.Group>
        <Item>
          <Item.Image
            id="productimageuserhome"
            size="tiny"
            src={product.imageUrl}
          />

          <Item.Content>
            <Item.Header className="productname" as="a">
              <Link to={`/products/${product.id}`}>{product.name} </Link>
            </Item.Header>
            <Item.Meta>
              Description: {product.description} <br />
            </Item.Meta>
            <Item.Extra>Qty: {props.order.quantity}</Item.Extra>
            <div id="linedetail">
              <Item.Description>
                ${priceConvert(product.price)}{' '}
              </Item.Description>
            </div>
          </Item.Content>
        </Item>
      </Item.Group>
    </div>
  )
}

export default OrderLineItem
