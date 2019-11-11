import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {Table, TableBody, Container} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {fetchOrder} from '../store/singleOrder'
import OrderLineItem from './OrderLineItem'

export class SingleOrder extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchOrder(this.props.match.params.id)
  }

  render() {
    const order = this.props.singleOrder || {}
    return (
      <Container>
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell singleLine>
                Order Number : {order.id} <br /> Date Placed :{' '}
                {order.datePlaced}
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
