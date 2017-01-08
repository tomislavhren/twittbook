import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CardActions, CardHeader } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import '../styles/SuccessfulTwitterAuth.css';
import { Link } from 'react-router';
import { verifyTwitter, getUserData } from '../actions/auth';

// responsible for fetching posts
class SuccessfulTwitterAuth extends Component {
    static contextTypes = {
        router: React.PropTypes.object
    }

    componentWillMount() {
        this.props.getUserData();
    }

    componentDidMount() {
        const { oauth_token_secret } = this.props.tw_auth_token;
        const { oauth_token, oauth_verifier} = this.context.router.location.query;
        this.props.verifyTwitter({
            oauth_token,
            oauth_token_secret,
            oauth_verifier
        });
    }

    render() {
        return (
            <div>
                <h1>Successful Twitter sign in.</h1>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const { tw_auth_token = {} } = state.auth;
    return {
        tw_auth_token
    };
}

export default connect(mapStateToProps, { verifyTwitter, getUserData })(SuccessfulTwitterAuth);
