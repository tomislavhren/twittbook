import React, { Component } from 'react';
import PostCard from '../components/PostCard';
import { connect } from 'react-redux';
import '../styles/Home.css';
import NewPost from '../components/NewPost';

// responsible for fetching posts
class Home extends Component {
    renderPosts() {
        return this.props.posts.map(post => {
            return (
                <li key={post.id} className="home-posts__post">
                    <PostCard post={post} />
                </li>
            );
        });
    }

    onSubmit() {

    }

    render() {
        
        return (
            <div className="home__container">
                <div className="home-posts__new-post">
                    <NewPost onSubmit={() => this.onSubmit.bind(this)} />
                </div>
                <div className="home-posts__container">
                    <ul className="home-posts__list">
                        {this.renderPosts()}
                    </ul>
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

export default connect(mapStateToProps)(Home);
