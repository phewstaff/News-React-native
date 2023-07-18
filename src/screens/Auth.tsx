import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

import AuthForm from '../components/AuthForm';

const AuthScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <AuthForm />
    </SafeAreaView>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
