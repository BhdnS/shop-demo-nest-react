import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import auth from '../auth/authSlice.ts'
import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from '../api/apiSlice.ts'

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token', 'isAuth', 'role'],
}

const persistedAuthReducer = persistReducer(authPersistConfig, auth)

const rootReducer = {
  auth: persistedAuthReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
}

const store = configureStore({
  reducer: rootReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(apiSlice.middleware),
})

const persistor = persistStore(store)

type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch

export { store, persistor }
export type { RootState, AppDispatch }
