import React from "react";
import {connect} from "react-redux";
import * as selectors from "../store/selectors";
import PropTypes from "prop-types";
import {userProptypes} from "../store/reducer";
import * as services from "../services";

class UserPayments extends React.PureComponent {

    static propTypes = {
        user: PropTypes.shape(userProptypes),
        dispatch: PropTypes.func.isRequired,
        token: PropTypes.string.isRequired,
        userId: PropTypes.string.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            payments: []
        };
    }

    componentDidMount() {
        const {userId, token} = this.props;
        services.getPayments({userId, token})
            .then(docs => {
                this.setState({
                    payments: docs
                });
            });
    }

    render() {
        return (
            <>
                <div className={"title"}>Payments</div>
                <div className={"headers"}></div>
                <div className={"payments-container"}>
                    <div>
                        {this.state.payments.map(payment => {
                            return (
                                <div key={payment._id}>
                                    <div>{payment.userId}</div>
                                    <div>{payment.cart.length}</div>
                                    <div>{payment.amount}</div>
                                    <div>{payment.created_at}</div>
                                    <div>======================</div>
                                </div>
                            );
                        })
                        }
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = (store) => {
    return {
        user: selectors.getUser(store),
        token: selectors.getToken(store),
        userId: selectors.getUserId(store)
    };
};

export default  connect(mapStateToProps)(UserPayments);
