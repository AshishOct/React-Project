import React, { Fragment, PureComponent } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import history from "../../../history";
import { PUBLIC_URL, REFER_URL } from "../../../Constants/AppConstants";

class ChangeMealsItem extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
        }
        document.title = "Change Meals Item - Prestige Labs";
    }

    componentDidMount() {
        document.querySelector("body").scrollIntoView();
        const url = new URL(window.location.href);
        let subscription_id = url.searchParams.get("subscription_id");
        if (subscription_id != null) {
            const user = this.props.user;
            if (user) {
                if (user.site == 'refer') {
                    window.location.href = `${REFER_URL}serviceLogin?token=${user.token}&redirect=/meals?subscription_id=${subscription_id}`;
                } else {
                    window.location.href = `${PUBLIC_URL}serviceLogin?token=${user.token}&redirect=/meals?subscription_id=${subscription_id}`;
                }
            }
        } else {
            history.push(`/my-account/orders`);
        }
    }

    render() {
        return (
            <Fragment>
                <div className="loading container full_page_loader"></div>
            </Fragment>
        );
    }
}

ChangeMealsItem.propTypes = {
    auth: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        auth: state.auth,
    };
}

export default connect(mapStateToProps, null)(ChangeMealsItem);