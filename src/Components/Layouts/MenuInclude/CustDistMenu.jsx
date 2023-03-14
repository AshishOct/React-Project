import React, { Component, Fragment } from 'react';
import { AJAX_PUBLIC_REQUEST, AJAX_REQUEST, REFER_URL, PUBLIC_URL, CUSTOMER_URL, DISTRIBUTOR_URL, GET_STORAGE } from '../../../Constants/AppConstants';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class CustDistMenu extends Component {
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
                    (this.props.menus.length <= 0) ? null :
                        this.props.menus.map(function (menu, key) {

                            if ((user.roles != undefined) && Object.values(user.roles).includes('master_affiliate') && !Object.values(user.roles).includes('distributor')) {
                                if ((menu.url === '') || (menu.url === '/') || (menu.url === '/meals')) {

                                } else {
                                    if (menu.type === "external") {
                                        if(menu.manual_position != 'last'){
                                            return (
                                                <li key={'ddm' + key}><a target={menu.open_new_tab== "yes"?"_blank":"_self"} className="menu_item" href={menu.url}>{menu.label}</a></li>
                                            );
                                        }
                                    } else {
                                        if (menu.url === "/my-account") {
                                            console.log('if',menu.slug2)
                                            return (
                                                <li key={'ddm' + key}><a className="menu_item" href={DISTRIBUTOR_URL+menu.slug2}>{enable_new_signup?'Master Affiliate Dashboard':'Master Affiliate Panel'}</a></li>)
                                        } else {
                                            console.log('else',menu.slug2)
                                            return (
                                            <li key={'ddm' + key}><a className="menu_item" href={DISTRIBUTOR_URL+menu.slug2}>{menu.label}</a></li>)
                                        }
                                    }
                                }
                            } else {
                                if (menu.type === "external") {
                                    if(!menu.url == 'https://gymlaunch.com/shop/'){
                                        return (
                                            <li key={'ddm' + key}><a target={menu.open_new_tab== "yes"?"_blank":"_self"} className="menu_item" href={menu.url}>{menu.label}</a></li>
                                        );
                                    }
                                } else {
                                    if (menu.url === "/my-account") {
                                        if ((user.roles != undefined) && Object.values(user.roles).includes('distributor')) {
                                            return (
                                            <li key={'ddm' + key}><a className="menu_item" href={DISTRIBUTOR_URL+menu.slug2}>{enable_new_signup?'Affiliate Dashboard':'Affiliate Panel'}</a></li>)
                                        } else {
                                            return (<li key={'ddm' + key}><a className="menu_item" href={DISTRIBUTOR_URL+menu.slug2}>Team Member Panel</a></li>)
                                        }
                                    } else {
                                        if(menu.url === "/meals"){
                                            if(meal_menu_active){
                                                return (<li key={'ddm' + key}><a className="menu_item" href={DISTRIBUTOR_URL+menu.slug2}>{menu.label}</a></li>)
                                            }else{
                                                return null
                                            }
                                        }else{
                                            return (<li key={'ddm' + key}><a className="menu_item" href={DISTRIBUTOR_URL+menu.slug2}>{menu.label}</a></li>)
                                        }
                                    }
                                }
                            }

                        })
                }

                {
                    (this.props.auth.isAuthenticated && Object.values(user.roles).includes('distributor') && Object.values(user.roles).includes('master_affiliate')) ?
                        <li key={Math.random()}><a className="menu_item" href={DISTRIBUTOR_URL+'my-affiliate-account'}>{enable_new_signup?'Master Affiliate Dashboard':'Master Affiliate Panel'}</a></li>
                        : ''
                }

                {
                    (this.props.auth.isAuthenticated && Object.values(user.roles).includes('customer')) ?
                    <li key={Math.random()}><NavLink activeClassName="active" className="menu_item" to="/my-account" exact>{enable_new_signup?'My Orders':'My Account'}</NavLink></li>
                        : ''
                }

                {
                    (this.props.auth.isAuthenticated && (Object.values(user.roles).includes('master_affiliate') || Object.values(user.roles).includes('distributor'))) ?
                        <li key={Math.random()}><a className="menu_item" href="https://prestigelabs.mykajabi.com/" target='_blank'>Training</a></li>
                        : ''
                }

                {
                    (this.props.auth.isAuthenticated && Object.values(user.roles).includes('team_member')) ?
                        <li key={Math.random()}><a className="menu_item" href="https://prestigelabs.mykajabi.com/" target='_blank'>Training</a></li>
                        : ''
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
                    (this.props.menus.length <= 0) ? null :
                    this.props.menus.map(function (menu, key) {
                        if (menu.type === "external") {
                            if(menu.manual_position == 'last'){
                                return (
                                    <li key={'ddm' + key}><a target={menu.open_new_tab== "yes"?"_blank":"_self"} className="menu_item" href={menu.url}>{menu.label}</a></li>
                                );
                            }
                        }
                    })
                }
            </Fragment>
        );
    }
}

CustDistMenu.propTypes = {
    auth: PropTypes.object.isRequired
}

function mapStateToProps(state) {
    return {
        auth: state.auth
    };
}

export default connect(mapStateToProps)(CustDistMenu);