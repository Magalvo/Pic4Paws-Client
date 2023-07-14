import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { setUser } from './state/index.js';
import authSliceReducer from './state/index.js';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react';
import { AuthProviderWrapper } from './context/auth.context.jsx';

const persistConfig = {
  key: 'root',
  storage,
  version: 1
};

const persistedReducer = persistReducer(persistConfig, authSliceReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
});

// Dispatch an action to set the initial state of isLoggedIn and isLoading
store.dispatch(
  setUser({ isLoggedIn: false, isLoading: true, user: null, authToken: null })
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProviderWrapper>
        <PersistGate loading={null} persistor={persistStore(store)}>
          <App />
        </PersistGate>
      </AuthProviderWrapper>
    </Provider>
  </React.StrictMode>
);
