import React, { Component } from 'react';
import PostCard from '../components/PostCard';
import { connect } from 'react-redux';
import '../styles/Home.css';
// import NewPost from '../components/NewPost';
import NewPost2 from '../components/NewPost2';
import { fetchPosts, postAPost, postAPostWithImage } from '../actions/posts';
import { obtainTwitterToken } from '../actions/auth';
import Divider from 'material-ui/Divider';
import Badge from 'material-ui/Badge';
import TokenExpiredDialog from '../components/TokenExpiredDialog';

// responsible for fetching posts
class Home extends Component {
    componentDidMount() {
        this.props.fetchPosts();
    }

    renderPosts() {
        let result = [];
        //for each date
        Object.keys(this.props.posts).forEach((date) => {
            const postList_li = this.props.posts[date].map(post => {
                return (
                    <li key={post.list_key} className="home-posts__post post--space-around">
                        <PostCard post={post} />
                    </li>
                );
            });
            const postList_ul = (
                <ul className="home-posts__list">
                    {postList_li}
                </ul>
            );

            const postSection = (
                <div>
                    <h3 className="home-posts__post-date">
                        {date}
                        <Badge
                            badgeContent={this.props.posts[date].length || 0}
                            primary={true}
                            badgeStyle={{ top: 16, right: 7, backgroundColor: 'rgba(0, 0, 0, .27)' }}
                            />
                    </h3>
                    {postList_ul}
                </div>
            );

            result.push(postSection);
        });

        return result;
    }

    handleSubmit({status, image}) {
        if (!image) this.props.postAPost(status).then(() => { this.props.fetchPosts() });
        else this.props.postAPostWithImage(image[0], status).then(() => { this.props.fetchPosts() });
    }

    render() {
        return (
            <div className="home__container">
                <div className="home-posts__new-post">
                    <NewPost2 onSubmit={this.handleSubmit.bind(this)} />
                </div>
                <div className="home-posts__container">
                    {this.renderPosts()}
                </div>
                <TokenExpiredDialog open={this.props.hasExpired} />
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const { user = {}} = state.auth;
    return {
        posts: state.posts,
        hasExpired: !user.hasOwnProperty('facebook') ? false : user.facebook.hasExpired
    };
}

export default connect(mapStateToProps, { fetchPosts, postAPost, obtainTwitterToken, postAPostWithImage })(Home);
