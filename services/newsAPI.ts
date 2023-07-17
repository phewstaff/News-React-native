import { api } from '.';
import { INewsItem } from '../types';

interface GetNewsResponse {
  news: INewsItem[];
}

interface GetNewsByIdResponse {
  news: INewsItem;
}

export const getNews = async (): Promise<INewsItem[] | unknown> => {
  try {
    const response = await api.get<GetNewsResponse>('/news');

    if (response.ok && response.data) {
      return response.data.news;
    } else {
      return response.problem;
    }
  } catch (error) {
    return error;
  }
};

export const getNewsById = async (
  newsId: string,
): Promise<GetNewsByIdResponse | unknown> => {
  try {
    const response = await api.get<GetNewsByIdResponse>(`/news/${newsId}`);

    if (response.ok && response.data) {
      return response.data.news;
    } else {
      return response.problem;
    }
  } catch (error) {
    return error;
  }
};
