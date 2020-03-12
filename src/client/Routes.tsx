import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './containers/Login';
import Dashboard from './containers/Dashboard';

const AppRoutes = () => {
  return (
    <Switch>
      <Route exact path={'/'}>
        <Redirect to='/dashboard/personal-info/create' />
      </Route>
      <Route path={'/dashboard'}>
        <Dashboard />
      </Route>
    </Switch>
  );
};

export default AppRoutes;
