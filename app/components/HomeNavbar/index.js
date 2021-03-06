/**
 *
 * HomeNavbar
 *
 */
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import Modal from 'react-responsive-modal';
import { Link, NavLink } from 'react-router-dom';
import ForgetPasswordModal from 'components/ForgetPasswordModal';
import SignInModal from 'components/Modal';
import SignUpModal from 'components/SignupModal';
import Logo from '../../images/home-logo.png';

// import styled from 'styled-components';
import './HomeNavbar.scss';

import messages from './messages';

class HomeNavbar extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.onCloseModal = this.onCloseModal.bind(this);
    this.signupClickHandler = this.signupClickHandler.bind(this);
    this.onOpenModal = this.onOpenModal.bind(this);
    this.loginClickHandler = this.loginClickHandler.bind(this);
    this.forgetPasswordClickHandler = this.forgetPasswordClickHandler.bind(
      this
    );
    this.state = {
      openSigninModal: false,
      openHelpModal: false,
      open: false,
      isOpenForgetPasswordModal: false,
      isOpenSignupModal: false,
    };
  }
  onOpenModal() {
    this.setState({ open: true });
  }

  onCloseModal() {
    this.setState({
      open: false,
      isOpenForgetPasswordModal: false,
      isOpenSignupModal: false,
    });
  }
  signupClickHandler() {
    this.onCloseModal();
    this.setState({
      isOpenSignupModal: true,
    });
  }
  loginClickHandler() {
    this.onCloseModal();
    this.setState({
      isOpenSignupModal: false,
      open: true,
    });
  }
  forgetPasswordClickHandler() {
    this.onCloseModal();
    this.setState({
      isOpenForgetPasswordModal: true,
    });
  }
  render() {
    return (
      <div className="HomeNavbar-container container">
        <NavLink to="https://shaadidotcom.herokuapp.com" target="_blank">
          <img src={Logo} alt="Logo" />
        </NavLink>
        <Link to="#" className="pull-right help-btn">
          <FormattedMessage {...messages.help} />
          <i className="fa fa-angle-down" aria-hidden="true" />
        </Link>
        <Link to="#" className="pull-right customer-care-avatar">
          <span />
        </Link>
        <Link
          to="#"
          className="pull-right login-btn modal-trigger"
          onClick={this.onOpenModal}
        >
          <FormattedMessage {...messages.login} />
          <i className="fa fa-angle-down" aria-hidden="true" />
          <span />
        </Link>

        {/* Signin Modal Popup here */}
        <Modal open={this.state.open} onClose={this.onCloseModal} little>
          <SignInModal
            signupClickHandler={this.signupClickHandler}
            forgetPasswordClickHandler={this.forgetPasswordClickHandler}
          />
        </Modal>

        {/* Forgert Modal Popup here */}
        <ForgetPasswordModal
          isOpenForgetPasswordModal={this.state.isOpenForgetPasswordModal}
          onCloseModal={this.onCloseModal}
        />

        {/* SignUp Modal popup here */}
        <SignUpModal
          isOpenSignupModal={this.state.isOpenSignupModal}
          loginClickHandler={this.loginClickHandler}
          onCloseModal={this.onCloseModal}
        />
      </div>
    );
  }
}

HomeNavbar.propTypes = {
  loginClickHandler: PropTypes.func,
};

export default HomeNavbar;
