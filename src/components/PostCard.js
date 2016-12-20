import React, { Component } from 'react';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import '../styles/PostCard.css';
import HomeIcon from 'react-material-icons/icons/action/home';

class PostCard extends Component {
    constructor(props) {
        super(props);

        this.post = this.props.post;
    }

    formatTime(date) {
        return new Date(date).toLocaleTimeString('hr').substr(0, 5);
    }

    render() {
        let style = {
            flexBasis: '25%',
            height: '120px'
        };

        return (
            <div className="post--space-around">
                <Card style={{ ...style }}
                    className="post__card">
                    <div className="post__container">
                        <div className="post__text">
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