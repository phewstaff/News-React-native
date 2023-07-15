import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import NewsCard from '../components/NewsCard';
import Menu from '../components/Menu';

const NewsScreen = () => {
  return (
    <View>
      <Menu />
      <Text>News screen</Text>
      <NewsCard title="новость 1" />
    </View>
  );
};

export default NewsScreen;

const styles = StyleSheet.create({});
