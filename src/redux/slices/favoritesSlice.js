import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  items: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action) => {
      const exists = state.items.find(item => item.id === action.payload.id);
      if (!exists) {
        state.items.push(action.payload);
      }
    },
    removeFavorite: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    setFavorites: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const { addFavorite, removeFavorite, setFavorites } = favoritesSlice.actions;

// Async thunks for persistence
export const loadFavorites = () => async (dispatch) => {
  try {
    const favoritesString = await AsyncStorage.getItem('favorites');
    if (favoritesString) {
      const favorites = JSON.parse(favoritesString);
      dispatch(setFavorites(favorites));
    }
  } catch (error) {
    console.error('Error loading favorites:', error);
  }
};

export const toggleFavorite = (item) => async (dispatch, getState) => {
  try {
    const { favorites } = getState();
    const exists = favorites.items.find(fav => fav.id === item.id);
    
    if (exists) {
      dispatch(removeFavorite(item.id));
      const updatedFavorites = favorites.items.filter(fav => fav.id !== item.id);
      await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    } else {
      dispatch(addFavorite(item));
      const updatedFavorites = [...favorites.items, item];
      await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    }
  } catch (error) {
    console.error('Error toggling favorite:', error);
  }
};

export default favoritesSlice.reducer;
