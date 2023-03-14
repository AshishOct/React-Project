import React, { Fragment, PureComponent } from 'react';
import { NavLink } from 'react-router-dom';
import { AJAX_REQUEST, CURRENCY_FORMAT } from "../../../Constants/AppConstants";
import Pagination from '../../Common/Pagination';

class Subscriptions extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            subscriptions: [],
            error_meg: '',
            subscription_type: '',
            filter_loading: false,
            // Pagination Config
            total_records: 0,
            total_page: 0,
            per_page: 0,
            pagenum: 1,
            status: ''
        }
        document.title = "Subscriptions -Prestige Labs";
    }

    componentDidMount() {
        document.querySelector("body").scrollIntoView() // Scroll to Top
        document.getElementById("pageTitle").innerHTML = "Subscriptions";
        const url = new URL(window.location.href);
        const status = url.searchParams.get("status");
        if (status) {
            this.setState({
                status
            });
        }
        this.getAllSubscriptions(this.state.pagenum, status);
    }

    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    pagenationHandle = (pageNumber) => {
        this.setState({ loading: true });
        this.getAllSubscriptions(pageNumber, this.state.status);
    }

    getAllSubscriptions = (pageNumber, status) => {
        let data = {
            pagenum: parseInt(pageNumber),
            status: status,
            subscription_type: this.state.subscription_type,
        }
        AJAX_REQUEST("POST", "subscription/getItems", data).then(results => {
            if (parseInt(results.response.code) === 1000) {
                this.setState({
                    loading: false,
                    filter_loading: false,
                    subscriptions: results.response.data.subscriptions,
                    // Pagination Config
                    total_records: parseInt(results.response.data.total_records),
                    total_page: parseInt(results.response.data.total_page),
                    per_page: parseInt(results.response.data.per_page),
                    pagenum: parseInt(results.response.data.pagenum),
                    error_meg: results.response.message,
                });
            } else {
                this.setState({
                    loading: false,
                    filter_loading: false,
                    error_meg: results.response.message,
                    subscriptions: [],
                    // Pagination Config
                    total_records: 0,
                    total_page: 0,
                    per_page: 0,
                    pagenum: 1,
                });
            }
        });
    }

    onSubmitHandler = e => {
        e.preventDefault();
        const subscription_type = document.getElementById("subscription_type").value;
        this.setState({
            loading: true,
            filter_loading: true,
            subscription_type: subscription_type,
        });
        this.getAllSubscriptions(1, this.state.status);
    };

    render() {
        return (
            <Fragment>
                <div className="woocommerce-MyAccount-content inner_content">
                    {
                        (this.state.loading) ?
                            <div className="loading"></div>
                            :
                            <Fragment>
                                <div className="table_search">
                                    <form onSubmit={this.onSubmitHandler} method="get">
                                        <label>Order Type</label>
                                        <select onChange={this.changeHandler} id="subscription_type" className="cus_field" name="subscription_type" defaultValue={this.state.subscription_type} style={{ width: "200px" }}>
                                            <option value="">All</option>
                                            <option value="supplement">Product</option>
                                            <option value="meal">Meal</option>
                                        </select>
                                        <input className="roboto_condensed cus_button" type="submit" name="action" value={this.state.filter_loading ? "Searching..." : "Search"} />
                                    </form>
                                </div>
                                <table className="my_account_orders shop_table_responsive">
                                    <thead>
                                        <tr>
                                            <th className="order-number"><span className="nobr">Subscription</span></th>
                                            <th className="order-date"><span className="nobr">Status</span></th>
                                            <th className="order-type"><span className="nobr">Order Type</span></th>
                                            <th className="order-status"><span className="nobr">Next Payment</span></th>
                                            <th className="order-total"><span className="nobr">Total</span></th>
                                            <th className="order-actions"><span className="nobr">&nbsp;</span>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            (this.state.subscriptions.length <= 0) ?
                                                <tr><td className="text-center" colSpan="6">{this.state.error_meg}</td></tr>
                                                :
                                                this.state.subscriptions.map(function (subscription, key) {
                                                    return (
                                                        <Fragment key={'s' + key}>
                                                            <tr className="order">
                                                                <td className="order-number" data-title="Subscription">
                                                                    <NavLink to={`/my-account/related-subscription/${subscription.hasOwnProperty('subscription_id') ? subscription.subscription_id : ''} `}> {'#'}
                                                                        {subscription.hasOwnProperty('subscription_id') ? subscription.subscription_id : ''}
                                                                    </NavLink>
                                                                </td>
                                                                <td className="order-status toTitleCase" data-title="Status">
                                                                    {subscription.hasOwnProperty('status') ? subscription.status : ''}
                                                                </td>
                                                                <td className="order-status toTitleCase" data-title="Order Type">
                                                                    {(subscription.subscription_type == 'supplement') ? 'Product' : 'Meal'}
                                                                </td>
                                                                <td className="order-status" data-title="Next Payment">
                                                                    {subscription.hasOwnProperty('next_payment') ? subscription.next_payment : ''}
                                                                </td>
                                                                <td className="order-total" data-title="Total">
                                                                    <span>
                                                                        {subscription.hasOwnProperty('subscription_total') ? CURRENCY_FORMAT(subscription.subscription_total) : ''} / <span className="per_month">{subscription.subscription_duration}</span>
                                                                    </span>
                                                                </td>
                                                                <td className="order-actions" data-title="&nbsp;">
                                                                    <NavLink className="roboto_condensed wc-forward" to={`/my-account/related-subscription/${subscription.hasOwnProperty('subscription_id') ? subscription.subscription_id : ''} `}>View</NavLink>
                                                                </td>
                                                            </tr>
                                                        </Fragment>
                                                    )
                                                })
                                        }
                                    </tbody>
                                </table>

                                <Pagination
                                    pagenationHandle={this.pagenationHandle}
                                    total_records={this.state.total_records}
                                    total_page={this.state.total_page}
                                    per_page={this.state.per_page}
                                    pagenum={this.state.pagenum}
                                />
                            </Fragment>
                    }

                    <div className="woocommerce-notices-wrapper"></div>
                </div>
            </Fragment>

        );
    }
}

export default Subscriptions;