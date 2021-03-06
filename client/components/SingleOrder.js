import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {Table, TableBody, Container} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {fetchOrder} from '../store/singleOrder'
import OrderLineItem from './OrderLineItem'
import priceConvert from '../../utilFrontEnd/priceConvert'
import dateFormat from '../../utilFrontEnd/dateformat'

export class SingleOrder extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    if (+this.props.singleOrder.id !== +this.props.match.params.id) {
      this.props.fetchOrder(this.props.match.params.id)
    }
  }

  render() {
    const order = this.props.singleOrder || {}
    const orderlineitems = this.props.singleOrder.orderLineItems || []
    let total = 0
    const ordertotal =
      orderlineitems.map(item => (total += item.product.price)) || []

    return (
      <Container id="singleorder">
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell singleLine>
                Order Number : {order.id} <br /> Date Placed :{' '}
                {dateFormat(order.datePlaced)} <br />
                Total: ${priceConvert(total)} <br />
                Status: {order.status}
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <TableBody>
            <Table.Row>
              <Table.Cell>
                {!order.orderLineItems ? (
                  <div>none</div>
                ) : (
                  <div>
                    {order.orderLineItems.map(ord => (
                      <OrderLineItem key={ord.id} order={ord} />
                    ))}
                  </div>
                )}
              </Table.Cell>
            </Table.Row>
          </TableBody>
        </Table>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  singleOrder: state.singleOrder
})

const mapDispatchToProps = {fetchOrder}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SingleOrder)
)
