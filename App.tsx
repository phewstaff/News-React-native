import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux';

import CustomHeader from './src/components/CustomHeader';
import { setupStore } from './src/redux/store';
import AuthScreen from './src/screens/Auth';
import NewsScreen from './src/screens/News';
import NewsArticleScreen from './src/screens/NewsArticle';

export type RootStackParams = {
  News: undefined;
  Auth: undefined;
  NewsArticle: { newsId: string };
};

const store = setupStore();

const RootStack = createNativeStackNavigator<RootStackParams>();

const App = () => {
  return (
    <>
      <Provider store={store}>
        <NavigationContainer>
          <RootStack.Navigator>
            <RootStack.Screen
              name="News"
              component={NewsScreen}
              options={{ header: () => <CustomHeader /> }}></RootStack.Screen>
            <RootStack.Screen
              name="Auth"
              component={AuthScreen}></RootStack.Screen>
            <RootStack.Screen
              name="NewsArticle"
              component={NewsArticleScreen}
            />
          </RootStack.Navigator>
        </NavigationContainer>
      </Provider>
    </>
  );
};

const styles = StyleSheet.create({});

export default App;
