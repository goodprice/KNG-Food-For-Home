'use strict';

import React from 'react';
import $ from 'jquery';

class User extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = { user: {} };
        this.isAuthenticated = context.authService.isAuthenticated();
        this.isAdmin = false;
        this.currentUser = {};
        this.getUser = this.getUser.bind(this);
    }

    getUser() {
        $.ajax({
            method: 'GET',
            url: this.props.route.url + '/' + this.currentUser.id,
            dataType: 'json',
            cache: false
        }).done((data) => {
            this.setState({ user: data });
        }).fail((xhr, status, err) => {
            console.error(this.props.route.url, status, err.toString());
        });
    }

    componentDidMount() {
        if(this.isAuthenticated) {
            this.isAdmin = this.context.authService.isAdmin();
            this.currentUser = this.context.authService.getUser();
            this.getUser();
        }else {
            this.context.router.push('/');
        }
    }

    render() {
        return(
            <div className="food-form">
                <h3 className="username-greeting">Гладен ли си {this.state.user.username}?</h3>
                {
                    this.isAdmin ?
                        <button className="food-button">Всички потребители</button>
                        : null
                }
            </div>
        )
    }
}

User.propTypes = {
    route: React.PropTypes.object,
    params: React.PropTypes.object
};

User.contextTypes = {
    router: React.PropTypes.object,
    authService: React.PropTypes.object
};

export default User;