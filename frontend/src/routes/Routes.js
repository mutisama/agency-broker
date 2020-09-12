import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { SignIn } from '../pages/Authentication/SignIn';

export const Routes = () => {
  return (
    <Switch>
      <Redirect exact from='/' to='/signin' />
      <Route path='/signin' component={SignIn} />
    </Switch>
  );
};
