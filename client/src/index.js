import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

import App from './App';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {firebaseconf} from './config/firebase-config';
import {FirebaseAppProvider} from 'reactfire';
import store from './store/index'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <FirebaseAppProvider firebaseConfig={firebaseconf}>
        <Provider store={store}>
          <App />
        </Provider>
      </FirebaseAppProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

