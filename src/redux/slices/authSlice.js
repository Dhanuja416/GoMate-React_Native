import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
    },
    restoreAuth: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
  },
});

export const { loginSuccess, logout, restoreAuth } = authSlice.actions;

// Thunks for async operations
export const persistAuth = (user, token) => async (dispatch) => {
  try {
    await AsyncStorage.setItem('authToken', token);
    await AsyncStorage.setItem('user', JSON.stringify(user));
    dispatch(loginSuccess({ user, token }));
  } catch (error) {
    console.error('Error persisting auth:', error);
  }
};

export const loadAuth = () => async (dispatch) => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    const userString = await AsyncStorage.getItem('user');
    
    if (token && userString) {
      const user = JSON.parse(userString);
      dispatch(restoreAuth({ user, token }));
    }
  } catch (error) {
    console.error('Error loading auth:', error);
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    await AsyncStorage.removeItem('authToken');
    await AsyncStorage.removeItem('user');
    dispatch(logout());
  } catch (error) {
    console.error('Error logging out:', error);
  }
};

export default authSlice.reducer;
