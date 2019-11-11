/* eslint-disable complexity */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {Login, Signup, UserHome} from './components'
import AllProducts from './components/AllProducts'
import {me} from './store'
import NewProductForm from './components/NewProductForm'
import SingleProduct from './components/SingleProduct'
import EditProductForm from './components/EditProductForm'
import Cart from './components/Cart'
import NewAddressForm from './components/NewAddressForm'
import EditAddressForm from './components/EditAddressForm'
import EditUserForm from './components/EditUserForm'
import EditCategoryForm from './components/EditCategoryForm'
import NewReviewForm from './components/NewReviewForm'
import EditReviewForm from './components/EditReviewForm'
import Checkout from './components/Checkout'
import SingleOrder from './components/SingleOrder'
import AdminBoard from './components/AdminBoard'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn, isAdmin} = this.props

    return (
      <Switch>
        {/* Admin Routes */}
        {isAdmin ? (
          <Route path="/categories/:id/edit" component={EditCategoryForm} />
        ) : null}
        {isAdmin ? (
          <Route path="/products/:id/edit" component={EditProductForm} />
        ) : null}
        {isAdmin ? (
          <Route path="/products/new" component={NewProductForm} />
        ) : (
          <Route path="/products/new" component={AllProducts} />
        )}
        {isAdmin ? <Route path="/adminboard" component={AdminBoard} /> : null}

        {/* LoggedInRoutes */}
        {isLoggedIn ? (
          <Route
            path="/products/:productId/reviews/:reviewId/edit"
            component={EditReviewForm}
          />
        ) : null}
        {isLoggedIn ? (
          <Route path="/products/:id/reviews/new" component={NewReviewForm} />
        ) : null}
        {isLoggedIn ? (
          <Route path="/users/:id/edit" component={EditUserForm} />
        ) : null}
        {isLoggedIn ? <Route path="/users/:id" component={UserHome} /> : null}
        {isLoggedIn ? (
          <Route path="/addresses/new" component={NewAddressForm} />
        ) : null}
        {isLoggedIn ? (
          <Route path="/addresses/:id/edit" component={EditAddressForm} />
        ) : null}
        {isLoggedIn ? (
          <Route path="/orders/:id" component={SingleOrder} />
        ) : null}

        {/* Routes placed here are available to all visitors */}
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/products/:id" component={SingleProduct} />
        <Route path="/cart" component={Cart} />
        <Route path="/home" component={AllProducts} />
        <Route path="/products" component={AllProducts} />

        <Route component={Login} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    isAdmin: state.user.role === 'admin'
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
