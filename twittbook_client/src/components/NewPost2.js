import React, { Component } from 'react';
import { Card } from 'material-ui/Card';
import '../styles/NewPost.css';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';
import SendIcon from 'material-ui/svg-icons/content/send';
import CheckIcon from 'material-ui/svg-icons/navigation/check';
import ImgUploadIcon from 'material-ui/svg-icons/image/add-a-photo';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import { postAPost, postAPostWithImage, fetchPosts } from '../actions/posts';
import { green400 as successGreen } from 'material-ui/styles/colors';
import CircularProgress from 'material-ui/CircularProgress';

class NewPost2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasFile: false,
            thumbnail: '',
            label: 'Upload image',
            post_in_progress: false
        };
    }

    handleTouchTap() {
        document.getElementById('upload-image').click();
    }

    handleFileChange(e) {
        e.preventDefault();
        const preview = document.querySelector('img');
        const file = e.target.files[0];
        const reader = new FileReader();
        const { change } = this.props
        change('image', file);

        reader.onloadend = () => {
            this.setState({
                hasFile: true,
                thumbnail: reader.result,
                label: (
                    <span className="new-post__successful-upload">
                        Successful upload<CheckIcon color='white' style={{ width: 16, height: 16 }} />
                    </span>
                )
            });
        }

        if (file) {
            reader.readAsDataURL(file);
        }
    }

    resetState() {
        this.props.fetchPosts();
        this.setState({
            hasFile: false,
            thumbnail: '',
            label: 'Upload image',
            post_in_progress: false
        });
    }

    handleFormSubmit({ status, image}) {
        this.setState({ post_in_progress: true });
        if (!image)
            this.props.postAPost(status).then(() => {
                this.resetState.call(this);
            });
        else
            this.props.postAPostWithImage(image, status).then(() => {
                this.resetState.call(this);
            });
    }

    render() {
        const { handleSubmit, onChange } = this.props
        const avatar_props = {
            src: this.state.thumbnail || null,
            icon: !this.state.hasFile ? <ImgUploadIcon /> : null,
        };
        const chip_props = {
            labelColor: this.state.hasFile ? '#fff' : '#444',
            style: { margin: 4 },
            backgroundColor: this.state.hasFile ? successGreen : null
        };

        return (
            <Card className="new-post__card">
                <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}
                    className="new-post__form-container">
                    <div className="new-post__input">
                        <Field
                            name="status"
                            component={TextField}
                            floatingLabelText="What's on your mind?"
                            multiLine={true}
                            rows={2}
                            fullWidth={true}
                            maxLength={140}
                            textareaStyle={{ width: '100%' }}
                            />
                    </div>
                    <div className="new-post__actions">
                        <Chip
                            className="new-post__upload-chip"
                            onTouchTap={this.handleTouchTap}
                            {...chip_props}>
                            <Avatar
                                size={14}
                                {...avatar_props}
                                />
                            {this.state.label}
                        </Chip>
                        <FlatButton
                            type="submit"
                            label={this.state.post_in_progress ? 'Posting' : 'Post'}
                            labelPosition="before"
                            secondary={true}
                            style={{ alignSelf: 'center' }}
                            icon={
                                this.state.post_in_progress ? <CircularProgress size={24} /> : <SendIcon size={24} />
                        } />
                    </div>
                    <Field
                        name="image"
                        type="file"
                        component="input"
                        id="upload-image"
                        onChange={this.handleFileChange.bind(this)}
                        />
                </form>
            </Card >
        );
    }
}

export default connect(null, { postAPost, postAPostWithImage, fetchPosts })(reduxForm({
    form: 'NewPostForm',
    fields: ['status', 'image']
})(NewPost2));
