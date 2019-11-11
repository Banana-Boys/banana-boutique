import React from 'react'
import {Link, withRouter} from 'react-router-dom'
import {Table, Button, Container, TableBody} from 'semantic-ui-react'
import {connect} from 'react-redux'
import dateformat from '../../utilFrontEnd/dateformat'

const Review = props => {
  const review = props.review
  return (
    <Container>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell singleLine>Title:{review.title}</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <TableBody>
          <Table.Row>
            <Table.Cell>
              <p>Body: {review.body}</p>
            </Table.Cell>
            <Table.Cell>
              <p>Rating: {review.rating}</p>
            </Table.Cell>
            <Table.Cell>{/* <p>Author:{review.user.name}</p> */}</Table.Cell>
            <Table.Cell>
              <p>Created: {dateformat(review.createdAt)}</p>
            </Table.Cell>
            <Table.Cell>
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
            </Table.Cell>
            <Table.Cell>
              {props.user.role === 'admin' ||
              props.user.id === review.userId ? (
                <Link
                  to={`/products/${review.productId}/reviews/${review.id}/edit`}
                >
                  <Button color="blue" type="button" size="mini">
                    Edit
                  </Button>
                </Link>
              ) : null}
            </Table.Cell>
          </Table.Row>
        </TableBody>
      </Table>
    </Container>
  )
}

const mapStateToProps = ({user}) => ({user})

export default withRouter(connect(mapStateToProps)(Review))
