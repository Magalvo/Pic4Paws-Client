import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { setUser } from './state/index.js';
import authSliceReducer from './state/index.js';
import { configureStore } from '@reduxjs/toolkit';
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
import { ChakraProvider } from '@chakra-ui/react';

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

const persistor = persistStore(store, null, () => {
  // This callback will be called after the persistence is complete
  // You can perform additional actions here if needed
});

// Clear the persisted state when the browser or window is closed
window.addEventListener('beforeunload', () => {
  persistor.purge();
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProviderWrapper>
        <PersistGate loading={null} persistor={persistor}>
          <ChakraProvider>
            <App />
          </ChakraProvider>
        </PersistGate>
      </AuthProviderWrapper>
    </Provider>
  </React.StrictMode>
);
