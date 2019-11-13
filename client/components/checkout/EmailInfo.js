import React from 'react'
import {Button, Header} from 'semantic-ui-react'

import '../../styles/checkout.scss'

const EmailInfo = props => {
  const user = props.user
  return (
    <div id="email-info">
      {user.name ? (
        <div className="shippingitemsholder">
          <Header as="h4">Name: </Header>
          <div className="shippingitems">{user.name}</div>
        </div>
      ) : null}
      <div className="shippingitemsholder">
        <Header as="h4">Email: </Header>
        <div className="shippingitems">
          {user.email} <em>(confirmation will be sent to this email)</em>
        </div>
      </div>

      {user.phone ? (
        <div className="shippingitemsholder">
          <Header as="h4">Phone: </Header>
          <div className="shippingitems">{user.phone}</div>
        </div>
      ) : null}
    </div>
  )
}

export default EmailInfo
