import React from 'react'
import {Login, Signup} from '../auth-form'
import {Button} from 'semantic-ui-react'
import '../../styles/checkoutlogin.scss'
import Modal from 'react-modal'

import '../../styles/checkout.scss'

const customStyles = {
  content: {
    height: '50%'
  }
}

Modal.setAppElement(document.getElementById('app'))

export default class CheckoutLogin extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modalIsOpen: false
    }
    this.openModal = this.openModal.bind(this)
    this.afterOpenModal = this.afterOpenModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }

  openModal() {
    this.setState({modalIsOpen: true})
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    //this.subtitle.style.color = '#000'
  }

  closeModal() {
    this.setState({modalIsOpen: false})
  }

  render(props) {
    const handleUserOptions = this.props.handleUserOptions
    const handleSubmit = this.props.handleSubmit
    let {login, signup, continueAsGuest} = this.props.showUserOptions

    return (
      <div>
        <Button type="submit" onClick={this.openModal}>
          Login, signup, or continue as guest
        </Button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          //style={customStyles}
          contentLabel="Login Options"
          id="modal"
        >
          {/* <div id="modal-div"> */}
          <div id="checkout-login">
            <Button type="button" name="login" onClick={handleUserOptions}>
              {/* {login ? 'Back' : 'Login'} */}
              Login
            </Button>

            <div>{login ? <Login /> : null}</div>

            <Button type="button" name="signup" onClick={handleUserOptions}>
              {/* {signup ? <Signup /> : 'Signup'} */}
              Signup
            </Button>

            <div>{signup ? <Signup /> : null}</div>

            <Button
              type="button"
              name="continueAsGuest"
              onClick={handleUserOptions}
            >
              {/* {continueAsGuest ? 'Back' : 'Continue as Guest'} */}
              Continue as Guest
            </Button>

            {continueAsGuest ? (
              <form id="guestEmailForm" onSubmit={handleSubmit}>
                <label htmlFor="email">Email:</label>
                <input type="email" name="email" />
                <Button
                  type="submit"
                  id="submit-checkout-unauthorized"
                  color="blue"
                >
                  Submit
                </Button>
              </form>
            ) : null}

            {/* <div id="modal-close-button"> */}
            <Button type="submit" onClick={this.closeModal}>
              Close
            </Button>
          </div>
          {/* </div> */}
        </Modal>
      </div>
    )
  }
}
