import React, {Component} from 'react'
import {connect} from 'react-redux'
import {createReview, destroyReview, editReview} from '../store/reviews'
import Review from './Review'
import {Link, withRouter} from 'react-router-dom'
import {Button, Container, Grid, Comment, Header} from 'semantic-ui-react'

export class Reviews extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const reviews = this.props.reviews || []
    //console.log(reviews)
    return (
      <Container>
        <Container>
          <Comment.Group>
            <Header as="h3" dividing>
              REVIEWS
            </Header>
            {reviews.map(rev => (
              <Review
                key={rev.id}
                destroyReview={this.props.destroyReview}
                review={rev}
                //fetchUser={this.props.fetchUser}
              />
            ))}
          </Comment.Group>
        </Container>
        {this.props.user.id ? (
          <Link to={`/products/${this.props.match.params.id}/reviews/new`}>
            <Button size="mini" color="yellow" type="button">
              +Add Review
            </Button>
          </Link>
        ) : (
          <Link to="/login">
            <Button size="mini" color="yellow" type="button">
              You must be logged in to leave a review
            </Button>
          </Link>
        )}
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  reviews: state.reviews,
  user: state.user
})

const mapDispatchToProps = {createReview, destroyReview, editReview}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Reviews))
