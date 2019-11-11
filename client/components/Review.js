import React from 'react'
import {Link, withRouter} from 'react-router-dom'
import {Table, Button, Container, TableBody, Comment} from 'semantic-ui-react'
import {connect} from 'react-redux'
import dateformat from '../../utilFrontEnd/dateformat'
import ratingconverter from '../../utilFrontEnd/ratingcoverter.js'

const Review = props => {
  const review = props.review
  const stars = ratingconverter(props.review.rating)
  console.log(stars)

  const user = props.review.user
  return (
    <Container id="reviewcontainer">
      <Comment>
        {user.imageUrl ? (
          <Comment.Avatar id="user-home-profilepic" src={user.imageUrl} />
        ) : (
          <Comment.Avatar
            id="user-icon"
            src="http://simpleicon.com/wp-content/uploads/user1.svg"
          />
        )}

        <Comment.Content>
          <Comment.Author as="a">{user.name}</Comment.Author>
          <Comment.Metadata>
            <div>
              Rating:{' '}
              {stars.map(s => (
                <img
                  key={s}
                  className="bananarating"
                  src="https://nanas-image-store.s3.us-east-2.amazonaws.com/nana-icon.jpg"
                />
              ))}
            </div>
            <Comment.Text id="reivewmetadataholder">
              <div id="reviewbuttons">
                {props.user.role === 'admin' ||
                props.user.id === review.userId ? (
                  <Link
                    to={`/products/${review.productId}/reviews/${
                      review.id
                    }/edit`}
                  >
                    <Button color="blue" type="button" size="mini">
                      Edit
                    </Button>
                  </Link>
                ) : null}

                {props.user.role === 'admin' ||
                props.user.id === review.userId ? (
                  <Button
                    color="red"
                    type="button"
                    size="mini"
                    onClick={() => {
                      props.destroyReview(review.productId, review.id)
                    }}
                  >
                    Delete
                  </Button>
                ) : null}
              </div>
            </Comment.Text>
          </Comment.Metadata>
          <Comment.Text>
            <div>
              <div>{review.body}</div>
              <div className="reviewbuttonsanddata">
                <Comment.Metadata>
                  {dateformat(review.createdAt)}
                </Comment.Metadata>
              </div>
            </div>
          </Comment.Text>
        </Comment.Content>
      </Comment>
    </Container>
  )
}

const mapStateToProps = ({user}) => ({user})

export default withRouter(connect(mapStateToProps)(Review))
