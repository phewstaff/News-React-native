import React from 'react';
import {StyleSheet, useColorScheme} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import NewsScreen from './screens/News';
import AuthScreen from './screens/Auth';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

export type RootStackParams = {
  News: undefined;
  Auth: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParams>();

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <>
      <NavigationContainer>
        <RootStack.Navigator>
          <RootStack.Screen
            name="News"
            component={NewsScreen}></RootStack.Screen>
          <RootStack.Screen
            name="Auth"
            component={AuthScreen}></RootStack.Screen>
        </RootStack.Navigator>
      </NavigationContainer>
    </>
  );
};

const styles = StyleSheet.create({});

export default App;
