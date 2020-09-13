import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { SignUp } from '../pages/Authentication/SignUp';
import BrokerList from '../pages/BrokerList';

export const Routes = () => {
  return (
    <Switch>
      <Redirect exact from='/' to='/signup' />
      <Route path='/signup' component={SignUp} />
      <Route path='/brokerlist' component={BrokerList} />
    </Switch>
  );
};
