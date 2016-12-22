import React, { Component } from 'react';
import '../styles/App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Header from './Header';
import Footer from './Footer';
import theme from '../config/theme';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={theme}>
        <div>
          <Header  />
          {this.props.children}
          <Footer />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
