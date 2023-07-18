import { RouteProp, useRoute } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { RootStackParams } from '../App';
import NewsItem from '../components/NewsItem';
import { useAppDispatch, useAppSelector } from '../components/hooks/redux';
import { getNewsById } from '../services/newsAPI';

type NewsArticleScreenRouteParams = {
  newsId: string;
};

const NewsArticleScreen = () => {
  const dispatch = useAppDispatch();
  const route = useRoute<RouteProp<RootStackParams, 'NewsArticle'>>();
  const { newsId } = route.params as NewsArticleScreenRouteParams;
  const {
    selectedNewsLoading: loading,
    selectedNewsError: error,
    selectedNews,
  } = useAppSelector(state => state.news);

  useEffect(() => {
    getNewsById(newsId, dispatch);
  }, [newsId]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator
          style={styles.loadingImage}
          size="large"
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
    <View style={styles.container}>
      <NewsItem
        title={selectedNews.title}
        image_url={selectedNews.image_url}
        description={selectedNews.body}
        isSelectedItem={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  loadingImage: {
    width: 80,
    height: 80,
  },
});

export default NewsArticleScreen;
