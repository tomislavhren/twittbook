import React, { Component } from 'react';
import PostCard from '../components/PostCard';
import { connect } from 'react-redux';
import '../styles/Home.css';
import NewPost from '../components/NewPost';
import { fetchPosts, postAPost, postAPostWithImage } from '../actions/posts';
import { obtainTwitterToken } from '../actions/auth';
import Divider from 'material-ui/Divider';

// responsible for fetching posts
class Home extends Component {
    componentWillMount() {
        this.props.fetchPosts();
    }

    renderPosts() {
        let result = [];
        //for each date
        Object.keys(this.props.posts).forEach((date) => {
            const postList_li = this.props.posts[date].map(post => {
                return (
                    <li key={post.id} className="home-posts__post post--space-around">
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
                    <h3 className="home-posts__post-date">{date}</h3>
                    {postList_ul}
                </div>
            );

            result.push(postSection);
        });

        return result;
    }

    handleSubmit({status, image}) {
        if (!image) this.props.postAPost(status);
        else this.props.postAPostWithImage(image, status);
    }

    render() {
        return (
            <div className="home__container">
                <div className="home-posts__new-post">
                    <NewPost handleSubmit={(msg) => this.handleSubmit(msg)} />
                </div>
                <div className="home-posts__container">
                    {this.renderPosts()}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        posts: state.posts
    };
}

export default connect(mapStateToProps, { fetchPosts, postAPost, obtainTwitterToken, postAPostWithImage })(Home);
