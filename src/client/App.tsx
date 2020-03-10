import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
// import logo from './logo.svg';

import './App.css';
import AppRoutes from './Routes';
import { createAppStore } from './createAppStore';

import { createBrowserHistory } from 'history';

const customHistory = createBrowserHistory();

const store = createAppStore({
  history: customHistory
});

function App() {
  return (
    <Provider store={store}>
      <Router history={customHistory}>
        <div className={'flex flex-col h-full'}>
          <AppRoutes />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
