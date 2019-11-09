import React, {Component} from 'react'
import {connect} from 'react-redux'
import {createReview, destroyReview, editReview} from '../store/reviews'
import Review from './Review'
import {Link, withRouter} from 'react-router-dom'
import {Button, Container, Grid} from 'semantic-ui-react'

export class Reviews extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const reviews = this.props.reviews || []
    return (
      <Container>
        <Link to={`/products/${this.props.match.params.id}/reviews/new`}>
          <Button type="button">Add Review</Button>
        </Link>
        <Container>
          {reviews.map(rev => (
            <Review
              key={rev.id}
              destroyReview={this.props.destroyReview}
              review={rev}
              fetchUser={this.props.fetchUser}
            />
          ))}
        </Container>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  reviews: state.reviews
})

const mapDispatchToProps = {createReview, destroyReview, editReview}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Reviews))
