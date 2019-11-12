/* eslint-disable complexity */
import React from 'react'
import {connect} from 'react-redux'
import {createProduct} from '../store/singleProduct'
import {Input, Button, Form, Item, Grid} from 'semantic-ui-react'

class NewProductForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      description: '',
      imageUrl: '',
      price: '',
      inventory: '',
      categories: [],
      inputError: 0
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    let value
    if (e.target.type === 'select-multiple') {
      value = [...e.target.options]
        .filter(option => option.selected)
        .map(option => option.value)
    } else if (e.target.name === 'price') {
      value = Math.floor(Number(e.target.value) * 100)
    } else {
      value = e.target.value
    }
    this.setState({[e.target.name]: value})
  }

  handleSubmit(e) {
    e.preventDefault()
    let state = {}
    for (let key of Object.keys(this.state)) {
      if (this.state[key].toString().length) {
        state[key] = this.state[key]
      }
    }
    this.props.createProduct(state, this.props.history)
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} id="new-edit-x-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            onChange={this.handleChange}
            required
          />
          {/* {this.state.name.length > 0 ? null : (
            <div className="required-field-message">Name cannot be empty</div>
          )} */}
        </div>

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea name="description" onChange={this.handleChange} required />
          {/* {this.state.description.length > 0 ? null : (
            <div className="required-field-message">
              Description cannot be empty
            </div>
          )} */}
        </div>

        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            name="price"
            min="0"
            step="0.01"
            onChange={this.handleChange}
            required
          />
          {/* {this.state.price.toString().length > 0 ? null : (
            <div className="required-field-message">Price cannot be empty</div>
          )} */}
        </div>

        <div className="form-group">
          <label htmlFor="inventory">Inventory:</label>
          <input
            type="number"
            name="inventory"
            min="0"
            step="1"
            onChange={this.handleChange}
            required
          />
          {/* {this.state.inventory.length > 0 ? null : (
            <div className="required-field-message">
              Inventory cannot be empty
            </div>
          )} */}
        </div>

        <div className="form-group">
          <label htmlFor="categories">Categories:</label>
          <select
            multiple
            name="categories"
            onChange={this.handleChange}
            required
          >
            {this.props.categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          {/* {this.state.categories.length > 0 ? null : (
            <div className="required-field-message">
              At least 1 category must be selected
            </div>
          )} */}
        </div>

        <div className="form-group">
          <Button
            size="mini"
            type="submit"
            color="blue"
            disabled={
              !this.state.name.length ||
              !this.state.price.toString().length ||
              !this.state.inventory.toString().length ||
              !this.state.categories.length ||
              !this.state.description.length
            }
          >
            Submit
          </Button>
        </div>
      </form>
    )
  }
}

const mapStateToProps = ({categories}) => ({categories})
const mapDispatchToProps = {createProduct}

export default connect(mapStateToProps, mapDispatchToProps)(NewProductForm)
