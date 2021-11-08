import React from 'react';
import {NavigationContainer} from '@react-navigation/native'; // NavigationContainer is a component which manages the navigation tree and contains the navigation state. 
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './screens/Login';
import Home from './screens/Home';
import {NativeBaseProvider} from 'native-base'; //NativeBaseProvider is a component that makes the theme available throughout the app.
import Results from './screens/Results';

const Stack = createNativeStackNavigator();

const config = {
  dependencies: {
    'linear-gradient': require('react-native-linear-gradient').default,
  },
};
const App = () => {
  console.disableYellowBox = true;
  return (
    // bsaically native base provider uses react context API.
    <NativeBaseProvider config={config}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen name="Results" component={Results} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

export default App;
