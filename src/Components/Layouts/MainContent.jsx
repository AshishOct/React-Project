import React, { Fragment, PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import history from '../../history';
import CustomerRoutes from '../../Routes/CustomerRoutes';

class MainContent extends PureComponent {
    componentWillMount(){
        if(!this.props.auth.isAuthenticated){
            history.push('/login');
        }
    }

    render() {
        const { user } = this.props.auth;
        if((user.roles != undefined) && Object.values(user.roles).includes('customer')){
            return (
                <CustomerRoutes />
            );
        }else{
            return null;
        }
    }
}
 

MainContent.propTypes = {
    auth: PropTypes.object.isRequired
}
  
function mapStateToProps(state) {
    return {
        auth: state.auth
    };
}

export default withRouter(connect(mapStateToProps)(MainContent));