import React from 'react';
import ReactDOM from "react-dom/client";
import './index.css';
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from './reportWebVitals.js'
import App from './App';
import { store } from '@/store/store.js';
import { Provider } from 'react-redux';
import { PrimeReactProvider } from 'primereact/api';
import 'primeicons/primeicons.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <PrimeReactProvider>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </PrimeReactProvider>
        </Provider>
    </React.StrictMode>
)

reportWebVitals();
