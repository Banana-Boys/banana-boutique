import React from 'react'
import {Link} from 'react-router-dom'
import UserView from './UserView'
import {Table, TableBody, Container, Button} from 'semantic-ui-react'

const AllUsers = props => {
  const user = props.user || {}
  console.log(props)
  return (
    <Container>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell singleLine>
              {' '}
              Name: {user.name} <br />Id: {user.id}
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <TableBody>
          <Table.Row>
            <Table.Cell>Email: {user.email}</Table.Cell>
            <Table.Cell>
              <Button
                floated="right"
                type="button"
                onClick={() => {
                  // props.destroyReview(review.productId, review.id)
                }}
              >
                Delete User
              </Button>
            </Table.Cell>
            <Table.Cell>
              {/* <Link
                to={`/products/${review.productId}/reviews/${review.id}/edit`}
              > */}
              <Button floated="right" type="button">
                Edit User
              </Button>
              {/* </Table.Cell></Link> */}
            </Table.Cell>
            <Table.Cell>
              <Button
                floated="right"
                type="button"
                onClick={() => {
                  // props.destroyReview(review.productId, review.id)
                }}
              >
                Promote
              </Button>
            </Table.Cell>
            <Table.Cell>
              <Button
                floated="right"
                type="button"
                onClick={() => {
                  // props.destroyReview(review.productId, review.id)
                }}
              >
                Demote
              </Button>
            </Table.Cell>
          </Table.Row>
        </TableBody>
      </Table>
    </Container>
  )
}

export default AllUsers