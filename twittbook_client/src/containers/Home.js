import React, { Component } from 'react';
import PostCard from '../components/PostCard';
import { connect } from 'react-redux';
import '../styles/Home.css';
import NewPost from '../components/NewPost';
import { fetchPosts } from '../actions/posts';

// responsible for fetching posts
class Home extends Component {
    componentWillMount() {
        this.props.fetchPosts();
    }

    renderPosts() {
        return this.props.posts.map(post => {
            return (
                <li key={post.id} className="home-posts__post">
                    <PostCard post={post} />
                </li>
            );
        });
    }

    handleSubmit() {
        // window.FB.api(
        //     "/10211085892279068/friends",
        //     function (response) {
        //         console.log(response);
        //         if (response && !response.error) {
        //             console.log(response);
        //         }
        //     }
        // );
    }



    render() {

        return (
            <div className="home__container">
                <div className="home-posts__new-post">
                    <NewPost handleSubmit={() => this.handleSubmit()} />
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

export default connect(mapStateToProps, { fetchPosts })(Home);
