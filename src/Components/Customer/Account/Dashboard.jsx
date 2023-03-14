import React,{PureComponent} from 'react';
import { NavLink } from "react-router-dom";
import {AJAX_REQUEST, GET_STORAGE} from "../../../Constants/AppConstants";

class Dashboard extends PureComponent {
    constructor(props){
        super(props)
        this.state = {
            loading: true,
            userInfo: [],
            errorMeg: '',
            role:'customer'          
        }

        let settings = null;
        if (GET_STORAGE("settings")) {
            settings = JSON.parse(GET_STORAGE("settings"));
        }
        if(settings && settings.enable_new_signup == "yes"){
            document.title = "My Orders -Prestige Labs";
        }else{
            document.title = "My Account -Prestige Labs";
        }
        
    }

    componentDidMount() {
        document.querySelector("body").scrollIntoView();

        let settings = null;
        if (GET_STORAGE("settings")) {
            settings = JSON.parse(GET_STORAGE("settings"));
        }
        if(settings && settings.enable_new_signup == "yes"){
            document.getElementById("pageTitle").innerHTML = "My Orders";
        }else{
            document.getElementById("pageTitle").innerHTML = "My Account";
        }
        this.getUserInfo();
    }

    getUserInfo= ()=>{
		AJAX_REQUEST("POST", "customer/dashboard", {}).then(results => {
            if(parseInt(results.response.code)===1000) {
                this.setState({
                    loading: false,
                    userInfo: results.response.data
                });		
            } else {
                this.setState({
                    loading: false,
                    errorMeg:results.response.message
                })
            }            
        });
    }

    render() { 
        return ( 
            <React.Fragment>
                {
                    (this.state.loading)? 
                    <div className="loading"></div>
                    :
                    <React.Fragment>
                    <div className="pull-left order_aside">
                        <ul>
                            <li>Total Orders: <NavLink to={`/my-account/orders`}>{this.state.userInfo.hasOwnProperty('total_orders') ? this.state.userInfo.total_orders: ''}</NavLink></li>
                            <li>Total Subscriptions: <NavLink to={`/my-account/subscriptions`}>{this.state.userInfo.hasOwnProperty('total_subscriptions') ? this.state.userInfo.total_subscriptions: ''}</NavLink></li>
                            <li>Active Subscriptions: <NavLink to={`/my-account/subscriptions?status=active`}>{this.state.userInfo.hasOwnProperty('active_subscriptions') ? this.state.userInfo.active_subscriptions: ''}</NavLink></li>
                        </ul>
                    </div>
                    <div className="clearfix"></div>
                    </React.Fragment>
                }
            </React.Fragment>
         );
    }
}
 
export default Dashboard;