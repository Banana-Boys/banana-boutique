import React from 'react'
import {states, countries} from '../../../utilFrontEnd/address'

const AddressInput = props => {
  const newShippingAddress = props.newShippingAddress
  const handleChange = props.handleChange
  const userId = props.userId
  return (
    <div>
      {userId && (
        <input
          type="radio"
          name="shippingAddress"
          value="new"
          onChange={handleChange}
        />
      )}

      <div className="form-group">
        <label htmlFor="address1">Street Address:</label>
        <input type="text" name="address1" onChange={handleChange} />
        {newShippingAddress.address1.length > 0 ? null : (
          <div>Street address cannot be empty</div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="address2">Apartment/Unit:</label>
        <input type="text" name="address2" onChange={handleChange} />
      </div>

      <div className="form-group">
        <label htmlFor="city">City:</label>
        <input type="text" name="city" onChange={handleChange} />
        {newShippingAddress.city.length > 0 ? null : (
          <div>City cannot be empty</div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="state">State:</label>
        <select name="state" onChange={handleChange}>
          {states.map(state => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="country">Country:</label>
        <select name="country" onChange={handleChange}>
          {countries.map(country => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
        {newShippingAddress.country.length > 0 ? null : (
          <div>Please choose a country</div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="zip">Zip Code:</label>
        <input type="text" name="zip" onChange={handleChange} />
        {newShippingAddress.zip.length > 0 ? null : (
          <div>Zip code cannot be empty</div>
        )}
      </div>
    </div>
  )
}

export default AddressInput
