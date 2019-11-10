import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchSearchedProducts} from '../store/products'
import {fetchFilteredProducts} from '../store/products'
import {Input, Button, Form, Item, Grid} from 'semantic-ui-react'

export class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchText: '',
      searchTerms: []
    }
    this.searchText = React.createRef()
  }

  newSearch = event => {
    event.preventDefault()
    //console.log('event.target.value:', event.target.value)
    // console.log('this.state.searchText:', this.state.searchText)
    // this.setState({searchTerms: event.target.value})
    let index = this.state.searchTerms.indexOf(this.state.searchText)
    if (index >= 0) {
      this.state.searchTerms.splice(index, 1)
    } else {
      this.state.searchTerms.push(this.state.searchText)
    }
    // console.log('this.state.searchTerms:', this.state.searchTerms)
    this.props.findProducts(this.state.searchTerms)
  }

  render() {
    // let products = this.props.products
    // console.log(products)
    return (
      <Form id="search-form" onSubmit={this.newSearch}>
        <Grid centered>
          <Grid.Row>
            <Item.Group>
              <Item>
                <label htmlFor="product-search">
                  {/* <span>Search</span> */}
                  <Input
                    focus
                    name="product-search"
                    placeholder="Search"
                    type="text"
                    value={this.state.searchText}
                    onChange={event =>
                      this.setState({searchText: event.target.value})
                    }
                  />
                </label>
                <Item.Content>
                  <Button type="submit">Submit</Button>
                </Item.Content>
              </Item>
            </Item.Group>
          </Grid.Row>
        </Grid>
      </Form>
    )
  }
}

const mapState = (state, props) => {
  return {
    products: state.products
  }
}

const mapDispatch = dispatch => ({
  findProducts: searchTerms => dispatch(fetchSearchedProducts(searchTerms))
})

export default connect(mapState, mapDispatch)(Search)
