import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/IconButton';
import '../styles/UserProfile.css';

// responsible for fetching posts
class UserProfile extends Component {

    render() {

        return (
            <div className="user-profile__container">
                <div id="user-profile">
                    <img src="assets/lara.jpg" />
                </div>
                <Card className="user-profile__card">
                    <CardHeader
                        title="Lara Dorčec"
                        subtitle="Bok, ja sam Lara iz Đurđefca."
                        avatar="assets/lara.jpg"
                        className="user-profile__header"
                        />
                    <CardMedia
                        className="user-profile__image"
                        >
                        <img src="assets/lara.jpg" />
                    </CardMedia>
                    <CardText>

                    </CardText>
                    <CardActions className="user-profile__actions">
                        <FontIcon className="mdi mdi-bell" />
                        <FlatButton label="Action1" />
                        <FlatButton label="Action2" />
                    </CardActions>
                </Card>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {};
}

export default connect(mapStateToProps)(UserProfile);
