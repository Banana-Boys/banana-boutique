/* eslint-disable complexity */
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
    const {rating, search, myReviews} = query
    this.state = {
      rating: rating || '',
      search: search || '',
      myReviews: myReviews || false,
      showAddReview: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.hideAddReview = this.hideAddReview.bind(this)
  }

  componentWillReceiveProps(newProps) {
    const query = queryParser(newProps.location.search)
    const {rating} = query
    if (rating && this.state.rating !== rating) {
      this.setState({rating})
    }
  }

  handleChange(e) {
    e.persist()
    let newState
    if (e.target.name === 'myReviews') {
      newState = {...this.state, [e.target.name]: e.target.checked}
    } else {
      newState = {...this.state, [e.target.name]: e.target.value}
    }
    this.queryPusher(newState)
    this.setState(newState)
  }

  hideAddReview() {
    this.setState({showAddReview: false})
  }

  queryPusher(state) {
    const {rating, search, myReviews} = state
    let queryPush = []
    if (Number(rating)) {
      queryPush.push(`rating=${rating}`)
    }
    if (search.length) {
      queryPush.push(`search=${search}`)
    }
    if (myReviews) {
      queryPush.push(`myReviews=${myReviews}`)
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
    reviews = this.state.myReviews
      ? reviews.filter(review => review.userId === this.props.user.id)
      : reviews
    return (
      <Container>
        <Container>
          <Comment.Group>
            <Header as="h3" dividing>
              REVIEWS
            </Header>
            <Container
              id="reviewsmisc"
              style={{
                flexDirection: 'column'
              }}
            >
              {this.props.user.id ? (
                <div className="reviewmiscitem" style={{margin: '10px 0'}}>
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
                      : reviews.length
                        ? '+Add Review'
                        : 'Leave the first review'}
                  </Button>
                  {this.state.showAddReview ? (
                    <NewReviewForm hideAddReview={this.hideAddReview} />
                  ) : null}
                </div>
              ) : (
                <Link to="/login" style={{margin: '10px 0'}}>
                  <Button size="mini" color="yellow" type="button">
                    You must be logged in to leave a review
                  </Button>
                </Link>
              )}

              <div
                style={{
                  margin: '10px 0',
                  display: 'flex',
                  flexDirection: 'row'
                }}
              >
                <div
                  className="reviewmiscitem form-group"
                  style={
                    this.state.showAddReview
                      ? {margin: '10px', width: '150px'}
                      : null
                  }
                >
                  {/* <label htmlFor="rating">Filter by rating:</label> */}
                  <select
                    id="ratingselect"
                    name="rating"
                    onChange={this.handleChange}
                  >
                    <option value="">Filter by rating</option>
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
                <div
                  className="reviewmiscitem form-group"
                  style={
                    this.state.showAddReview
                      ? {margin: '10px', width: '150px'}
                      : null
                  }
                >
                  {/* <label htmlFor="search">Search reviews:</label> */}
                  <input
                    id="ratingsearch"
                    name="search"
                    placeholder="Search Reviews..."
                    onChange={this.handleChange}
                    value={this.state.search}
                  />
                </div>

                {this.props.user.id ? (
                  <div
                    className="reviewmiscitem form-group"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      margin: this.state.showAddReview ? '10px' : null,
                      width: this.state.showAddReview ? '150px' : null
                    }}
                  >
                    <input
                      type="checkbox"
                      name="myReviews"
                      onChange={this.handleChange}
                      checked={this.state.myReviews}
                    />
                    <label htmlFor="myReviews">My reviews</label>
                  </div>
                ) : null}
              </div>
            </Container>
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
