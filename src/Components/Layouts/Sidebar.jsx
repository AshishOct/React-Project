import React, { PureComponent, Fragment } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CustSideMenuLink from '../Customer/Layouts/CustSideMenuLink';
import { logout } from '../../Store/actions/loginActions';
import { AJAX_REQUEST } from '../../Constants/AppConstants';

class Sidebar extends PureComponent {
    constructor(props){
        super(props)
        this.state = {
          
        }
    }

    logout = (e) => {
        e.preventDefault();
        AJAX_REQUEST("POST", "user/logout", {}).then(results => {
           /* if(parseInt(results.response.code)===1000){}else{
                // console.log(results.response.message);
            }*/
        });
        this.props.logout();
    }

    onCliclActive = (e) => {
        const elements = document.querySelectorAll('.left_menu ul li');
        [].forEach.call(elements, function(el) {
            el.classList.remove("active");
        });
        e.currentTarget.classList.add('active');
        document.getElementById("nav-for-scroll").scrollIntoView();
    }

    render() { 
        const { user } = this.props.auth;
        return ( 
            <Fragment>
                <nav className="left_menu">
                    <ul>
                        <li>
                            <NavLink to="/my-account" activeClassName="active" exact><i className="fa fa-tachometer" aria-hidden="true"></i> Dashboard</NavLink>
                        </li>
                        {((user.roles != undefined) && Object.values(user.roles).includes('customer')) && 
                            <CustSideMenuLink />
                        }
                        <li className="">
                            <a onClick={this.logout} href="#"><i className="fa fa-sign-out" aria-hidden="true"></i> Logout</a>
                        </li>
                    </ul>
                </nav>
            </Fragment>
         );
    }
}

Sidebar.propTypes = {
    logout:PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

function mapStateToProps(state) {
    return {
        auth: state.auth
    };
}

export default withRouter(connect(mapStateToProps, { logout })(Sidebar));