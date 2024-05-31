import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// react-perfect-scrollbar styles
import "react-perfect-scrollbar/dist/css/styles.css";
import { store } from './States/store';
import { Provider } from "react-redux";
// import AppState from "States/appState";
import AppState from './States/appState';
// import UserState from "userStates/userState/userState";
import UserState from './userStates/userState/userState';
// import BlogState from "blogStates/blogState";
import BlogState from './blogStates/blogState';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppState>
      <BlogState>
        <UserState>
          <Provider store={store}>
              <App />
          </Provider>
        </UserState>
      </BlogState>
    </AppState>
  </React.StrictMode>
);


