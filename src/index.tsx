import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app/App';
import reportWebVitals from './reportWebVitals';
import {persistor, store} from "./app/store";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import { PersistGate } from "redux-persist/integration/react"
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <BrowserRouter>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <App />
            </PersistGate>
        </Provider>
    </BrowserRouter>
);

reportWebVitals();
