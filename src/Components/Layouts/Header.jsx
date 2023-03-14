import React, { PureComponent, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import $ from "jquery";
import Parser from 'html-react-parser';
import history from '../../history';
import { logout } from '../../Store/actions/loginActions';
import { AJAX_PUBLIC_REQUEST, AJAX_REQUEST, REFER_URL, PUBLIC_URL, CUSTOMER_URL, DISTRIBUTOR_URL, GET_STORAGE } from '../../Constants/AppConstants';
import CustDistMenu from './MenuInclude/CustDistMenu';
import CustReferMenu from './MenuInclude/CustReferMenu';
import CustPublicMenu from './MenuInclude/CustPublicMenu';

class Header extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            showusermenu: false,
            page: '',
            menus: [],
        }

        setInterval(function () {
            if (this.props.auth) {
                if (this.props.auth.user) {
                    if (this.props.auth.user.remember) {
                        AJAX_REQUEST("POST", "user/updateAccessToken", {}).then(results => {
                            if (parseInt(results.response.code) === 1000) {
                                // console.log(results.response.code);
                            }
                        });
                    }
                }
            }
        }.bind(this), 540000);
    }

    showMenu = () => {
        this.setState({
            showusermenu: this.state.showusermenu ? false : true
        });
    }

    showMobSideMenu = () => {
        $("body").toggleClass("current", 1000);
    }

    logout = (e) => {
        e.preventDefault();
        AJAX_REQUEST("POST", "user/logout", {}).then(results => {
            /*if (parseInt(results.response.code) === 1000) { } else {
                // console.log(results.response.message);
            }*/
        });
        this.props.logout();
    }

    componentDidMount() {
        if(this.props.auth && this.props.auth.isAuthenticated){
            AJAX_REQUEST("POST", "menu/getMenuInfo", { type: 'primary', roles:this.props.auth.user.roles, active_site:this.props.auth.user.site }).then(results => {
                if (parseInt(results.response.code) === 1000) {
                    this.setState({
                        menus: results.response.data,
                    });
                }
            });
        }else{
            AJAX_PUBLIC_REQUEST("POST", "menu/getMenuInfo", { type: 'primary' }).then(results => {
                if (parseInt(results.response.code) === 1000) {
                    this.setState({
                        menus: results.response.data,
                    });
                }
            });
        }
        
        AJAX_PUBLIC_REQUEST("POST", "page/getContactInfo", {}).then(results => {
            if (parseInt(results.response.code) === 1000) {
                this.setState({
                    page: results.response.data,
                });
            }
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.props.auth){
            if(this.props.auth.isAuthenticated){
                // AJAX_REQUEST("POST", "menu/getMenuInfo", { type: 'primary' }).then(results => {
                //     if (parseInt(results.response.code) === 1000) {
                //         this.setState({
                //             menus: results.response.data,
                //         });
                //     }
                // });
                // AJAX_REQUEST("POST", "page/getContactInfo", {}).then(results => {
                //     if (parseInt(results.response.code) === 1000) {
                //         this.setState({
                //             page: results.response.data,
                //         });
                //     }
                // });
            }
        }
    }

    render() {
        const { user } = this.props.auth;
        const email = this.state.page.hasOwnProperty('email') ? Parser(this.state.page.email) : '';
        const phone = this.state.page.hasOwnProperty('phone') ? Parser(this.state.page.phone) : '';

        let settings = null;
        if (GET_STORAGE("settings")) {
            settings = JSON.parse(GET_STORAGE("settings"));
        }

        let meal_menu_active = true;
        let enable_new_signup = true;
        // if(settings && settings.enable_new_signup == "yes"){
        //     enable_new_signup = true;
        // }
        // if(settings && settings.meal_menu_public == "yes"){
        //     meal_menu_active = true;
        // }else{
        //     if(this.props){
        //         if(this.props.auth){
        //             if(this.props.auth.user){
        //                 if(this.props.auth.user.meal_menu_activated){
        //                     meal_menu_active = true;
        //                 }
        //             }
        //         }
        //     }
        // }

        return (
            <Fragment>
                <header className="montserrat site-header">
                    <div className="mob_menu_wrapper d-sm-block d-md-none">
                        <div className="site_menu_wrapper_inner">
                            <div className="mob_site_menu" onClick={this.showMobSideMenu}>
                                <ul className="mob_site_content">
                {
                    enable_new_signup?
                    <Fragment>
                    {
                        this.props.auth.isAuthenticated?
                        <Fragment>
                            {
                                ((user.roles != undefined) && (Object.values(user.roles).includes('master_affiliate') || Object.values(user.roles).includes('distributor') || Object.values(user.roles).includes('team_member')))?
                                    <CustDistMenu menus={this.state.menus} />
                                :
                                <Fragment>
                                    {
                                        user.site?
                                        <Fragment>
                                            {
                                                user.site==='refer'?
                                                <CustReferMenu menus={this.state.menus} />
                                                :<CustPublicMenu menus={this.state.menus} />
                                            }
                                        </Fragment>
                                        :
                                        ''
                                    }
                                </Fragment>
                            }
                        </Fragment>
                        :
                        ''
                    }
                    </Fragment>
                    :
                    <Fragment>
                    {
                            (this.state.menus.length <= 0 )? null :
                            this.state.menus.map(function(menu, key){
                                if(menu.type === "external"){
                                    if(menu.manual_position != 'last'){
                                        return (<li key={'dm'+key}><a target={menu.open_new_tab== "yes"?"_blank":"_self"} className={`menu_item${history.location.pathname === menu.url?' active':''}`} href={menu.url}>{menu.label}</a></li>)
                                    }
                                }else{
                                    return (<li key={'dm'+key}><NavLink activeClassName="active" className="menu_item" to={menu.url} exact>{menu.label}</NavLink></li>)
                                }
                            })
                        }

                        {
                            (this.props.auth.isAuthenticated && Object.values(user.roles).includes('distributor')) ?
                                <li key={Math.random()}><a activeClassName="active" className="menu_item" href={DISTRIBUTOR_URL+'my-account'} ><span>{enable_new_signup?'Affiliate Dashboard':'Affiliate Panel'}</span></a></li>
                                : ''
                        }

                        {
                            (this.props.auth.isAuthenticated && Object.values(user.roles).includes('team_member')) ?
                                <li key={Math.random()}><a activeClassName="active" className="menu_item" href={DISTRIBUTOR_URL+'my-account'} ><span>Team Member Panel</span></a></li>
                                : ''
                        }

                        {
                            (this.props.auth.isAuthenticated && Object.values(user.roles).includes('master_affiliate')) ?
                                <li key={Math.random()}><a activeClassName="active" className="menu_item" href={DISTRIBUTOR_URL+'my-affiliate-account'} ><span>{enable_new_signup?'Master Affiliate Dashboard':'Master Affiliate Panel'}</span></a></li>
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
                            (this.state.menus.length <= 0 )? null :
                            this.state.menus.map(function(menu, key){
                                if(menu.type === "external"){
                                    if(menu.manual_position == 'last'){
                                        return (<li key={'dm'+key}><a target={menu.open_new_tab== "yes"?"_blank":"_self"} className={`menu_item${history.location.pathname === menu.url?' active':''}`} href={menu.url}>{menu.label}</a></li>)
                                    }
                                }
                            })
                        }
                </Fragment>
            }

                                            {
                                                this.props.auth.isAuthenticated ?
                                                    <Fragment>
                                                        {
                                                            !Object.values(user.roles).includes('distributor')?
                                                            <li key={Math.random()}>
                                                                <NavLink activeClassName="active" className="menu_item" to="/my-account" exact > {enable_new_signup?'My Orders':'My Account'}</NavLink>
                                                            </li>
                                                            :''
                                                        }
                                                        
                                                        {
                                                            this.props.auth.user.activate_meal ?
                                                                <Fragment>
                                                                    {
                                                                        user.site?
                                                                        <Fragment>
                                                                            {
                                                                                user.site==='public'?
                                                                                <li key={Math.random()}>
                                                                                    <a className="menu_item" href={PUBLIC_URL+'activate-meal'} exact > Activate Meal</a>
                                                                                </li>
                                                                                :
                                                                                <Fragment>
                                                                                    {
                                                                                        user.site==='refer'?
                                                                                        <li key={Math.random()}>
                                                                                            <a className="menu_item" href={REFER_URL+'activate-meal'} exact > Activate Meal</a>
                                                                                        </li>
                                                                                        :''
                                                                                    }
                                                                                </Fragment>
                                                                            }
                                                                        </Fragment>
                                                                        :
                                                                        ''
                                                                    }
                                                                </Fragment>
                                                                : ''
                                                        }
                                                        <li key={Math.random()}>
                                                            <a onClick={this.logout} style={{ marginRight: '0' }} className="menu_item" href="#"> Logout</a>
                                                        </li>
                                                    </Fragment>
                                                    :
                                                    <Fragment>
                                                        <li key={Math.random()}>
                                                            <NavLink activeClassName="active" style={{ marginRight: '0' }} className="menu_item" to="/login" exact > Login</NavLink>
                                                        </li>
                                                    </Fragment>
                                            }
                                
                                </ul>
                            </div>
                            <div className="mob_main_user" onClick={this.showMenu}>
                                {
                                    this.state.showusermenu ?
                                        <div className="mob_main_user_wrapper">
                                            <ul>
                                                <li><NavLink to="/my-account">{enable_new_signup?'My Orders':'My Account'}</NavLink></li>
                                            </ul>
                                        </div>
                                        :
                                        null
                                }
                            </div>
                            <NavLink to="/my-account"><div className="mob_main_cart"></div></NavLink>
                        </div>

                        <div className="clearfix"></div>
                        <p className="mob_text_order topemailphonecolor">Reach us at <a href={`mailto:${email}`}>{email}</a> or <a href={`tel:${phone}`}>{phone}</a></p>
                        <div className="mob_header_logo">
                            <NavLink to="/my-account" exact strict>
                                <img src={require("../../Assets/images/prestigelabs-logo.png")} alt="Prestige Labs" />
                            </NavLink>
                        </div>
                        <div className="clearfix"></div>
                    </div>

                    <div className="hide_small_screen">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="logo-wrapper">
                                        <div className="row">
                                            <div className="col-md-4">
                                                <div className="site-logo">
                                                    <NavLink title="Prestige  Labs" activeClassName='active' to="/my-account" exact>
                                                        <img src={require("../../Assets/images/cropped-logo-1.png")} className="attachment-full size-full" alt="" title="" />
                                                    </NavLink>
                                                </div>
                                            </div>
                                            <div className="col-md-8">
                                                <div className="top-header customerTopHeader">
                                                    <div className="header-top  header_contact">
                                                        <div className="top-widgets-right">
                                                            <div className="textwidget roboto topemailphonecolor">Reach us at <a href={`mailto:${email}`}>{email}</a> or <a href={`tel:${phone}`}>{phone}</a></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <section id="scrollTop">
                            <div className="site_menu">
                                <div className="header-logo-fix">
                                    <NavLink to="/my-account" exact strict>
                                        <img src={require("../../Assets/images/logo_fix.png")} alt="Prestige  Labs" title="" />
                                    </NavLink>
                                </div>
                                <div className="container">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <nav className="primary-nav">
                                                <div className="menu-main-menu-container">
                                                    <ul id="menu-main-menu" className="menu">
                {
                    enable_new_signup?
                    <Fragment>
                    {
                        this.props.auth.isAuthenticated?
                        <Fragment>
                            {
                                ((user.roles != undefined) && (Object.values(user.roles).includes('master_affiliate') || Object.values(user.roles).includes('distributor') || Object.values(user.roles).includes('team_member')))?
                                    <CustDistMenu menus={this.state.menus} />
                                :
                                <Fragment>
                                    {
                                        user.site?
                                        <Fragment>
                                            {
                                                user.site==='refer'?
                                                <CustReferMenu menus={this.state.menus} />
                                                :<CustPublicMenu menus={this.state.menus} />
                                            }
                                        </Fragment>
                                        :
                                        ''
                                    }
                                </Fragment>
                            }
                        </Fragment>
                        :
                        ''
                    }
                    </Fragment>
                    :
                    <Fragment>
                            {
                                (this.state.menus.length <= 0 )? null :
                                this.state.menus.map(function(menu, key){
                                    if(menu.type === "external"){
                                        if(menu.manual_position != 'last'){
                                            return (<li key={'dm'+key}><a target={menu.open_new_tab== "yes"?"_blank":"_self"} className={`menu_item${history.location.pathname === menu.url?' active':''}`} href={menu.url}>{menu.label}</a></li>)
                                        }
                                    }else{
                                        return (<li key={'dm'+key}><NavLink activeClassName="active" className="menu_item" to={menu.url} exact>{menu.label}</NavLink></li>)
                                    }
                                })
                            }

                            {
                                (this.props.auth.isAuthenticated && Object.values(user.roles).includes('distributor')) ?
                                    <li key={Math.random()}><a activeClassName="active" className="menu_item" href={DISTRIBUTOR_URL+'my-account'} ><span>{enable_new_signup?'Affiliate Dashboard':'Affiliate Panel'}</span></a></li>
                                    : ''
                            }

                            {
                                (this.props.auth.isAuthenticated && Object.values(user.roles).includes('team_member')) ?
                                    <li key={Math.random()}><a activeClassName="active" className="menu_item" href={DISTRIBUTOR_URL+'my-account'} ><span>Team Member Panel</span></a></li>
                                    : ''
                            }

                            {
                                (this.props.auth.isAuthenticated && Object.values(user.roles).includes('master_affiliate')) ?
                                    <li key={Math.random()}><a activeClassName="active" className="menu_item" href={DISTRIBUTOR_URL+'my-affiliate-account'} ><span>{enable_new_signup?'Master Affiliate Dashboard':'Master Affiliate Panel'}</span></a></li>
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
                                (this.state.menus.length <= 0 )? null :
                                this.state.menus.map(function(menu, key){
                                    if(menu.type === "external"){
                                        if(menu.manual_position == 'last'){
                                            return (<li key={'dm'+key}><a target={menu.open_new_tab== "yes"?"_blank":"_self"} className={`menu_item${history.location.pathname === menu.url?' active':''}`} href={menu.url}>{menu.label}</a></li>)
                                        }
                                    }
                                })
                            }
                    </Fragment>
                }

                                            {
                                                this.props.auth.isAuthenticated ?
                                                    <Fragment>
                                                        <li className="pull-right" key={Math.random()}>
                                                            <a onClick={this.logout} style={{ marginRight: '0' }} className="menu_item" href="#"> Logout</a>
                                                        </li>
                                                        {
                                                            !Object.values(user.roles).includes('distributor')?
                                                            <li className="pull-right" key={Math.random()}>
                                                                <NavLink activeClassName="active" className="menu_item" to="/my-account" exact > {enable_new_signup?'My Orders':'My Account'}</NavLink>
                                                            </li>
                                                            :''
                                                        }
                                                        
                                                        {
                                                            this.props.auth.user.activate_meal ?
                                                                <Fragment>
                                                                    {
                                                                        user.site?
                                                                        <Fragment>
                                                                            {
                                                                                user.site==='public'?
                                                                                <li key={Math.random()} className="pull-right">
                                                                                    <a className="menu_item" href={PUBLIC_URL+'activate-meal'} exact > Activate Meal</a>
                                                                                </li>
                                                                                :
                                                                                <Fragment>
                                                                                    {
                                                                                        user.site==='refer'?
                                                                                        <li key={Math.random()} className="pull-right">
                                                                                            <a className="menu_item" href={REFER_URL+'activate-meal'} exact > Activate Meal</a>
                                                                                        </li>
                                                                                        :''
                                                                                    }
                                                                                </Fragment>
                                                                            }
                                                                        </Fragment>
                                                                        :
                                                                        ''
                                                                    }
                                                                </Fragment>
                                                                : ''
                                                        }
                                                    </Fragment>
                                                    :
                                                    <Fragment>
                                                        <li className="pull-right" key={Math.random()}>
                                                            <NavLink activeClassName="active" style={{ marginRight: '0' }} className="menu_item" to="/login" exact > Login</NavLink>
                                                        </li>
                                                    </Fragment>
                                            }
                                                    </ul>
                                                </div>
                                            </nav>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </header>
            </Fragment>
        );
    }
}

Header.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

function mapStateToProps(state) {
    return {
        auth: state.auth
    };
}

export default connect(mapStateToProps, { logout })(Header);