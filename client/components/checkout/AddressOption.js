import React from 'react'

const AddressOption = props => {
  const {id, address1, address2, city, state, country, zip} = props.address
  return (
    <div className="addressOption">
      <input
        type="radio"
        name="shippingAddress"
        value={id}
        onChange={props.handleChange}
      />
      <div>
        <div>{address1}</div>
        {address2 ? <div>{address2}</div> : null}
        <div>
          <span>{city}</span>, {state ? <span>{state},</span> : null}{' '}
          <span>{country}</span> <span>{zip}</span>
        </div>
      </div>
    </div>
  )
}

export default AddressOption
