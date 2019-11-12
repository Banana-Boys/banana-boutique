import React from 'react'

const EmailInfo = props => {
  const user = props.user
  return (
    <div>
      {user.name ? <p>Name: {user.name}</p> : null}
      <p>
        Email: {user.email} <em>(confirmation will be sent to this email)</em>
      </p>
      {user.phone ? <p>Phone: {user.phone}</p> : null}
    </div>
  )
}

export default EmailInfo
