import React, { Component } from 'react';
import '../styles/App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Header from '../containers/Header';
import Footer from './Footer';
import theme from '../config/theme';

class App extends Component {
  componentWillMount() {
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: '1759502397705552',
        xfbml: true,
        version: 'v2.8'
      });
      window.FB.AppEvents.logPageView();
    };

    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    } (document, 'script', 'facebook-jssdk'));
  }

  componentWillUpdate() {
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: '1759502397705552',
        xfbml: true,
        version: 'v2.8'
      });
      window.FB.AppEvents.logPageView();
    };

    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    } (document, 'script', 'facebook-jssdk'));
  }

  render() {
    console.info("%c App rendered", "color: green")
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

export default App;
