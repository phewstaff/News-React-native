import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { INewsItem } from '../types';

interface NewsState {
  loading: boolean;
  error: string | null;
  data: INewsItem[] | undefined;
  selectedNews: INewsItem | null;
  selectedNewsLoading: boolean;
  selectedNewsError: string | null;
}

const initialState: NewsState = {
  loading: false,
  error: null,
  data: undefined,
  selectedNews: null,
  selectedNewsLoading: false,
  selectedNewsError: null,
};

export const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    fetchNewsStart: state => {
      state.loading = true;
      state.error = null;
    },

    fetchNewsfulfilled: (state, action: PayloadAction<INewsItem[]>) => {
      state.loading = false;
      state.error = null;
      state.data = action.payload;
    },

    fetchNewsFailure: state => {
      state.loading = false;
      state.error = 'Произошла ошибка при загрузке новостей';
    },
    fetchSelectedNewsStart: state => {
      state.selectedNewsLoading = true;
      state.selectedNewsError = null;
    },

    fetchSelectedNewsfulfilled: (state, action: PayloadAction<INewsItem>) => {
      state.selectedNewsLoading = false;
      state.selectedNewsError = null;
      state.selectedNews = action.payload;
    },

    fetchSelectedNewsFailure: state => {
      state.selectedNewsLoading = false;
      state.selectedNewsError = 'Произошла ошибка при загрузке новости';
    },
  },
});

export const {
  fetchNewsStart,
  fetchNewsfulfilled,
  fetchNewsFailure,
  fetchSelectedNewsStart,
  fetchSelectedNewsfulfilled,
  fetchSelectedNewsFailure,
} = newsSlice.actions;

export default newsSlice.reducer;
