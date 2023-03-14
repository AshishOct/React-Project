import React, { Fragment, PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import Sidebar from './Sidebar';
import MainContent from './MainContent';
import ReactImageFallback from "react-image-fallback";
import { GET_STORAGE } from '../../Constants/AppConstants';

class DashboardComponent extends PureComponent {
    constructor (props){
        super(props)
        this.state= {
            loading: true,
        }
    }

    componentDidMount() {
        this.setState({
            loading: false
        })
    }

    render() { 
        const cur_url = window.location.href;
        if(cur_url.match(/my-account/g)) {

            let offer_banner_showing_status = false;
            let offer_banner_image = require('../../Assets/images/slideshow_3.jpg');
            let offer_banner_showing_status_storage = GET_STORAGE('settings');
            if(offer_banner_showing_status_storage){
                offer_banner_showing_status_storage = JSON.parse(offer_banner_showing_status_storage);
                if(offer_banner_showing_status_storage){
                    if(offer_banner_showing_status_storage.offer_banner_showing_status && offer_banner_showing_status_storage.offer_banner_showing_status =="yes"){
                        offer_banner_showing_status = true;
                        offer_banner_image = offer_banner_showing_status_storage.offer_banner_image;
                    }
                }
            }

            return (
                <div className="site-main">   
                    <main>
                        <div className="page-content entry-content">
                            <div className="container">
                                <div className="row">

                                    {
                                        offer_banner_showing_status?
                                        <div className="col-md-12 home-banner-img">
                                            <ReactImageFallback
                                                src={offer_banner_image}
                                                fallbackImage={require("../../Assets/images/preloader.gif")}
                                                initialImage={require("../../Assets/images/preloader.gif")}
                                                alt="banner img"
                                                className=""
                                            />
                                        </div>
                                        :''
                                    }

                                    <div className="col-md-12 montserrat page-title" id="pageTitle">My Account</div>
                                    </div>
                                    <div className="row">
                                    <div className="col-xs-12 col-sm-4 col-md-4 col-lg-3">
                                        <Sidebar />
                                    </div>

                                    <div className="col-xs-12 col-sm-8 col-md-8 col-lg-9">
                                        <MainContent />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            );
        }else{
            return (
                <Fragment>
                    {
                        (this.state.loading) ?
                        <div className="loading"></div>
                        :
                        ''
                    }
                </Fragment>
            )
        }
            
    }
}

export default withRouter(DashboardComponent);