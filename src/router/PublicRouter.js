import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PublicRoute = ({
  isAuthenticated,
  component: Component,
  ...rest
}) => (
    <Route {...rest} component={(props) => (
      isAuthenticated ? (
        <Redirect to="/" />
      ) : (
          <Component {...props} />
        )
    )} />
  );

const mapStateToProps = (state) => ({
  isAuthenticated: true
});

export default connect(mapStateToProps)(PublicRoute);
