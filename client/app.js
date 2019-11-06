import React from 'react'

import {Navbar} from './components'
import Routes from './routes'
import {fetchAllCategories} from './store/categories'
import {connect} from 'react-redux'

class App extends React.Component {
  componentDidMount() {
    this.props.fetchAllCategories()
  }

  render() {
    return (
      <div>
        <Navbar />
        <Routes />
      </div>
    )
  }
}

const mapDispatchToProps = {fetchAllCategories}

export default connect(null, mapDispatchToProps)(App)
