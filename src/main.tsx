import { Provider } from 'react-redux';
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css'
import routes from "./routes"
import React from "react";
import { store } from './store';
import AppWrapper from './AppWrapper';

const router = createBrowserRouter(routes)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <AppWrapper>
        <RouterProvider router = {router}/>
      </AppWrapper>
    </Provider>
  </React.StrictMode>
)
