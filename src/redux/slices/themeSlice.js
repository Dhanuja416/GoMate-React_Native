import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  isDark: false,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.isDark = !state.isDark;
    },
    setTheme: (state, action) => {
      state.isDark = action.payload;
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;

// Async thunks
export const loadTheme = () => async (dispatch) => {
  try {
    const theme = await AsyncStorage.getItem('theme');
    if (theme !== null) {
      dispatch(setTheme(theme === 'dark'));
    }
  } catch (error) {
    console.error('Error loading theme:', error);
  }
};

export const persistTheme = (isDark) => async (dispatch) => {
  try {
    await AsyncStorage.setItem('theme', isDark ? 'dark' : 'light');
    dispatch(setTheme(isDark));
  } catch (error) {
    console.error('Error persisting theme:', error);
  }
};

export default themeSlice.reducer;
