import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  username: string;
  password: string;
  isAuthenticated: boolean;
}

const initialState: UserState = {
  username: '',
  password: '',
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{ username: string; password: string }>
    ) => {
      state.username = action.payload.username;
      state.password = action.payload.password;
    },
    authenticateUser: (state) => {
      if (state.username === 'admin' && state.password === 'admin') {
        state.isAuthenticated = true;
      }
    },
    logoutUser: (state) => {
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, authenticateUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;
