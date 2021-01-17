import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore } from 'redux';
import reducer from './store/reducer';

const store = createStore(reducer);
const app = (
  <Provider store = {store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
</Provider>
  
);
ReactDOM.render(
  <React.StrictMode>
    {app}
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
