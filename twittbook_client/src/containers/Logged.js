import React, { Component } from 'react';
import { connect } from 'react-redux';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import * as actions from '../actions/auth';
import { Link } from 'react-router';
import '../styles/Logged.css';

class Logged extends Component {
    render() {
        return (
            <div className="logged__menu-container">
                <IconMenu
                    className="hide-on-large-screen"
                    iconButtonElement={
                        <IconButton > <MoreVertIcon /></IconButton >
                    }
                    targetOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
                    >
                    <MenuItem
                        primaryText="Home"
                        containerElement={<Link to="/home" />} />
                    <MenuItem
                        primaryText="Profile"
                        containerElement={<Link to="/user" />} />
                    <MenuItem
                        onTouchTap={this.props.signOutUser}
                        primaryText="Sign out"
                        />
                </IconMenu >
                <FlatButton
                    className="hide-on-small-screen"
                    label="Home"
                    containerElement={<Link to="/home" />} />
                <FlatButton
                    className="hide-on-small-screen"
                    label="Profile"
                    containerElement={<Link to="/user" />} />
                <FlatButton
                    className="hide-on-small-screen"
                    label="Sign out"
                    onTouchTap={this.props.signOutUser} />
            </div>
        );
    }
}

export default connect(null, actions)(Logged);