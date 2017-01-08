import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import MoreHorizIcon from 'material-ui/svg-icons/navigation/more-horiz';

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
            open: false
        }
    }

    handleOpen() {
        this.setState({ open: true });
    };

    handleClose() {
        this.setState({ open: false });
    }

    render() {
        const actions = [
            <FlatButton
                label="Close"
                primary={true}
                onTouchTap={this.handleClose.bind(this)}
                />
        ];

        return (
            <div>
                <IconButton onTouchTap={this.handleOpen.bind(this)}>
                    <MoreHorizIcon size={16}/>
                </IconButton>
                <Dialog
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose.bind(this)}
                    >
                    {this.props.post.message}
                </Dialog>
            </div >
        );
    }
}