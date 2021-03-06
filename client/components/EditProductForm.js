import React from 'react'
import {connect} from 'react-redux'
import {editProduct, fetchProduct} from '../store/singleProduct'
import {
  Input,
  Button,
  Form,
  Item,
  Grid,
  Container,
  Select
} from 'semantic-ui-react'

class EditProductForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      description: '',
      imageUrl: '',
      price: '',
      inventory: '',
      categories: []
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.props.fetchProduct(this.props.match.params.id)
  }

  componentWillReceiveProps(newProps) {
    let {
      name,
      description,
      imageUrl,
      price,
      inventory,
      categories
    } = newProps.singleProduct
    if (price) {
      price = (Number(price) / 100).toString()
    }
    if (inventory) {
      inventory = inventory.toString()
    }
    const newState = {
      name,
      description,
      imageUrl,
      price,
      inventory,
      categories: categories.map(category => category.id)
    }
    this.setState(newState)
  }

  handleChange(e) {
    let value
    if (e.target.type === 'select-multiple') {
      value = [...e.target.options]
        .filter(option => option.selected)
        .map(option => option.value)
    } else if (e.target.name === 'price') {
      value = Math.floor(e.target.value)
    } else {
      value = e.target.value
    }
    this.setState({[e.target.name]: value})
  }

  handleSubmit(e) {
    e.preventDefault()
    let state = {}
    for (let key of Object.keys(this.state)) {
      if (this.state[key]) {
        if (key === 'price') {
          state.price = Number(this.state.price * 100).toFixed(0)
        } else if (this.state[key].toString().length) {
          state[key] = this.state[key]
        }
      }
    }

    this.props.editProduct(
      this.props.match.params.id,
      state,
      this.props.history
    )
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} id="new-edit-x-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
          />
          {this.state.name.length > 0 ? null : <div>Name cannot be empty</div>}
        </div>

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            name="description"
            value={this.state.description}
            onChange={this.handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="imageUrl">Image URL:</label>
          <input
            type="url"
            name="imageUrl"
            value={this.state.imageUrl}
            onChange={this.handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            name="price"
            step="0.01"
            value={this.state.price}
            onChange={this.handleChange}
          />
          {this.state.price.toString().length > 0 ? null : (
            <div>Price cannot be empty</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="inventory">Inventory:</label>
          <input
            type="number"
            name="inventory"
            min="0"
            step="1"
            value={this.state.inventory}
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
              <option
                key={category.id}
                value={category.id}
                selected={this.state.categories.includes(category.id)}
              >
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <Button
            size="mini"
            type="submit"
            color="blue"
            disabled={
              !this.state.name.length ||
              !this.state.price.toString().length ||
              !this.state.inventory.toString().length
            }
          >
            Submit
          </Button>
        </div>
      </form>
    )
  }
}

const mapStateToProps = ({singleProduct, categories}) => ({
  singleProduct,
  categories
})
const mapDispatchToProps = {editProduct, fetchProduct}

export default connect(mapStateToProps, mapDispatchToProps)(EditProductForm)
