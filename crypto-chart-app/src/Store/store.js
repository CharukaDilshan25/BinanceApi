import { configureStore } from '@reduxjs/toolkit';
import cryptoReducer from './cryptoSlice';

const store = configureStore({
  reducer: {
    crypto: cryptoReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;