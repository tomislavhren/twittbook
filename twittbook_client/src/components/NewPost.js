import React, { Component } from 'react';
import { Card } from 'material-ui/Card';
import '../styles/NewPost.css';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import SendIcon from 'material-ui/svg-icons/content/send';
import ImgUploadIcon from 'material-ui/svg-icons/image/add-a-photo';

class NewPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: '',
            image: ''
        };
    }

    handleSubmit() {
        this.props.handleSubmit(this.state);
        this.setState({ status: '', image: '' });
    }

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
                            onChange={evt => this.setState({ status: evt.target.value })}
                            floatingLabelText="What's on your mind?"
                            multiLine={true}
                            rows={2}
                            fullWidth={true}
                            textareaStyle={{ width: '100%' }}
                            />
                    </div>
                    <div className="new-post__actions">
                        <IconButton tooltip="Upload image">
                            <ImgUploadIcon />
                            <input
                                id="upload-image"
                                type="file"
                                onChange={evt => this.setState({ image: evt.target.files[0] })} />
                        </IconButton>
                        <FlatButton
                            label="Post"
                            labelPosition="before"
                            secondary={true}
                            style={{ alignSelf: 'center' }}
                            onClick={this.handleSubmit.bind(this)}
                            icon={<SendIcon />}
                            />
                    </div>
                </div>
            </Card>
        );
    }
}

export default NewPost;