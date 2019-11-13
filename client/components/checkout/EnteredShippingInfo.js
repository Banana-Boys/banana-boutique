import React from 'react'

import {Button, Header} from 'semantic-ui-react'
import '../../styles/checkout.scss'

const EnteredShippingInfo = props => {
  const enteredShippingInfo = props.shippingAddress
  return (
    <div id="entered-shipping-info">
      <div className="shippingitemsholder">
        <Header as="h4">Street Address: </Header>
        <div className="shippingitems">{enteredShippingInfo.address1}</div>
      </div>
      <br />
      <div className="shippingitemsholder">
        <Header as="h4">Apt/Unit: </Header>
        <div className="shippingitems">{enteredShippingInfo.address2}</div>
      </div>
      <br />
      <div className="shippingitemsholder">
        <Header as="h4">City: </Header>
        <div className="shippingitems">{enteredShippingInfo.city}</div>
      </div>
      <br />
      <div className="shippingitemsholder">
        <Header as="h4">State: </Header>
        <div className="shippingitems">{enteredShippingInfo.state}</div>
      </div>
      <br />
      <div className="shippingitemsholder">
        <Header as="h4">Country: </Header>
        <div className="shippingitems">{enteredShippingInfo.country}</div>
      </div>
      <br />
      <div className="shippingitemsholder">
        <Header as="h4">Zip: </Header>
        <div className="shippingitems">{enteredShippingInfo.zip}</div>
      </div>
    </div>
  )
}

export default EnteredShippingInfo
