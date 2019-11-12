/* eslint-disable complexity */
import React from 'react'
import {connect} from 'react-redux'
import {createAddress} from '../store/addresses'
import {states, countries} from '../../utilFrontEnd/address'
import {Input, Button, Form, Item, Grid} from 'semantic-ui-react'

class NewAddressForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      address1: '',
      address2: '',
      city: '',
      state: '',
      country: '',
      zip: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.createAddress(this.state, this.props.user.id, this.props.history)
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} id="new-edit-x-form">
        <div className="form-group">
          <label htmlFor="address1">Street Address:</label>
          <input
            type="text"
            name="address1"
            onChange={this.handleChange}
            required
          />
          {/* {this.state.address1.length > 0 ? null : (
            <div>Street address cannot be empty</div>
          )} */}
        </div>

        <div className="form-group">
          <label htmlFor="address2">Apartment/Unit:</label>
          <input type="text" name="address2" onChange={this.handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="city">City:</label>
          <input
            type="text"
            name="city"
            onChange={this.handleChange}
            required
          />
          {/* {this.state.city.length > 0 ? null : <div>City cannot be empty</div>} */}
        </div>

        <div className="form-group">
          <label htmlFor="state">State:</label>
          <select name="state" onChange={this.handleChange} required>
            {states.map(state => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="country">Country:</label>
          <select name="country" onChange={this.handleChange} required>
            {countries.map(country => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
          {/* {this.state.country.length > 0 ? null : (
            <div>Please choose a country</div>
          )} */}
        </div>

        <div className="form-group">
          <label htmlFor="zip">Zip Code:</label>
          <input type="text" name="zip" onChange={this.handleChange} required />
          {/* {this.state.zip.length > 0 ? null : (
            <div>Zip code cannot be empty</div>
          )} */}
        </div>

        <div className="form-group">
          <Button
            size="mini"
            type="submit"
            color="blue"
            disabled={
              !this.state.address1.length ||
              !this.state.city.length ||
              !this.state.country.length ||
              !this.state.zip.toString().length
            }
          >
            Submit
          </Button>
        </div>
      </form>
    )
  }
}

const mapStateToProps = ({user}) => ({user})
const mapDispatchToProps = {createAddress}

export default connect(mapStateToProps, mapDispatchToProps)(NewAddressForm)
