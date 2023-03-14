import React from 'react';
import { Route, Switch } from 'react-router-dom';
import requireCustAuth from '../Utils/requireCustAuth';

import Dashboard from '../Components/Customer/Account/Dashboard';
import Orders from '../Components/Customer/Account/Orders';
import OrderDetails from '../Components/Customer/Account/OrderDetails';
import Subscriptions from '../Components/Customer/Account/Subscriptions';
import RelatedSubscription from '../Components/Customer/Account/RelatedSubscription';
import ChangeSubscriptionAddress from '../Components/Customer/Account/ChangeSubscriptionAddress';
import EditAddresses from '../Components/Customer/Account/EditAddresses';
import EditBillingAddress from '../Components/Customer/Account/EditBillingAddress';
import EditShippingAddress from '../Components/Customer/Account/EditShippingAddress';
import EditAccountDetails from '../Components/Customer/Account/EditAccountDetails';
import MyCards from '../Components/Customer/Account/MyCards';

import SubscriptionCancellation from '../Components/Customer/Account/SubscriptionCancellation';
import SubscriptionCancellationDetails from '../Components/Customer/Account/SubscriptionCancellationDetails';
import SubscriptionCancellationBillingUpdate from '../Components/Customer/Account/SubscriptionCancellationBillingUpdate';
import SubscriptionCancellationConfirm from '../Components/Customer/Account/SubscriptionCancellationConfirm';

import PageNotFound from '../Components/Customer/Pages/PageNotFound';

const CustomerRoutes = () => {
    const cur_url = window.location.href;
    return(
        <Switch>           
            <Route path='/my-account/orders' component={requireCustAuth(Orders)} exact strict />
            <Route path='/my-account/order-details/:id' component={requireCustAuth(OrderDetails)} exact strict />
            <Route path='/my-account/related-subscription/:subscription_id' component={requireCustAuth(RelatedSubscription)} exact strict />
            <Route path='/my-account/subscriptions' component={requireCustAuth(Subscriptions)} exact strict />
            <Route path='/my-account/change-subscription-address/:subscription_id' component={requireCustAuth(ChangeSubscriptionAddress)} exact strict />            
            <Route path='/my-account/edit-addresses' component={requireCustAuth(EditAddresses)} exact strict />
            <Route path='/my-account/edit-addresses/billing' component={requireCustAuth(EditBillingAddress)} exact strict />
            <Route path='/my-account/edit-addresses/shipping' component={requireCustAuth(EditShippingAddress)} exact strict />
            <Route path='/my-account/edit-account-details' component={requireCustAuth(EditAccountDetails)} exact strict />
            <Route path='/my-account/my-cards' component={requireCustAuth(MyCards)} exact strict />
            <Route path='/my-account' component={requireCustAuth(Dashboard)} exact strict/>

            <Route path='/my-account/subscription-cancellation/:subscription_id' component={requireCustAuth(SubscriptionCancellation)} exact strict />
            <Route path='/my-account/subscription-cancellation/:subscription_id/details' component={requireCustAuth(SubscriptionCancellationDetails)} exact strict />
            <Route path='/my-account/subscription-cancellation/:subscription_id/billing-update' component={requireCustAuth(SubscriptionCancellationBillingUpdate)} exact strict />
            <Route path='/my-account/subscription-cancellation/:subscription_id/cancellation' component={requireCustAuth(SubscriptionCancellationConfirm)} exact strict />
            
            {                    
                (cur_url.match(/my-account/g))?
                <Route component={PageNotFound} exact strict />
                : ""
            } 
            
        </Switch>
    );
};

export default CustomerRoutes;