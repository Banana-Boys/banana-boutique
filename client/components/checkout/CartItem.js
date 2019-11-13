import React from 'react'
import priceConvert from '../../../utilFrontEnd/priceConvert'
import {Link} from 'react-router-dom'
import {Button, Header, Container, Image, Item} from 'semantic-ui-react'

const CartItem = props => {
  const item = props.item
  console.log('item', item)
  return (
    <Container className="product" key={item.product.id}>
      <Item.Group>
        <Item>
          <Link to={`/products/${item.product.id}`}>
            <Image size="small" src={item.product.imageUrl} />
          </Link>
          <Item.Content>
            <div className="productinfo">
              <Item.Header as="h4">
                {' '}
                Product Name: {item.product.name}
              </Item.Header>

              <Item.Description>
                Price: ${priceConvert(item.product.price)}
              </Item.Description>
              <Item.Description>Qty: {item.quantity}</Item.Description>
              <Item.Meta className="checkoutitemmeta">
                {' '}
                <Link to={`/products/${item.product.id}`}>
                  {item.product.name}
                </Link>{' '}
                - <em>quantity:</em> {item.quantity} - <em>price:</em> ${priceConvert(
                  item.product.price
                )}{' '}
                x {item.quantity} = ${priceConvert(
                  item.product.price * item.quantity
                )}
              </Item.Meta>
            </div>
          </Item.Content>
        </Item>
      </Item.Group>
    </Container>
  )
}

export default CartItem
