import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import Logged from '../containers/Logged';
import { Link } from 'react-router';

class Header extends Component {
  render() {
    const isAuthenticated = this.props.isAuthenticated;
    const hideIfSignIn = !isAuthenticated ? { display: 'none' } : {};

    return (
      <div>
        <AppBar
          style={hideIfSignIn}
          iconElementRight={
            isAuthenticated ? <Logged /> : <div />
          }
          />
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    isAuthenticated: state.auth.isAuthenticated
  }
}

export default connect(mapStateToProps)(Header);