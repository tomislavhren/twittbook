import React, { Component } from 'react';
import { Card } from 'material-ui/Card';
import '../styles/NewPost.css';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import SendIcon from 'material-ui/svg-icons/content/send';

class NewPost extends Component {
    render() {
        const style = {
            position: 'absolute',
            top: '128px'
        };

        return (
            <Card style={{ ...style }}
                className="new-post__card">
                <div className="new-post__form-container">
                    <div className="new-post__input">
                        <TextField
                            floatingLabelText="What's on your mind?"
                            multiLine={true}
                            rows={2}
                            fullWidth={true}
                            textareaStyle={{ width: '100%' }}
                            />
                    </div>
                    <div className="new-post__actions">
                        <FlatButton
                            label="Post"
                            labelPosition="before"
                            secondary={true}
                            onClick={this.props.handleSubmit}
                            icon={<SendIcon />}
                            />
                    </div>
                </div>
            </Card>
        );
    }
}

export default NewPost;