import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  destinations: [],
  loading: false,
  error: null,
};

const transportSlice = createSlice({
  name: 'transport',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setDestinations: (state, action) => {
      state.destinations = action.payload;
      state.loading = false;
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setLoading, setDestinations, setError } = transportSlice.actions;
export default transportSlice.reducer;
