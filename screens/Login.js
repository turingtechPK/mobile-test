import React, {useEffect, useState} from 'react';
import {
  NativeBaseProvider,
  Box,
  Heading,
  VStack,
  FormControl,
  Input,
  Link,
  Button,
  Icon,
  HStack,
  StatusBar,
  Image,
} from 'native-base'; // enables you to build a consistent design system across android etc.
import {View, Text, Alert, StyleSheet, TouchableOpacity} from 'react-native'; // importing major components fro react native
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; // this import is used to access customizable icons for React Native
import AntDesign from 'react-native-vector-icons/AntDesign'; // this import is used to get google and apple icons.
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'; // making the screen responsive.
import {RFValue} from 'react-native-responsive-fontsize'; // making a responsive
import LinearGradient from 'react-native-linear-gradient'; // used to get a gradient color effect in continue button used at the end of login screen.

// seperate header function is created which contains status bar and reddit logo.this function is used below as a component.

function Header() {
  return (
    <>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />

      <Box safeAreaTop backgroundColor="#fff" />

      <HStack                                  // it is a native base components used to  aligns items horizontally.
        bg="#fff"
        p="1"
        justifyContent="space-between"
        alignItems="center">
        <HStack space="4" alignItems="center">
          <Image
            source={require('../assets/logo/reddit.png')}
            alt="Logo"
            size={'sm'}
          />
        </HStack>
      </HStack>
    </>
  );
}
 
const Login = ({navigation}) => {                               // useState is used to create hooks which are used in handling states.
  const [username, setUsername] = useState('');                   
  const [password, setPassword] = useState('');     
  const [eyeIconColor, seteyeIconColor] = useState('grey');
  const [passwordVisible, setpasswordVisible] = useState(false);
  const [pressEnabled, setpressEnabled] = useState(false);

  useEffect(() => {
   
    if (username && password) {
      setpressEnabled(true);
    } else {
      setpressEnabled(false);
    }
  }, [username, password]);
 

  // showPassword method basically changes the color of the eye icon and also set showPassword true if pressed due to which typed password is visible.
  const showPassword = () => {
    if (eyeIconColor == 'grey') {
      seteyeIconColor('#2089DD');
      setpasswordVisible(true);
    } else {
      seteyeIconColor('grey');
      setpasswordVisible(false);
    }
  };

  // login fuction basically check all the requirements i.e. username and password is not empty and also password show be password other wise an invalid alert will be shown.
  function login() {
    if (!username) {
      return Alert.alert('Error', `Username can't be empty!`);
    }
    if (!password) {
      return Alert.alert('Error', `Password can't be empty!`);
    }
    if (password != 'password') {
      return Alert.alert('Error', `The password you entered is invalid!`);
    } else { // if all the checks are fulfilled then and only then the user wuill be taken to the home screen plus username is also passed as props to the home screen.
      setPassword('');
      navigation.navigate('Home', {
        username: username,
      });
    }
  }
  return (                                               // HStack is a native base component used to  aligns items horizontally.
                                                        // VStack is a native base component used to  aligns items vertically.
    <NativeBaseProvider>
      <Header />
      <Box safeArea flex={1} p="2" py="8" w="90%" mx="auto">
        <Heading size="lg" fontWeight="600" color="coolGray.800">
          Log in to Reddit
        </Heading>
        <HStack mt="2">
          <Text style={styles.text2}>By continuing, you agree to our </Text>
          <Link
            _text={{
              color: 'indigo.500',
              fontWeight: 'medium',
              fontSize: 'sm',
            }}
            href="#">
            User Agreement
          </Link>
        </HStack>
        <HStack mb="3">
          <Text style={styles.text2}>and </Text>
          <Link
            _text={{
              color: 'indigo.500',
              fontWeight: 'medium',
              fontSize: 'sm',
            }}
            href="#">
            Privacy Policy
          </Link>
        </HStack>
        
        <VStack space={6} paddingBottom={10}>                               
          <Button
            leftIcon={
              <Icon
                as={AntDesign}
                name="google"
                size="sm"
                style={{right: 75}}
              />
            }
            variant="outline"
            borderRadius="30"
            borderColor="#2089DD"
            _text={{color: '#2089DD', fontWeight: 'bold'}}>
            Continue with Google
          </Button>
          <Button
            leftIcon={
              <Icon
                as={AntDesign}
                name="apple1"
                size="sm"
                style={{right: 75}}
                color="#000"
              />
            }
            borderRadius="30"
            borderColor="#2089DD"
            _text={{color: '#2089DD', fontWeight: 'bold'}}
            variant="outline">
            Continue with Apple
          </Button>
        </VStack>

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
          <View>
            <Text style={{width: 50, textAlign: 'center', color: '#000'}}>
              or
            </Text>
          </View>
          <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
        </View>

        <VStack space={3} mt="5">
          <FormControl>
            <FormControl.Label
              _text={{
                color: 'coolGray.800',
                fontSize: 'xs',
                fontWeight: 500,
              }}></FormControl.Label>
            <Input
              value={username}
              onChangeText={setUsername}
              variant="underlined"
              placeholder="Username"
            />
          </FormControl>
          <FormControl>
            <FormControl.Label
              _text={{
                color: 'coolGray.800',
                fontSize: 'xs',
                fontWeight: 500,
              }}></FormControl.Label>
            <Input
              onChangeText={setPassword}
              value={password}
              secureTextEntry={!passwordVisible}
              InputRightElement={
                <Icon
                  as={<MaterialIcons name="visibility" />}
                  size={5}
                  mr="2"
                  color={eyeIconColor}
                  onPress={showPassword}
                />
              }
              variant="underlined"
              placeholder="Password"
            />
            <HStack mt="6">
              <Text style={styles.text2}>New to Reddit? </Text>
              <Link
                _text={{
                  color: 'indigo.500',
                  fontWeight: 'bold',
                  fontSize: 'sm',
                }}
                href="#"
                isUnderlined={false}>
                Sign Up
              </Link>
            </HStack>
            <Link
              _text={{fontSize: 'sm', fontWeight: 'bold', color: 'indigo.500'}}
              alignSelf="flex-start"
              mt="1"
              isUnderlined={false}>
              Forget Password?
            </Link>
          </FormControl>
        </VStack>
        <TouchableOpacity style={styles.button} onPress={login}>
          <LinearGradient
            colors={['#A30000', 'darkorange']}
            style={styles.gradient}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}>
            <Text style={styles.text}>Continue</Text>
          </LinearGradient>
        </TouchableOpacity>
      </Box>
    </NativeBaseProvider>
  );
};

export default Login;

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  button: {
    width: wp('95%'),
    height: hp('5%'),
    alignSelf: 'center',
    position: 'absolute',
    bottom: 5,
  },
  text: {
    color: 'lightgrey',
    fontSize: RFValue(14, 580),
  },
  text2: {
    color: 'black',
    fontSize: RFValue(9.5, 580),
  },
});
