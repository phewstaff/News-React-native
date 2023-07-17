import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getNews, getNewsById } from '../services/newsAPI';
import { INewsItem } from '../types';

interface NewsState {
  loading: boolean;
  error: string | null;
  data: INewsItem[];
  selectedNews: INewsItem | null;
}

const initialState: NewsState = {
  loading: false,
  error: null,
  data: [],
  selectedNews: null,
};

export const fetchNewsData = createAsyncThunk(
  'news/fetchNewsData',
  async () => {
    const response = await getNews();
    return response as INewsItem[];
  },
);

export const fetchNewsById = createAsyncThunk(
  'news/fetchNewsById',
  async (newsId: string) => {
    const response = await getNewsById(newsId);
    return response as INewsItem;
  },
);

export const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchNewsData.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNewsData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchNewsData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch news';
      })
      .addCase(fetchNewsById.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNewsById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedNews = action.payload;
      })
      .addCase(fetchNewsById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch news article';
      });
  },
});

export default newsSlice.reducer;
