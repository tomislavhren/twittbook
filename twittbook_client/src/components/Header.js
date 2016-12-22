import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Login from './Login';
import Logged from './Logged';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      logged: false
    }
  }

  render() {
    return (
      <div>
        <AppBar
          iconElementRight={this.state.logged ? <Logged /> : <Login />} />
      </div>
    );
  }
}

export default Header;