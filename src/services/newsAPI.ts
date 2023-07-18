import { api } from '.';
import { INewsItem } from '../../types';
import {
  fetchNewsFailure,
  fetchNewsStart,
  fetchNewsfulfilled,
  fetchSelectedNewsFailure,
  fetchSelectedNewsStart,
  fetchSelectedNewsfulfilled,
} from '../redux/newsSlice';
import { AppDispatch } from '../redux/store';

interface GetNewsResponse {
  news: INewsItem[];
}

interface GetNewsByIdResponse {
  news: INewsItem;
}

export const getNews = async (
  dispatch: AppDispatch,
): Promise<INewsItem[] | unknown> => {
  try {
    dispatch(fetchNewsStart());
    const response = await api.get<GetNewsResponse>('/news');

    if (response.ok && response.data) {
      dispatch(fetchNewsfulfilled(response.data.news));

      return response.data.news;
    } else {
      return response.problem;
    }
  } catch (error) {
    dispatch(fetchNewsFailure());
    return error;
  }
};

export const getNewsById = async (
  newsId: string,
  dispatch: AppDispatch,
): Promise<GetNewsByIdResponse | unknown> => {
  try {
    dispatch(fetchSelectedNewsStart());
    const response = await api.get<GetNewsByIdResponse>(`/news/${newsId}`);

    if (response.ok && response.data) {
      dispatch(fetchSelectedNewsfulfilled(response.data.news));

      return response.data.news;
    } else {
      return response.problem;
    }
  } catch (error) {
    dispatch(fetchSelectedNewsFailure());
    return error;
  }
};
