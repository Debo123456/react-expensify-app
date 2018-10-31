import React, { Component } from 'react';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import './App.css';

import { addExpense } from './actions/expenses';


const store = configureStore();

store.dispatch(addExpense({description: 'Water Bill', amount: 4500}));
store.dispatch(addExpense({description: 'Gas Bill', createdAt: 1000}));
store.dispatch(addExpense({description: 'Rent', amount: 109500})); 


const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

class App extends Component {
  render() {
    return (
      jsx
    );
  }
}

export default App;
