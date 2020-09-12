import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';

export const AppRoutes = () => {
  return (
    <Switch>
      <Redirect exact from='/' to='/' />
    </Switch>
  );
};
