import React, { Component } from 'react';
import { Card } from 'material-ui/Card';
import '../styles/PostCard.css';

class PostCard extends Component {
    constructor(props) {
        super(props);

        this.post = this.props.post;
    }

    componentDidMount() {
        const postTextContainerHeight = this.refs.postText.getBoundingClientRect().height;
        const postTextScrollHeight = this.refs.postText.scrollHeight;
        if (postTextScrollHeight > postTextContainerHeight) {
            console.log(postTextContainerHeight);
            console.log(postTextScrollHeight);
        }
    }

    formatTime(date) {
        return new Date(date).toLocaleString('hr', new Intl.Collator('hr'));
    }

    render() {
        let style = {
            height: '120px'
        };

        return (
            <div className="post--space-around">
                <Card
                    style={{ ...style }}
                    className="post__card">
                    <div className="post__container">
                        <div ref="postText" className="post__text">
                            {this.post.message}
                        </div>
                        <div className="post__provider-stamp">
                            {this.post.provider} &bull; {this.formatTime(this.post.created_time)}
                        </div>
                    </div>
                </Card>
            </div>
        );
    }
}

export default PostCard;