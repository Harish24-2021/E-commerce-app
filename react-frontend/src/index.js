import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { store } from './Business/Store/store'
import { Provider } from 'react-redux'
import { BrowserRouter } from "react-router";


ReactDOM.render(
  <BrowserRouter>
 <React.StrictMode>
     <Provider store={store}>
    <App />
     </Provider>
  </React.StrictMode>
  </BrowserRouter>,
 
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
