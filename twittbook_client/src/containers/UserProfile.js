import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/IconButton';
import '../styles/UserProfile.css';
import FacebookLogin from 'react-facebook-login';
import fbAuth from '../config/facebookAuth';

// responsible for fetching posts
class UserProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            facebook_data: JSON.parse(localStorage.getItem('facebook_data')) || {}
        };
    }

    componentWillMount() {
        this.setState({ facebook_data: JSON.parse(localStorage.getItem('facebook_data')) });
    }

    responseFacebook(res) {
        localStorage.setItem('facebook_data', JSON.stringify(res));
        this.setState({ facebook_data: JSON.parse(localStorage.getItem('facebook_data')) });
    }

    render() {
        const fb = this.state.facebook_data ? this.state.facebook_data : {};
        const fbPicture = fb.picture ? fb.picture.data.url : '';
        const fbAbout = fb.about || '';
        const fbName = fb.name || 'John Doe';
        
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
                            <img src={fbPicture} />
                        </div>
                        <div className="user-profile__content">
                            <FacebookLogin
                                appId={fbAuth.clientId}
                                autoLoad={true}
                                fields="name,email,picture.type(large),about"
                                scope="public_profile,user_about_me,email,user_birthday"
                                callback={this.responseFacebook.bind(this)}
                                cssClass="my-facebook-button-class"
                                icon="fa-facebook"
                                />
                        </div>
                    </div>
                    <CardActions className="user-profile__actions">
                        <FlatButton label="Facebook" />
                        <FlatButton label="Twitter" />
                    </CardActions>
                </Card>
                <div id="user-profile"><img src={fbPicture} /></div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
    };
}

export default connect(mapStateToProps)(UserProfile);
