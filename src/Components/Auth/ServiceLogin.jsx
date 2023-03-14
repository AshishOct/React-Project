import React, { PureComponent, Fragment } from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { serviceLoginRequest } from '../../Store/actions/signupActions';
import { serviceLogout } from '../../Store/actions/loginActions';
import ServiceLoginAction from './ServiceLoginAction';
import history from '../../history';

class ServiceLogin extends PureComponent {
    constructor(props) {
        super(props);
        document.title = "Login - Prestige Labs";
        // if(this.props.isAuthenticated){
        //     history.push('/');
        // }
    }
    render() { 
        const { serviceLoginRequest } = this.props;
        const { serviceLogout } = this.props;
        return (
            <Fragment>
            <div className="loading"></div>
            <ServiceLoginAction  serviceLoginRequest={serviceLoginRequest} serviceLogout={serviceLogout} />
            </Fragment>
        );
    }
}

ServiceLogin.propTypes = {
    serviceLoginRequest:PropTypes.func.isRequired,
    serviceLogout:PropTypes.func.isRequired,
    // isAuthenticated: PropTypes.bool.isRequired,
}

// function mapStateToProps(state) {
//     return{
//         isAuthenticated: state.auth.isAuthenticated
//     }
// }

export default connect(null, { serviceLoginRequest, serviceLogout })(ServiceLogin);
 
// export default ServiceLogin;