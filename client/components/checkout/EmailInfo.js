import React from 'react'

import '../../styles/checkout.scss'

const EmailInfo = props => {
  const user = props.user
  return (
    <div id="email-info">
      {user.name ? <p>Name: {user.name}</p> : null}
      <p>
        Email: {user.email} <em>(confirmation will be sent to this email)</em>
      </p>
      {user.phone ? <p>Phone: {user.phone}</p> : null}
    </div>
  )
}

export default EmailInfo
