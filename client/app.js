import React from 'react'
import {Navbar} from './components'
import Routes from './routes'
import {fetchAllCategories} from './store/categories'
import {fetchCart} from './store/cart'
import {connect} from 'react-redux'

class App extends React.Component {
  componentDidMount() {
    this.props.fetchAllCategories()
    this.props.fetchCart()
  }

  render() {
    return (
      <div id="mount">
        {!this.props.user.id || !this.props.user.resetPassword ? (
          <Navbar />
        ) : null}
        <Routes />
      </div>
    )
  }
}

const mapStateToProps = ({user}) => ({user})
const mapDispatchToProps = {fetchAllCategories, fetchCart}

export default connect(mapStateToProps, mapDispatchToProps)(App)
