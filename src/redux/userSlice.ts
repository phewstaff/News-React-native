import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { IUser } from '../../types';

interface UserState {
  isAuthenticated: boolean;
  user: {
    username: string;
    avatar_url: string;
  };
}

const initialState: UserState = {
  isAuthenticated: false,
  user: {
    username: 'username',
    avatar_url:
      'https://i.pinimg.com/originals/ef/90/b5/ef90b507d1a57e282b086e59424c2a7b.jpg',
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    setUser: (state, action: PayloadAction<IUser>) => {
      state.isAuthenticated = true;
      state.user.username = action.payload.user.username;
      state.user.avatar_url = action.payload.user.avatar_url;
    },
  },
});

export const { setAuthenticated, setUser } = userSlice.actions;

export default userSlice.reducer;
