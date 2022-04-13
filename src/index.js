import React from 'react';

import { QueryClient, QueryClientProvider } from 'react-query';

import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";

import { Provider } from 'react-redux';
import store from './store';

import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container);
const queryClient = new QueryClient();

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <QueryClientProvider client={queryClient}>
                    <App />
                </QueryClientProvider>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);
