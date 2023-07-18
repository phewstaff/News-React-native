import { useEffect, useState } from 'react';

import { INewsItem } from '../../types';

const useInfiniteScroll = (
  news: INewsItem[] | undefined,
  PAGE_SIZE: number,
) => {
  const [page, setPage] = useState(1); // Current page number
  const [newsList, setNewsList] = useState<INewsItem[]>([]); // List of news items to display

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1); // Increment the page number to load more news
  };

  useEffect(() => {
    if (news) {
      const slicedNews = news.slice(0, page * PAGE_SIZE); // Slice the news array based on the current page and page size
      setNewsList(slicedNews);
    }
  }, [news, page]);

  return { page, newsList, handleLoadMore };
};

export default useInfiniteScroll;
