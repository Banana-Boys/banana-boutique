import React from 'react'
import {Link} from 'react-router-dom'
import {Table, Button, Container, TableBody} from 'semantic-ui-react'

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
              <p>Body:{review.body}</p>
            </Table.Cell>
            <Table.Cell>
              <p>Rating:{review.rating}</p>
            </Table.Cell>
            <Table.Cell>
              <p>Author:{review.user.name}</p>
            </Table.Cell>
            <Table.Cell>
              <Button
                type="button"
                onClick={() => {
                  props.destroyReview(review.productId, review.id)
                }}
              >
                Delete Review
              </Button>
            </Table.Cell>
            <Table.Cell>
              <Link
                to={`/products/${review.productId}/reviews/${review.id}/edit`}
              >
                <Button type="button">Edit Review</Button>
              </Link>
            </Table.Cell>
          </Table.Row>
        </TableBody>
      </Table>
    </Container>
  )
}

export default Review
