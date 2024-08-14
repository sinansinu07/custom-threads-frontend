import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';

import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'
import { AuthProvider } from './context/AuthContext';

import App from './App';
import configureStore from './store/configureStore';

const store = configureStore()
console.log(store.getState())

// store.subscribe(() => {
//   console.log(store.getState())
// })

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </AuthProvider>
);