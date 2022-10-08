import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../../screens/App/Home';
import Details from '../../screens/App/Details';
import {Screens} from '../../constants/Screens';

const AppRoutes = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator initialRouteName={'Drawer'}>
      <Stack.Screen
        name={Screens.HomeScreen}
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={Screens.DetailsScreen}
        component={Details}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
export default AppRoutes;
