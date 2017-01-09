import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import MoreHorizIcon from 'material-ui/svg-icons/navigation/more-horiz';
import { Link } from 'react-router';
/**
 * Dialog with action buttons. The actions are passed in as an array of React objects,
 * in this example [FlatButtons](/#/components/flat-button).
 *
 * You can also close this dialog by clicking outside the dialog, or with the 'Esc' key.
 */
export default class ShowMoreDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: this.props.open
        }
    }

    handleOpen() {
        this.setState({ open: true });
    };

    handleClose() {
        this.setState({ open: false });
    }

    render() {
        const action = (
            <FlatButton
                label="Go to profile"
                labelPosition="before"
                containerElement={<Link to='/user' />} />
        );

        return (
            <Dialog
                actions={action}
                modal={false}
                open={this.state.open}
                onRequestClose={this.handleClose.bind(this)}
                >
                Please reconnect your Facebook account in order to receive and submit posts.
            </Dialog>
        );
    }
}