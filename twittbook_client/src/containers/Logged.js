import React, { Component } from 'react';
import { connect } from 'react-redux';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Toggle from 'material-ui/Toggle';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import * as actions from '../actions/auth';

class Logged extends Component {
    refresh() {
        window.location.reload(true);
    }

    render() {
        return (
            <IconMenu
                iconButtonElement={
                    <IconButton > <MoreVertIcon /></IconButton >
                }
                targetOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
                >
                <MenuItem
                    onTouchTap={this.refresh}
                    primaryText="Refresh"
                    />
                <MenuItem primaryText="Help" />
                <MenuItem
                    onTouchTap={this.props.signOutUser}
                    primaryText="Sign out"
                    />
            </IconMenu >
        );
    }
}

export default connect(null, actions)(Logged);