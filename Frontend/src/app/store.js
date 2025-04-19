import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import { userAuthApi } from '../services/userAuthApi';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        [userAuthApi.reducerPath]: userAuthApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(userAuthApi.middleware),
});