import React from 'react'
import {connect} from 'react-redux'
import {fetchAddress, editAddress} from '../store/address'
import {states, countries} from '../../utilFrontEnd/address'

class EditAddressForm extends React.Component {
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

  componentDidMount() {
    this.props.fetchAddress(this.props.match.params.id)
  }

  componentWillReceiveProps(newProps) {
    const newState = {}
    for (let key in newProps.address) {
      if (key !== 'id') {
        newState[key] = newProps.address[key]
      }
    }
    this.setState(newState)
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.editAddress(
      this.props.address.id,
      this.state,
      this.props.user.id,
      this.props.history
    )
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="address1">Street Address:</label>
          <input
            type="text"
            name="address1"
            value={this.state.address1}
            onChange={this.handleChange}
          />
          {this.state.address1.length > 0 ? null : (
            <div>Street address cannot be empty</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="address2">Apartment/Unit:</label>
          <input
            type="text"
            name="address2"
            value={this.state.address2}
            onChange={this.handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="city">City:</label>
          <input
            type="text"
            name="city"
            value={this.state.city}
            onChange={this.handleChange}
          />
          {this.state.city.length > 0 ? null : <div>City cannot be empty</div>}
        </div>

        <div className="form-group">
          <label htmlFor="state">State:</label>
          <select name="state" onChange={this.handleChange}>
            {states.map(state => (
              <option
                key={state}
                value={state}
                selected={this.state.state === state}
              >
                {state}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="country">Country:</label>
          <select name="country" onChange={this.handleChange}>
            {countries.map(country => (
              <option
                key={country}
                value={country}
                selected={this.state.country === country}
              >
                {country}
              </option>
            ))}
          </select>
          {this.state.country.length > 0 ? null : (
            <div>Please choose a country</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="zip">Zip Code:</label>
          <input
            type="text"
            name="zip"
            value={this.state.zip}
            onChange={this.handleChange}
          />
          {this.state.zip.length > 0 ? null : (
            <div>Zip code cannot be empty</div>
          )}
        </div>

        <div className="form-group">
          <button
            type="submit"
            disabled={
              !this.state.address1.length ||
              !this.state.city.length ||
              !this.state.country.length ||
              !this.state.zip.length
            }
          >
            Submit
          </button>
        </div>
      </form>
    )
  }
}

const mapStateToProps = ({user, address}) => ({user, address})
const mapDispatchToProps = {editAddress, fetchAddress}

export default connect(mapStateToProps, mapDispatchToProps)(EditAddressForm)
