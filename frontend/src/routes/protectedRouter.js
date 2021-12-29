import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ component: Component, to, ...rest }) => {
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);

    return (
        <Route
            {...rest}
            render={props => isAuthenticated === false ? (
                <Redirect to={to} />
            ) : (
                isAuthenticated === true && <Component {...props} />
            )
            }
        />
    );
};

ProtectedRoute.defaultProps = {
    to: '/login'
};

export default ProtectedRoute;
