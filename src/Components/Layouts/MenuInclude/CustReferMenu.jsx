import React, { Component, Fragment } from 'react';
import { AJAX_PUBLIC_REQUEST, AJAX_REQUEST, REFER_URL, PUBLIC_URL, CUSTOMER_URL, DISTRIBUTOR_URL, GET_STORAGE } from '../../../Constants/AppConstants';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class CustReferMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        const { user } = this.props.auth;

        let settings = null;
        if (GET_STORAGE("settings")) {
            settings = JSON.parse(GET_STORAGE("settings"));
        }

        let meal_menu_active = false;
        let enable_new_signup = false;
        if(settings && settings.enable_new_signup == "yes"){
            enable_new_signup = true;
        }
        if(settings && settings.meal_menu_public == "yes"){
            meal_menu_active = true;
        }else{
            if(this.props){
                if(this.props.auth){
                    if(this.props.auth.user){
                        if(this.props.auth.user.meal_menu_activated){
                            meal_menu_active = true;
                        }
                    }
                }
            }
        }
        
        return (
            <Fragment>
                {
                    this.props.menus.length <= 0 ? null
                    : this.props.menus.map(function (menu, key) {
                        if (menu.type === "external") {
                            if(menu.manual_position != 'last'){
                                return (
                                    <li key={'dm' + key}><a target={menu.open_new_tab== "yes"?"_blank":"_self"} className="menu_item" href={menu.url}>{menu.label}</a></li>
                                );
                            }
                        } else {
                            if (menu.url == "/meals") {
                                if (meal_menu_active) {
                                    return (
                                        <li key={'dm' + key}><a className="menu_item" href={REFER_URL+menu.slug2}>{menu.label}</a></li>
                                    );
                                } else {
                                    return null;
                                }
                            } else {
                                return (
                                    <li key={'dm' + key}><a className="menu_item" href={REFER_URL+menu.slug2}>{menu.label}</a></li>
                                );
                            }
                        }
                    })
                }

                {
                    user.site?
                    <Fragment>
                        {
                            user.site==='refer'?
                            <li key={Math.random()}><a className="menu_item" href={REFER_URL}>Shop</a></li>
                            :<li key={Math.random()}><a className="menu_item" href={PUBLIC_URL}>Shop</a></li>
                        }
                    </Fragment>
                    :
                    ''
                }

                {
                    this.props.menus.length <= 0 ? null
                    : this.props.menus.map(function (menu, key) {
                        if (menu.type === "external") {
                            if(menu.manual_position == 'last'){
                                return (
                                    <li key={'dm' + key}><a target={menu.open_new_tab== "yes"?"_blank":"_self"} className="menu_item" href={menu.url}>{menu.label}</a></li>
                                );
                            }
                        }
                    })
                }
            </Fragment>
        );
    }
}

CustReferMenu.propTypes = {
    auth: PropTypes.object.isRequired
}

function mapStateToProps(state) {
    return {
        auth: state.auth
    };
}

export default connect(mapStateToProps)(CustReferMenu);