import React, { Component } from 'react';
import { connect } from 'react-redux';

export default function (ComposedComponent) {
    class Authentication extends Component {
        static contextTypes = {
            router: React.PropTypes.object
        }

        componentWillMount() {
            if (!this.props.isAuthenticated) {
                this.context.router.push('/');
            }

            const { location } = this.context.router;
            if (this.props.isAuthenticated && location.pathname === '/')
                this.context.router.push('/home');
        }

        componentWillUpdate(nextProps) {
            if (!nextProps.isAuthenticated) {
                this.context.router.push('/');
            }

            const { location } = this.context.router;
            if (nextProps.isAuthenticated && location.pathname === '/')
                this.context.router.push('/home');
        }

        render() {
            return <ComposedComponent {...this.props} />
        }
    }

    function mapStateToProps(state) {
        return { isAuthenticated: state.auth.isAuthenticated };
    }

    return connect(mapStateToProps)(Authentication);
}