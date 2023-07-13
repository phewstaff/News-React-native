import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import Menu from '../components/Menu';

const AuthScreen = () => {
  return (
    <View>
      <Menu />
      <Text>Authentication screen</Text>
    </View>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({});
