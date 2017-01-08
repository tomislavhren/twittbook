import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CardActions, CardHeader } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import '../styles/UserProfile.css';
import FacebookLogin from 'react-facebook-login';
import fbAuth from '../config/facebookAuth';
import { addFacebookAccount, getUserData, obtainTwitterToken } from '../actions/auth';

const TWITTER_AUTH_URL = 'https://api.twitter.com/oauth/authorize?oauth_token=';

// responsible for fetching posts
class UserProfile extends Component {
    componentWillMount() {
        this.props.getUserData();
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.tw_auth_token) {
            window.open(`https://api.twitter.com/oauth/authorize?oauth_token=${nextProps.tw_auth_token.oauth_token}`, '_blank', 'width=700,height=850');
        }
    }

    responseFacebook(facebook_data) {
        localStorage.setItem('fbAccessToken', facebook_data.accessToken);
        this.props.addFacebookAccount({
            email: this.props.user.local.email,
            facebook_data: JSON.stringify(facebook_data)
        });
    }

    render() {
        const fb = this.props.facebook ? this.props.facebook : {};
        const fbPicture = fb.picture ? fb.picture.data.url : './assets/user.jpg';
        const fbAbout = fb.about || '...';
        const fbName = fb.name || 'Please connect your Facebook and Twitter accounts.';

        return (
            <div className="user-profile__container">
                <Card
                    style={{ background: 'white' }}
                    className="user-profile__card">
                    <CardHeader
                        title={fbName}
                        subtitle={fbAbout}
                        avatar={fbPicture}
                        className="user-profile__header"
                        />
                    <div className="user-profile__body">
                        <div className="user-profile__image">
                            <img src={fbPicture} role="presentation" />
                        </div>
                        <div className="user-profile__content">
                            <div>
                                <FacebookLogin
                                    appId={fbAuth.clientId}
                                    autoLoad={true}
                                    version="2.8"
                                    fields="name,email,picture.type(large),about"
                                    scope="public_profile,user_about_me,email,user_birthday,user_posts,publish_actions"
                                    callback={this.responseFacebook.bind(this)}
                                    cssClass="btn btn-block btn-social btn-facebook"
                                    icon="fa-facebook"
                                    textButton="Connect Facebook account"
                                    />
                            </div>
                            <br />
                            <div>
                                <button
                                    onClick={this.props.obtainTwitterToken}
                                    className="btn btn-block btn-social btn-twitter">
                                    <span className="fa fa-twitter"></span> Connect Twitter account
                                </button>
                            </div>
                        </div>
                    </div>
                    <CardActions className="user-profile__actions">
                        <FlatButton label="Facebook" />
                        <FlatButton label="Twitter" />
                    </CardActions>
                </Card>
                <div id="user-profile"><img src={fbPicture} role="presentation" /></div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const { user, tw_auth_token = {} } = state.auth;
    return {
        user,
        facebook: user ? user.facebook : {},
        tw_auth_token
    };
}

export default connect(mapStateToProps, { addFacebookAccount, getUserData, obtainTwitterToken })(UserProfile);
