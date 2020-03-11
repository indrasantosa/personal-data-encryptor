import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './containers/Login';
import Dashboard from './containers/Dashboard';

const AppRoutes = () => {
  return (
    <Switch>
      <Route exact path={'/'}>
        <Login />
      </Route>
      <Route path={'/dashboard'}>
        <Dashboard />
      </Route>
    </Switch>
  );
};

export default AppRoutes;
