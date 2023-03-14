import React, { Fragment, PureComponent } from 'react';
import { NavLink } from 'react-router-dom';
import { AJAX_REQUEST, CURRENCY_FORMAT, REFER_URL, PUBLIC_URL } from "../../../Constants/AppConstants";
import Pagination from '../../Common/Pagination';
import { connect } from 'react-redux';

class Orders extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            orders: [],
            error_meg: '',

            order_status_arr: [],
            order_status: '',
            order_type: '',
            filter_loading: false,
            // Pagination Config
            total_records: 0,
            total_page: 0,
            per_page: 0,
            pagenum: 1,
        }
        document.title = "Orders -Prestige Labs";
    }

    componentDidMount() {
        document.querySelector("body").scrollIntoView() // Scroll to Top
        document.getElementById("pageTitle").innerHTML = "Orders";
        this.getOrderStatus();
        this.getAllOrders(this.state.pagenum);
    }

    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    pagenationHandle = (pageNumber) => {
        this.setState({ loading: true });
        this.getAllOrders(pageNumber);
    }

    getAllOrders = (pageNumber) => {
        let data = {
            pagenum: parseInt(pageNumber),
            order_status: this.state.order_status,
            order_type: this.state.order_type,
        }
        AJAX_REQUEST("POST", "order/getList", data).then(results => {
            if (parseInt(results.response.code) === 1000) {
                this.setState({
                    loading: false,
                    filter_loading: false,
                    orders: results.response.data.orders,
                    error_meg: results.response.message,
                    // Pagination Config
                    total_records: parseInt(results.response.data.total_records),
                    total_page: parseInt(results.response.data.total_page),
                    per_page: parseInt(results.response.data.per_page),
                    pagenum: parseInt(results.response.data.pagenum),
                });
            } else {
                this.setState({
                    loading: false,
                    filter_loading: false,
                    error_meg: results.response.message,
                    orders: [],
                    // Pagination Config
                    total_records: 0,
                    total_page: 0,
                    per_page: 0,
                    pagenum: 1,
                });
            }
        });
    }

    getOrderStatus = () => {
        AJAX_REQUEST("POST", "order/getOrderStatus", {}).then(results => {
            if (parseInt(results.response.code) === 1000) {
                this.setState({ order_status_arr: results.response.data })
            } else {
                this.setState({ order_status_arr: [] })
            }
        });
    }

    onSubmitHandler = e => {
        e.preventDefault();
        const order_status = document.getElementById("order_status").value;
        const order_type = document.getElementById("order_type").value;
        this.setState({
            loading: true,
            filter_loading: true,
            order_status: order_status,
            order_type: order_type,
        });
        this.getAllOrders(1);
    };

    render() {
        const user = this.props.user;
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
                                        <select onChange={this.changeHandler} id="order_type" className="cus_field" name="order_type" defaultValue={this.state.order_type} style={{ width: "200px" }}>
                                            <option value="">All</option>
                                            <option value="supplement">Product</option>
                                            <option value="meal">Meal</option>
                                        </select>
                                        <label> &nbsp; Order Status &nbsp; </label>
                                        <select id="order_status" onChange={this.changeHandler} className="cus_field toTitleCase" name="order_status" defaultValue={this.state.order_status} >
                                            <option value="">Order Status</option>
                                            {
                                                this.state.order_status_arr.length <= 0 ? null :
                                                    Object.keys(this.state.order_status_arr).map(function (status, key) {
                                                        return (
                                                            <option value={status} key={key}>{status}</option>
                                                        )
                                                    })
                                            }
                                        </select>
                                        <input className="roboto_condensed cus_button" type="submit" name="action" value={this.state.filter_loading ? "Searching..." : "Search"} />
                                    </form>
                                </div>
                                <table className="my_account_orders shop_table_responsive">
                                    <thead>
                                        <tr>
                                            <th className="order-number"><span className="nobr">Order</span></th>
                                            <th className="order-date"><span className="nobr">Date</span></th>
                                            <th className="order-status"><span className="nobr">Status</span></th>
                                            <th className="order-status"><span className="nobr">Order Type</span></th>
                                            <th className="order-total"><span className="nobr">Total</span></th>
                                            <th className="order-actions"><span className="nobr">&nbsp;</span>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            (this.state.orders.length <= 0) ?
                                                <tr><td className="text-center" colSpan="6">{this.state.error_meg}</td></tr>
                                                :
                                                this.state.orders.map(function (order, key) {
                                                    return (
                                                        <Fragment key={'o' + key}>
                                                            <tr className="order">
                                                                <td className="order-number" data-title="Order">
                                                                    <NavLink to={`/my-account/order-details/${order.hasOwnProperty('order_id') ? order.order_id : ''} `}> {'#'}
                                                                        {order.hasOwnProperty('order_id') ? order.order_id : ''}
                                                                    </NavLink>
                                                                </td>
                                                                <td className="order-date" data-title="Date">
                                                                    <time dateTime="2018-12-14T02:41:13+00:00">
                                                                        {order.hasOwnProperty('date') ? order.date : ''}
                                                                    </time>
                                                                </td>
                                                                <td className="order-status toTitleCase" data-title="Status">
                                                                    {order.hasOwnProperty('status') ? order.status : ''}
                                                                </td>
                                                                <td className="order-type toTitleCase" data-title="Order Type">
                                                                    {(order.order_type == 'supplement') ? 'Product' : 'Meal'}
                                                                </td>
                                                                <td className="order-total" data-title="Total">
                                                                    <span>
                                                                        {order.hasOwnProperty('total') ? CURRENCY_FORMAT(order.total) : ''} &nbsp;
                                                                    </span>
                                                                    {order.hasOwnProperty('items') ? order.items : ''}
                                                                </td>
                                                                <td className="order-actions" data-title="&nbsp;">
                                                                    <NavLink className="roboto_condensed wc-forward" to={`/my-account/order-details/${order.hasOwnProperty('order_id') ? order.order_id : ''} `}>View</NavLink>
                                                                    {/* {
                                                                        (order.order_type == 'meal' && user) ?
                                                                            <Fragment>
                                                                                {
                                                                                    user.site == 'refer' ?
                                                                                        <a className="roboto_condensed wc-forward" href={`${REFER_URL}serviceLogin?token=${user.token}&redirect=/reorder/${order.order_id}`}>Reorder</a>
                                                                                        :
                                                                                        <a className="roboto_condensed wc-forward" href={`${PUBLIC_URL}serviceLogin?token=${user.token}&redirect=/reorder/${order.order_id}`}>Reorder</a>
                                                                                }
                                                                            </Fragment>
                                                                            : ''
                                                                    } */}
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

function mapStateToProps(state) {
    return {
        user: state.auth.user
    }
}

export default connect(mapStateToProps, null)(Orders);