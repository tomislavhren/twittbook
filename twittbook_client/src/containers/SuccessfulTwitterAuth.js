import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CardActions, CardHeader } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import '../styles/SuccessfulTwitterAuth.css';
import { Link } from 'react-router';

// responsible for fetching posts
class SuccessfulTwitterAuth extends Component {
    render() {
        return (
            <div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
    };
}

export default connect(mapStateToProps)(SuccessfulTwitterAuth);
