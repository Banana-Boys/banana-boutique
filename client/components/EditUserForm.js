import React from 'react'
import {connect} from 'react-redux'
import {editUser} from '../store/user'

class EditUserForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: this.props.user.name || '',
      imageUrl: this.props.user.imageUrl || '',
      email: this.props.user.email || '',
      phone: this.props.user.phone || ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  //   componentDidMount() {
  //     this.props.fetchUser(this.props.match.params.id)
  //   }

  componentWillReceiveProps(newProps) {
    const {name, imageUrl, email, phone} = newProps.user
    const newState = {name, imageUrl, email, phone}
    for (let key of Object.keys(newState)) {
      newState[key] = newState[key] ? newState[key] : ''
    }
    this.setState(newState)
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.editUser(this.props.user.id, this.state, this.props.history)
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="imageUrl">Image URL:</label>
          <input
            type="text"
            name="imageUrl"
            value={this.state.imageUrl}
            onChange={this.handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
          {this.state.email.length > 0 ? null : (
            <div>Email cannot be empty</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone #:</label>
          <input
            type="text"
            name="phone"
            value={this.state.phone}
            onChange={this.handleChange}
          />
        </div>

        <div className="form-group">
          <button type="submit">Submit</button>
        </div>
      </form>
    )
  }
}

const mapStateToProps = ({user}) => ({user})
const mapDispatchToProps = {editUser}

export default connect(mapStateToProps, mapDispatchToProps)(EditUserForm)
