import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { RootStackParams } from '../../App';
import { INewsItem } from '../../types';
import CustomButton from '../components/CustomButton';
import NewsItem from '../components/NewsItem';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import useAuthChecking from '../hooks/useAuthCheck';
import { getNews } from '../services/newsAPI';

const NewsScreen = () => {
  const navigation: NavigationProp<RootStackParams> = useNavigation();
  const dispatch = useAppDispatch();
  const { loading, error, data: news } = useAppSelector(state => state.news);

  const { isAuthenticated } = useAuthChecking();

  useEffect(() => {
    if (isAuthenticated) {
      getNews(dispatch);
    }
  }, [isAuthenticated, navigation]);

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
    return (
      <View style={styles.signInContainer}>
        <Text style={styles.signInText}>
          You are not signed in. Please sign in to view the news.
        </Text>
        <CustomButton
          label="Sign In"
          onPress={() => navigation.navigate('Auth')}
        />
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          Failed to load news. Please try again.
        </Text>
      </View>
    );
  }
  if (news) {
    return (
      <View style={styles.container}>
        <FlatList
          data={news}
          renderItem={renderNewsItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.newsList}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </View>
    );
  }
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
