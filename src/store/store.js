import { configureStore } from '@reduxjs/toolkit';
import appReducer from './modules/app.js';

export const store = configureStore({
    reducer: {
        app: appReducer,
    },
});
