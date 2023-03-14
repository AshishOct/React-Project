import React, { PureComponent, Fragment } from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import LoginForm from './LoginForm';
import history from '../../history';
import { logout } from '../../Store/actions/loginActions';
import { alertMessageRemoval } from '../../Store/actions/signupActions';

import {ECOM_URL, AJAX_REQUEST, REFER_URL} from '../../Constants/AppConstants';


class Login extends PureComponent {
    constructor(props){
        super(props);
        this.state = {
            loading:true
        }
        if(this.props.isAuthenticated){
            AJAX_REQUEST("POST","user/details",{}).then(results => {
                const response = results.response;
                if(parseInt(response.code)===1000){
                    history.push('/');
                }else{
                    this.props.logout();
                }
            });
        }
        document.title = "Login - Prestige Labs";
    }

    componentDidMount(){
        document.querySelector("body").scrollIntoView();
        this.setState({
            loading:false
        });
    }

    render() { 
        return (
            <Fragment>
                {
                        this.state.loading ? 
                        <div className="loading"></div>
                        :
                        <React.Fragment>
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12">
                                    <main className="">
                                        <div className="user_login">
                                            <h2 className="montserrat">Login</h2>
                                            <LoginForm  />
                                            <div className="clearfix"></div>
                                            <span className="return_to_main_site"><a href={REFER_URL}>Return to main site</a></span>
                                        </div>
                                    </main>
                                </div>
                            </div>
                        </div>
                    </React.Fragment>
                    }
            </Fragment>
            
        );
    }
}

Login.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    logout:PropTypes.func.isRequired,
    alertMessageRemoval:PropTypes.func.isRequired,
}

function mapStateToProps(state) {
    return{
        isAuthenticated: state.auth.isAuthenticated
    }
}

export default connect(mapStateToProps, { logout, alertMessageRemoval })(Login);

// export default Login;