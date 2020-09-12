import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { SignIn } from '../pages/Authentication/SignIn';
import { SignUp } from '../pages/Authentication/SignUp';

export const Routes = () => {
  return (
    <Switch>
      <Redirect exact from='/' to='/signin' />
      <Route path='/signin' component={SignIn} />
      <Route path='/signup' component={SignUp} />
    </Switch>
  );
};
