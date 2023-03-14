import React, { Component } from 'react';
import classnames from 'classnames';

class AlertWrapperSuccess extends Component {
    constructor (props){
        super(props)
    }
    render() {
        if(this.props.success_alert_wrapper_show){
            return (
                <div className={classnames("success_alert_wrapper alert-wrapper alert-success", { 'success_alert_wrapper_show': this.props.success_alert_wrapper_show })} >
                    <ul className="alert-success">
                        <li><i className="fa fa-check" aria-hidden="true"></i> <strong>Success:</strong> {this.props.errors_data}</li>
                    </ul>
                </div>
            );
        }else{
            return (
                <React.Fragment></React.Fragment>
            );
        }
        
    }
}
 
export default AlertWrapperSuccess;