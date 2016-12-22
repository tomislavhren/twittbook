import React, { Component } from 'react';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import '../styles/NewPost.css';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';

class NewPost extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        const style = {
            position: 'absolute',
            top: '128px'
        };

        const buttonStyle = {
            margin: 12,
            color: 'white',
            backgroundColor: 'white'
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
                            icon={<IconButton iconClassName="mdi mdi-bell" />}
                            />
                    </div>
                </div>
            </Card>
        );
    }
}

export default NewPost;