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
      value = Number(e.target.value) * 100
    } else {
      value = e.target.value
    }
    this.setState({[e.target.name]: value})
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.createProduct(this.state, this.props.history)
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} id="new-product-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" name="name" onChange={this.handleChange} />
          {this.state.name.length > 0 ? null : (
            <div color="red">Name cannot be empty</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea name="description" onChange={this.handleChange} />
          {this.state.description.length > 0 ? null : (
            <div>Description cannot be empty</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            name="price"
            min="0"
            step="0.01"
            onChange={this.handleChange}
          />
          {this.state.price > 0 ? null : <div>Price cannot be empty</div>}
        </div>

        <div className="form-group">
          <label htmlFor="inventory">Inventory:</label>
          <input
            type="number"
            name="inventory"
            min="0"
            step="1"
            onChange={this.handleChange}
          />
          {this.state.inventory.length > 0 ? null : (
            <div>Inventory cannot be empty</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="categories">Categories:</label>
          <select multiple name="categories" onChange={this.handleChange}>
            {this.props.categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          {this.state.categories.length > 0 ? null : (
            <div>At least 1 category must be selected</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="imageUrl">Image URL:</label>
          <input
            type="url"
            name="imageUrl"
            onChange={this.handleChange}
            placeholder=""
          />
        </div>

        {this.state.inventory.length > 0 &&
        this.state.name.length > 0 &&
        this.state.description.length > 0 &&
        this.state.categories.length > 0 &&
        this.state.price > 0 ? (
          <div className="form-group">
            <Button size="mini" type="submit" color="blue">
              Submit
            </Button>
          </div>
        ) : (
          <div>Check all required fields</div>
        )}
      </form>
    )
  }
}

const mapStateToProps = ({categories}) => ({categories})
const mapDispatchToProps = {createProduct}

export default connect(mapStateToProps, mapDispatchToProps)(NewProductForm)
