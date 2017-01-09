import React, { Component } from 'react';
import '../styles/App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Header from '../containers/Header';
import Footer from './Footer';
import theme from '../config/theme';
import { connect } from 'react-redux';
import { getUserData } from '../actions/auth';

class App extends Component {
  componentWillMount() {
    this.props.getUserData();
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={theme}>
        <div>
          <Header />
          {this.props.children}
          <Footer />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default connect(null, { getUserData })(App);
