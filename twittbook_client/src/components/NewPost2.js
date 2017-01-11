import React, { Component } from 'react';
import { Card } from 'material-ui/Card';
import '../styles/NewPost.css';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';
import SendIcon from 'material-ui/svg-icons/content/send';
import ImgUploadIcon from 'material-ui/svg-icons/image/add-a-photo';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import { postAPost, postAPostWithImage, fetchPosts } from '../actions/posts';

class NewPost2 extends Component {
    handleTouchTap() {
        document.getElementById('upload-image').click();
    }

    render() {
        const style = {
            position: 'absolute',
            top: '128px'
        };

        const { handleSubmit } = this.props

        return (
            <Card style={{ ...style }}
                className="new-post__card">
                <form onSubmit={handleSubmit}
                    className="new-post__form-container">
                    <div className="new-post__input">
                        <Field
                            name="status"
                            component={TextField}
                            floatingLabelText="What's on your mind?"
                            multiLine={true}
                            rows={2}
                            fullWidth={true}
                            textareaStyle={{ width: '100%' }}
                            />
                    </div>
                    <div className="new-post__actions">
                        <Chip
                            color="#444"
                            style={{ margin: 4 }}
                            onTouchTap={this.handleTouchTap}>
                            <Avatar size={14} icon={<ImgUploadIcon />} />
                            Upload image
                        </Chip>
                        <FlatButton
                            type="submit"
                            label="Post"
                            labelPosition="before"
                            secondary={true}
                            style={{ alignSelf: 'center' }}
                            icon={<SendIcon />}
                            />
                    </div>
                    <Field
                        name="image"
                        type="file"
                        component="input"
                        id="upload-image"
                        />
                </form>
            </Card>
        );
    }
}

export default connect(null, { postAPost, postAPostWithImage })(reduxForm({
    form: 'NewPostForm',
    fields: ['status', 'image']
})(NewPost2));
