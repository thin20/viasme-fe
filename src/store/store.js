import { configureStore } from '@reduxjs/toolkit';
import appReducer from './modules/app.js';
import useReducer from './modules/user.js';

export const store = configureStore({
    reducer: {
        app: appReducer,
        user: useReducer
    },
});
