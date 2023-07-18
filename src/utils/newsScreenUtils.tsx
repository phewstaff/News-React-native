import { NavigationProp } from '@react-navigation/native';
import React, { FC } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { RootStackParams } from '../../App';
import CustomButton from '../components/CustomButton';

export const renderAuthenticationView = (
  navigation: NavigationProp<RootStackParams>,
) => {
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
};

export const renderLoadingView = () => {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#000" />
    </View>
  );
};

export const renderErrorView = () => {
  return (
    <View style={styles.errorContainer}>
      <Text style={styles.errorText}>
        Failed to load news. Please try again.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
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

export default styles;
