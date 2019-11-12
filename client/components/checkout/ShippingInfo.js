/* eslint-disable complexity */
import React from 'react'

import AddressOption from './AddressOption'
import AddressInput from './AddressInput'

const ShippingInfo = props => {
  const {
    handleChange,
    handleSubmit,
    shippingAddress,
    addresses,
    user,
    newShippingAddress
  } = props
  return (
    <div>
      {typeof shippingAddress !== 'object' ? (
        user.id ? (
          // address display for each form
          <form id="shippingAddressForm" onSubmit={handleSubmit}>
            {' '}
            {addresses.map(address => {
              return (
                <AddressOption
                  key={address.id}
                  address={address}
                  handleChange={handleChange}
                />
              )
            })}
            <AddressInput
              newShippingAddress={newShippingAddress}
              handleChange={handleChange}
              userId={user.id}
            />
            <button
              type="submit"
              disabled={
                !shippingAddress.length ||
                (shippingAddress === 'new' &&
                  (!newShippingAddress.address1.length ||
                    !newShippingAddress.city.length ||
                    !newShippingAddress.country.length ||
                    !newShippingAddress.zip.length))
              }
            >
              Submit
            </button>
          </form>
        ) : (
          <form id="shippingAddressForm" onSubmit={handleSubmit}>
            <AddressInput
              newShippingAddress={newShippingAddress}
              handleChange={handleChange}
              userId={user.id}
            />
            <button
              type="submit"
              disabled={
                !newShippingAddress.address1.length ||
                !newShippingAddress.city.length ||
                !newShippingAddress.country.length ||
                !newShippingAddress.zip.length
              }
            >
              Submit
            </button>
          </form>
        )
      ) : (
        <div>
          <div>Shipping Address:</div>
          <p>{shippingAddress.address1}</p>
          {shippingAddress.address2 ? <p>{shippingAddress.address2}</p> : null}
          <p>
            <span>{shippingAddress.city}</span>,{' '}
            {shippingAddress.state ? (
              <span>{shippingAddress.state},</span>
            ) : null}{' '}
            <span>{shippingAddress.country}</span>{' '}
            <span>{shippingAddress.zip}</span>
          </p>
        </div>
      )}
    </div>
  )
}

export default ShippingInfo
