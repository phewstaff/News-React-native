import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import { RootStackParams } from '../../App';
import { INewsItem } from '../../types';
import NewsItem from '../components/NewsItem';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import useAuthChecking from '../hooks/useAuthCheck';
import useInfiniteScroll from '../hooks/useInfiniteScroll';
import { getNews } from '../services/newsAPI';
import {
  renderAuthenticationView,
  renderErrorView,
  renderLoadingView,
} from '../utils/newsScreenUtils';

const PAGE_SIZE = 5;

const NewsScreen = () => {
  const dispatch = useAppDispatch();
  const { loading, error, data: news } = useAppSelector(state => state.news);

  const navigation: NavigationProp<RootStackParams> = useNavigation();

  const { isAuthenticated } = useAuthChecking();
  const { page, newsList, handleLoadMore } = useInfiniteScroll(news, PAGE_SIZE);

  useEffect(() => {
    if (isAuthenticated) {
      getNews(dispatch);
    }
  }, [isAuthenticated, dispatch]);

  const renderNewsItem = ({ item }: { item: INewsItem }) => {
    return (
      <NewsItem
        key={item.id}
        title={item.title}
        image_url={item.image_url}
        onPress={() => handleNewsItemPress(item.id)}
      />
    );
  };

  const handleNewsItemPress = (newsId: string) => {
    navigation.navigate('NewsArticle', { newsId });
  };

  if (!isAuthenticated) {
    return renderAuthenticationView(navigation);
  }

  if (loading && page === 1) {
    return renderLoadingView();
  }

  if (error) {
    return renderErrorView();
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={newsList}
        renderItem={renderNewsItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.newsList}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  newsList: {
    paddingVertical: 10,
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
  },
  signInContainer: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  signInText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
  },
});

export default NewsScreen;
