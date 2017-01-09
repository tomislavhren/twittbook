import React, { Component } from 'react';
import { Card } from 'material-ui/Card';
import '../styles/NewPost.css';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import SendIcon from 'material-ui/svg-icons/content/send';
import ImgUploadIcon from 'material-ui/svg-icons/image/add-a-photo';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import { postAPost, postAPostWithImage } from '../actions/posts';

class NewPost2 extends Component {

    handleSubmit({status, image}) {
        if (!image) this.props.postAPost(status);
        else this.props.postAPostWithImage(image, status);
    }

    handleFileChange(ev) {
        ev.preventDefault();
        const { fields } = this.props;
        // convert files to an array
        const files = [...ev.target.files];
        fields.image.handleChange(files[0]);
    }

    render() {
        const style = {
            position: 'absolute',
            top: '128px'
        };

        const FileInput = (props) => {
            <IconButton tooltip="Upload image">
                <ImgUploadIcon />
                <input
                    id="upload-image"
                    type="file"
                    onChange={this.handleFileChange.bind(this)} />
            </IconButton>
        };

        const { handleSubmit } = this.props

        return (
            <Card style={{ ...style }}
                className="new-post__card">
                <form onSubmit={handleSubmit(this.handleSubmit.bind(this))}
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
                        <Field
                            name="image"
                            component={FileInput}
                            />
                        <FlatButton
                            type="submit"
                            label="Post"
                            labelPosition="before"
                            secondary={true}
                            style={{ alignSelf: 'center' }}
                            icon={<SendIcon />}
                            />
                    </div>
                </form>
            </Card>
        );
    }
}

export default connect(null, { postAPost, postAPostWithImage })(reduxForm({
    form: 'NewPostForm',
    fields: ['status', 'image']
})(NewPost2));