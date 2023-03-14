import React, { PureComponent, Fragment } from 'react';
import { API_KEY, AJAX_PUBLIC_REQUEST } from '../../../Constants/AppConstants';
import classnames from 'classnames';
import ValidateUnsubscribe from '../../../Validations/Unsubscribe';
import AlertWrapperSuccess from '../../Common/AlertWrapperSuccess';
import AlertWrapper from '../../Common/AlertWrapper';

class Unsubscribe extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            loading:true,
            api_key: API_KEY,
            email: '',
            not_send_non_order_email: 0,
            errors: {},
            success_alert_wrapper_show:false,
            isLoading:false,
            isFormValid:true,
            server_message:''
        }
    }

    componentDidMount() {
        this.setState({
            loading:false
        });
    }

    changeHandler = (e) => {
        this.setState({
            [e.target.name]:e.target.value
        });
    }

    changeAcceptHandler = (e) => {
        if(document.getElementById("not_send_non_order_email").checked){
            this.setState({
                not_send_non_order_email:1
            });
        }else{
            this.setState({
                not_send_non_order_email:0
            });
        }
    }

    onSubmit = (e) => {
        e.preventDefault();
        const val_return = ValidateUnsubscribe(this.state);
        // console.log(val_return);
        this.setState(val_return);
        // console.log(this.state);
        if(val_return.isValid){
            this.setState({errors: {}, isLoading: true});
            AJAX_PUBLIC_REQUEST("POST", "user/unsubscribe", this.state).then(results => {
                if(parseInt(results.response.code)===1000) {
                    this.setState({
                        server_message: results.response.message,
                        isLoading:false,
                        success_alert_wrapper_show:true,
                        isFormValid:true,
                    });	
                    document.title = results.response.data.title;	
                } else {
                    this.setState({ 
                        server_message: results.response.message,
                        isLoading:false,
                        success_alert_wrapper_show:false,
                        isFormValid:false,
                    })
                }            
            });
        }
    }

    render() { 
        const { errors, server_message, success_alert_wrapper_show } = this.state;
        const errors_data = server_message;
        return (
            <Fragment>
                {
                    this.state.loading ? 
                    <div className="loading container full_page_loader"></div>
                    :
                    <Fragment>
                        <div className="site-main">   
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-12">
                                        <main className="site-content terms_and_condition">
                                            <div className="page-content entry-content">
                                                <div className="montserrat page-title">UNSUBSCRIBE FROM EMAIL LIST</div>
                                                <div className="">
                                                <AlertWrapper errors_data={errors_data} isFormValid={this.state.isFormValid}/>
                                                <AlertWrapperSuccess errors_data={errors_data} success_alert_wrapper_show={success_alert_wrapper_show}/>
                                                <form method="post" className="lost_reset_password" onSubmit={this.onSubmit}>
                                                    <p className="user_name_email_field">
                                                        <label className={classnames(null, { 'pl_error_label': errors.email })} htmlFor="email">Email Address: <span className="required">*</span></label>
                                                        <input className={classnames("cus_field", { 'pl_error_input': errors.email })} type="text" name="email" id="email" onChange={this.changeHandler} autoComplete="username" />
                                                    </p>
                                                    <div className="clearfix"></div>
                                                    <br />
                                                    <div className="form-group">
                                                        <label className={classnames(null, { 'pl_error_checkbox': errors.not_send_non_order_email })}>
                                                            <input className={classnames(null, { 'pl_error': errors.not_send_non_order_email })} name="not_send_non_order_email" type="checkbox" id="not_send_non_order_email" value={this.state.not_send_non_order_email} onChange={this.changeAcceptHandler} /> 
                                                            <span> Do not send me non-order emails again</span>
                                                        </label>
                                                    </div>
                                                    <p className="">
                                                        <button type="submit" disabled={this.state.isLoading} className="roboto_condensed cus_button" value="UNSUBSCRIBE">{this.state.isLoading?'Please Wait...':'UNSUBSCRIBE'}</button>
                                                    </p>
                                                </form>
                                            </div>
                                            </div>
                                        </main>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Fragment>
                }
            </Fragment>
        );
    }
}
 
export default Unsubscribe;