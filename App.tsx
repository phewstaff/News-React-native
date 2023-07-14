import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, useColorScheme } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Provider } from 'react-redux';

import { setupStore } from './redux/store';
import AuthScreen from './screens/Auth';
import NewsScreen from './screens/News';

export type RootStackParams = {
  News: undefined;
  Auth: undefined;
};

const store = setupStore();

const RootStack = createNativeStackNavigator<RootStackParams>();

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <>
      <Provider store={store}>
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
      </Provider>
    </>
  );
};

const styles = StyleSheet.create({});

export default App;
