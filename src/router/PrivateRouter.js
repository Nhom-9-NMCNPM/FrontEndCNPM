import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
const PrivateRoute = ({isAuthenticated, component: Component, ...rest}) => {
    return (
        <div>
            <Route {...rest} component={(props) => (
                isAuthenticated ? (
                    <div>
                        <Component {...props} />
                    </div>
                ):(
                    <Redirect to="/" />
                )
            )} />
        </div>
    )
};
const mapStateToProps = (state) =>({
    isAuthenticated: state.User.admin,
});
export default connect(mapStateToProps)(PrivateRoute);