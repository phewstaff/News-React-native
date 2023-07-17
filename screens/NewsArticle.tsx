import { RouteProp, useRoute } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { RootStackParams } from '../App';
import NewsItem from '../components/NewsItem';
import { useAppDispatch, useAppSelector } from '../components/hooks/redux';
import { fetchNewsById } from '../redux/newsSlice';

type NewsArticleScreenRouteParams = {
  newsId: string;
};

const NewsArticleScreen = () => {
  const dispatch = useAppDispatch();
  const route = useRoute<RouteProp<RootStackParams, 'NewsArticle'>>();
  const { newsId } = route.params as NewsArticleScreenRouteParams;
  const { loading, error, selectedNews } = useAppSelector(state => state.news);

  useEffect(() => {
    dispatch(fetchNewsById(newsId));
  }, []);
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator
          style={styles.loadingImage}
          size="small"
          color="#888"
        />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  if (!selectedNews) {
    return (
      <View style={styles.container}>
        <Text>No news found</Text>
      </View>
    );
  }

  return (
    <NewsItem
      title={selectedNews.title}
      image_url={selectedNews.image_url}
      description={selectedNews.body}
      isSelectedItem={true}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  loadingImage: {
    width: 80,
    height: 80,
    marginRight: 10,
  },
});

export default NewsArticleScreen;
