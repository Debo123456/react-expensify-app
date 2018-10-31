import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Header from '../components/Header';
import NotFoundPage from '../components/NotFoundPage';
import HelpPage from '../components/HelpPage';
import AddExpensePage from '../components/AddExpensPage';
import ExpenseDashboardPage from '../components/ExpenseDashboardPage';
import EditExpensePage from '../components/EditExpensePage';
  
  const AppRouter = () => (
    <BrowserRouter>
      <div>
        <Header />
        <Switch>
          <Route component={ExpenseDashboardPage} path="/" exact={true} />
          <Route component={AddExpensePage} path="/create" exact={true} />
          <Route component={EditExpensePage} path="/edit/:id" exact={true} />
          <Route component={HelpPage} path="/help" exact={true} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </BrowserRouter>
  );

  export default AppRouter;