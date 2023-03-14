import React, { Component } from 'react';
import { SET_COOKIE, ENABLE_MEAL } from '../Constants/AppConstants';
import { Route, Switch } from 'react-router-dom';
import requireCustAuth from '../Utils/requireCustAuth';

import Login from '../Components/Auth/Login';
import ServiceLogin from '../Components/Auth/ServiceLogin';
import PasswordReset from '../Components/Auth/PasswordReset';
import NewPasswordReset from '../Components/Auth/NewPasswordReset';
import GetInTouch from '../Components/Customer/Pages/GetInTouch';
import SubscriptionItem from '../Components/Customer/SubsCart/SubscriptionItem';
import SubscriptionCart from '../Components/Customer/SubsCart/SubscriptionCart';
import Home from "../Components/Customer/Pages/Home";
import Page from "../Components/Customer/Pages/Page";
import Unsubscribe from "../Components/Customer/Pages/Unsubscribe";
import ChangeMealsItem from "../Components/Customer/SubsCart/ChangeMealsItem";

import PageNotFound from '../Components/Customer/Pages/PageNotFound';
import Downtime from '../Components/Pages/Downtime';

class CommonRoutes extends Component {

    constructor(props) {
        super(props)
        const url = new URL(window.location.href);
        const af = url.searchParams.get("af");
        if (af) {
            SET_COOKIE('af', af);
        }
    }

    render() {
        const cur_url = window.location.href;
        return (
            <Switch>
                <Route path='/login' component={Login} exact strict />
                <Route path='/serviceLogin' component={ServiceLogin} exact strict />
                <Route path='/password-reset' component={PasswordReset} exact strict />
                <Route path='/password-reset/:code' component={NewPasswordReset} exact strict />
                <Route path='/contact' component={GetInTouch} exact strict />
                <Route path='/' component={Home} exact strict />
                <Route path='/subscription-item/:id' component={requireCustAuth(SubscriptionItem)} exact strict />
                <Route path='/subscription-cart/:id' component={requireCustAuth(SubscriptionCart)} exact strict />
                <Route path='/meals' component={requireCustAuth(ChangeMealsItem)} exact strict />
                <Route path='/unsubscribe' component={Unsubscribe} exact strict />
                <Route path='/page/:slug' component={Page} exact strict />
                <Route path='/error' component={Downtime} exact strict />

                {
                    (cur_url.match(/my-account/g)) ? ""
                        : <Route component={PageNotFound} exact strict />
                }

            </Switch>
        );
    }
}

export default CommonRoutes;