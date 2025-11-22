import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import transportReducer from './slices/transportSlice';
import favoritesReducer from './slices/favoritesSlice';
import themeReducer from './slices/themeSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    transport: transportReducer,
    favorites: favoritesReducer,
    theme: themeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
