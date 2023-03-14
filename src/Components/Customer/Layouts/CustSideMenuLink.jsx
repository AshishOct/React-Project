import React, { PureComponent, Fragment } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import $ from "jquery";

class CustSideMenuLink extends PureComponent {

    render() {
        return ( 
            <Fragment>
                <li>
                    <NavLink to="/my-account/orders" activeClassName="active"><i className="fa fa-calendar-check-o" aria-hidden="true"></i> Orders</NavLink>
                </li>
                <li>
                    <NavLink to="/my-account/subscriptions" activeClassName="active"><i className="fa fa-calendar-check-o" aria-hidden="true"></i> Subscriptions</NavLink>
                </li>
                <li>
                    <NavLink to="/my-account/edit-addresses" activeClassName="active"><i className="fa fa-map-marker" aria-hidden="true"></i> Addresses</NavLink>
                </li>
                <li>
                    <NavLink to="/my-account/edit-account-details" activeClassName="active"><i className="fa fa-user" aria-hidden="true"></i> Account Details</NavLink>
                </li>
                <li>
                    <NavLink to="/my-account/my-cards" activeClassName="active"><i className="fa fa-credit-card" aria-hidden="true"></i> My Cards</NavLink>
                </li>
            </Fragment>
         );
    }
}

export default  withRouter(CustSideMenuLink);