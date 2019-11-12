import React, {Component} from 'react'
import {connect} from 'react-redux'
import {destroyReview} from '../store/reviews'
import Review from './Review'
import {Link, withRouter} from 'react-router-dom'
import {Button, Container, Grid, Comment, Header} from 'semantic-ui-react'
import {queryParser} from '../../utilFrontEnd/queryParser'
import NewReviewForm from './NewReviewForm'

export class Reviews extends Component {
  constructor(props) {
    super(props)
    const query = queryParser(this.props.location.search)
    const {rating, search} = query
    this.state = {
      rating: rating || '',
      search: search || '',
      showAddReview: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.hideAddReview = this.hideAddReview.bind(this)
  }

  handleChange(e) {
    e.persist()
    const newState = {...this.state, [e.target.name]: e.target.value}
    this.queryPusher(newState)
    this.setState(newState)
  }

  hideAddReview() {
    this.setState({showAddReview: false})
  }

  queryPusher(state) {
    const {rating, search} = state
    let queryPush = []
    if (Number(rating)) {
      queryPush.push(`rating=${rating}`)
    }
    if (search.length) {
      queryPush.push(`search=${search}`)
    }
    this.props.history.push({
      search: queryPush.length > 0 ? `?${queryPush.join('&')}` : '',
      hash: location.hash
    })
  }

  render() {
    let reviews = this.props.reviews || []
    const {rating, search} = this.state
    reviews = rating.length
      ? reviews.filter(review => review.rating === rating)
      : reviews
    reviews = search.length
      ? reviews.filter(
          review =>
            review.title.includes(search.toLowerCase()) ||
            review.body.includes(search.toLowerCase()) ||
            review.user.name.includes(search.toLowerCase())
        )
      : reviews
    return (
      <Container>
        <Container>
          <Comment.Group>
            <Header as="h3" dividing>
              REVIEWS
            </Header>
            {this.props.user.id ? (
              <div>
                <Button
                  size="mini"
                  color="yellow"
                  type="button"
                  onClick={() =>
                    this.setState(prevState => ({
                      ...prevState,
                      showAddReview: !prevState.showAddReview
                    }))
                  }
                >
                  {this.state.showAddReview
                    ? 'Hide review form'
                    : reviews.length ? '+Add Review' : 'Leave the first review'}
                </Button>
                {this.state.showAddReview ? (
                  <NewReviewForm hideAddReview={this.hideAddReview} />
                ) : null}
              </div>
            ) : (
              <Link to="/login">
                <Button size="mini" color="yellow" type="button">
                  You must be logged in to leave a review
                </Button>
              </Link>
            )}
            <div>
              <label htmlFor="rating">Filter by rating:</label>
              <select name="rating" onChange={this.handleChange}>
                <option value="">Show all</option>
                {[1, 2, 3, 4, 5].map(r => (
                  <option
                    key={r}
                    value={r}
                    selected={r === Number(this.state.rating)}
                  >
                    {r}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="search">Search reviews:</label>
              <input
                name="search"
                onChange={this.handleChange}
                value={this.state.search}
              />
            </div>
            {reviews.map(
              rev =>
                rev.user ? (
                  <Review
                    key={rev.id}
                    destroyReview={this.props.destroyReview}
                    review={rev}
                    //fetchUser={this.props.fetchUser}
                  />
                ) : null
            )}
          </Comment.Group>
        </Container>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  reviews: state.reviews,
  user: state.user
})

const mapDispatchToProps = {destroyReview}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Reviews))
