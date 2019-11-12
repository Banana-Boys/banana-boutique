import React from 'react'
import {Link} from 'react-router-dom'
import {Table, TableBody, Container, Button} from 'semantic-ui-react'

const AllUsers = props => {
  const user = props.user || {}
  return (
    <Container>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell singleLine> Name: {user.name}</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <TableBody>
          <Table.Row>
            <div id="alluserstext">
              <Table.Cell>Id: {user.id}</Table.Cell>
              <Table.Cell>Email: {user.email}</Table.Cell>
              <Table.Cell>Role: {user.role}</Table.Cell>
            </div>
            <div id="allusersbuttons">
              {user.role === 'user' ? (
                <Table.Cell>
                  <Button
                    size="mini"
                    floated="right"
                    type="button"
                    color="yellow"
                    onClick={() => {
                      props.promote(user)
                    }}
                  >
                    Promote
                  </Button>
                </Table.Cell>
              ) : (
                <div />
              )}
              {user.role === 'admin' ? (
                <Table.Cell>
                  <Button
                    size="mini"
                    floated="right"
                    type="button"
                    color="olive"
                    onClick={() => {
                      props.demote(user)
                    }}
                  >
                    Demote
                  </Button>
                </Table.Cell>
              ) : (
                <div />
              )}
              <Table.Cell>
                <Button
                  size="mini"
                  floated="right"
                  type="button"
                  color="red"
                  onClick={() => {
                    props.deleteUser(user.id)
                  }}
                >
                  Delete User
                </Button>
              </Table.Cell>
            </div>
          </Table.Row>
        </TableBody>
      </Table>
    </Container>
  )
}

export default AllUsers
