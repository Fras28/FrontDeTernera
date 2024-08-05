import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './Slice'; // Ajusta la ruta según sea necesario
import { persistReducer, persistStore } from 'redux-persist';
import sessionStorage from 'redux-persist/lib/storage/session';

const persistConfig = {
  key: 'root',
  storage: sessionStorage,
};

const persistedReducer = persistReducer(persistConfig, counterReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export const persistor = persistStore(store);