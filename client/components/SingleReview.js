import React, { Component } from "react";
import { destroyReview, updateReview, fetchReview } from "../store/review";

export class SingleReview extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.props.getSingleReview(this.props.match.params.id);
  }

  render() {
    return (
      <div>
        <div />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  review: state.review
});

const mapDispatchToProps = dispatch => ({
  getSingleReview: reviewid => dispatch(fetchReview(reviewid)),
  deleteReview: review => dispatch(destroyReview(review)),
  updateReview: review => dispatch(updateReview(review))
});

//export default connect(mapStateToProps, mapDispatchToProps)(Reviews)
export default Reviews;
