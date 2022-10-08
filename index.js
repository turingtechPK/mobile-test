/**
 * @format
 */
import 'react-native-gesture-handler';
import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import FlashMessage from 'react-native-flash-message';
import {store} from './src/store/store';
import {NativeBaseProvider} from 'native-base';

const RNRedux = () => (
  <NativeBaseProvider>
    <Provider store={store}>
      <App />
      <FlashMessage position="center" />
    </Provider>
  </NativeBaseProvider>
);

AppRegistry.registerComponent(appName, () => RNRedux);
