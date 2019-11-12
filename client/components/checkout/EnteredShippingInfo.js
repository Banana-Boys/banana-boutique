import React from 'react'

import '../../styles/checkout.scss'

const EnteredShippingInfo = props => {
  const enteredShippingInfo = props.shippingAddress
  console.log('test:', enteredShippingInfo)
  return (
    <div id="entered-shipping-info">
      <div>Street Address: {enteredShippingInfo.address1}</div>
      <div>Apt/Unit: {enteredShippingInfo.address2}</div>
      <div>City: {enteredShippingInfo.city}</div>
      <div> State: {enteredShippingInfo.state}</div>
      <div>Country: {enteredShippingInfo.country}</div>
      <div>Zip: {enteredShippingInfo.zip}</div>
    </div>
  )
}

export default EnteredShippingInfo
