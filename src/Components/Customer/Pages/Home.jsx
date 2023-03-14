import React, { PureComponent } from 'react';
import history from '../../../history';
import { CUSTOMER_URL } from "../../../Constants/AppConstants";

class Home extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {  }
        window.location.href= CUSTOMER_URL + "my-account";
      //history.push('/my-account');
    }
    render() { 
        return ( null );
    }
}
 
export default Home;