import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {SafeAreaView} from 'react-native';
import {useSelector} from 'react-redux';
import AppRoutes from './app';
import AuthRoutes from './auth';

const Navigator = () => {
  const containsUser = useSelector((state: any) =>
    state.jwt.token == '' ? false : true,
  );
  {
    console.log('containsUser', containsUser);
  }

  if (!containsUser) {
    return (
      <NavigationContainer>
        <SafeAreaView style={{flex: 1}}>
          <AuthRoutes />
        </SafeAreaView>
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <SafeAreaView style={{flex: 1}}>
          <AppRoutes />
        </SafeAreaView>
      </NavigationContainer>
    );
  }
};
export default Navigator;
