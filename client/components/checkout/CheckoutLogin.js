import React from 'react'
import {Login, Signup} from '../auth-form'
import {Button} from 'semantic-ui-react'
import '../../styles/checkoutlogin.scss'
import Modal from 'react-modal'

import '../../styles/checkout.scss'

const customStyles = {
  content: {
    // marginTop: '44px',
    height: '80%',
    width: '60%'

    // top: '44px',
    // // left: '50%',
    // right: 'auto',
    // bottom: 'auto'
    // marginRight: '-50%',
    // transform: 'translate(-50%, -50%)'
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
          {/* <h3
            ref={subtitle => {
              this.subtitle = subtitle
              return this.subtitle
            }}
          >
            Select an option to continue
          </h3> */}

          {/* <div>I am a modal</div> */}
          {/* <form>
            <input />
            <button type="submit">Login</button>
            <button type="submit">Sign Up</button>
            <button type="submit">Continue as Guest</button>
            <button type="submit">the modal</button>
          </form> */}
          <div id="modal-div">
            <div id="checkout-login">
              <div className="login-page-button">
                <Button type="button" name="login" onClick={handleUserOptions}>
                  {/* {login ? 'Hide' : 'Login'} */}
                  Login
                </Button>
              </div>
              <div className="login-page-button">
                {login ? <Login /> : null}
                <Button type="button" name="signup" onClick={handleUserOptions}>
                  {/* {signup ? 'Hide' : 'Signup'} */}
                  Signup
                </Button>
              </div>
              <div className="login-page-button">
                {signup ? <Signup /> : null}
                <Button
                  type="button"
                  name="continueAsGuest"
                  onClick={handleUserOptions}
                >
                  {/* {continueAsGuest ? 'Hide' : 'Continue as Guest'} */}
                  Continue as Guest
                </Button>
              </div>
              <div className="login-page-button">
                {continueAsGuest ? (
                  <form id="guestEmailForm" onSubmit={handleSubmit}>
                    <label htmlFor="email">Email:</label>
                    <input type="email" name="email" />
                    <Button type="submit">Submit</Button>
                  </form>
                ) : null}
              </div>
              <div id="modal-close-button">
                <Button type="submit" onClick={this.closeModal}>
                  close
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    )
  }
}
