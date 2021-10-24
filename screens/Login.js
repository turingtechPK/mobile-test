import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {View, StyleSheet, Alert, TouchableOpacity} from 'react-native';
import {Button, Input, Text} from 'react-native-elements';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import COLORS from '../constants/COLORS';
import LinearGradient from 'react-native-linear-gradient';
import {RFValue} from 'react-native-responsive-fontsize';

const Login = ({navigation}) => {
  const [username, setUsername] = React.useState('');
  const [usernameLabel, setUsernameLabel] = React.useState('');
  const [passwordLabel, setPasswordLabel] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [eyeColor, setEyeColor] = React.useState('grey');
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const [buttonEnabled, setButtonEnabled] = React.useState(false);

  React.useEffect(() => {
    if (username) {
      setUsernameLabel('Username');
    } else {
      setUsernameLabel('');
    }
    if (password) {
      setPasswordLabel('Password');
    } else {
      setPasswordLabel('');
    }
    if (username && password) {
      setButtonEnabled(true);
    } else {
      setButtonEnabled(false);
    }
  }, [username, password]);

  const showPassword = () => {
    if (eyeColor == 'grey') {
      setEyeColor(COLORS.primary);
      setPasswordVisible(true);
    } else {
      setEyeColor('grey');
      setPasswordVisible(false);
    }
  };

  const login = () => {
    if (!username) {
      return Alert.alert('Error', `Username can't be empty!`);
    }
    if (!password) {
      return Alert.alert('Error', `Password can't be empty!`);
    }
    if (password != 'password') {
      return Alert.alert('Error', `The password you entered is invalid!`);
    } else {
      setPassword('');
      navigation.navigate('Home', {
        username: username,
      });
    }
  };
  return (
    <View style={styles.centered}>
      <Text h3>Log in to Reddit</Text>
      <Text></Text>
      <View style={styles.form}>
        <Input
          label={usernameLabel}
          labelStyle={styles.label}
          inputContainerStyle={
            username
              ? {
                  borderBottomColor: COLORS.primary,
                }
              : null
          }
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <Input
          label={passwordLabel}
          labelStyle={styles.label}
          inputContainerStyle={
            password
              ? {
                  borderBottomColor: COLORS.primary,
                }
              : null
          }
          placeholder="Password"
          value={password}
          rightIcon={
            <TouchableOpacity activeOpacity={0.5} onPress={showPassword}>
              <Icon name="eye" size={24} color={eyeColor} />
            </TouchableOpacity>
          }
          onChangeText={setPassword}
          secureTextEntry={!passwordVisible}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          ViewComponent={LinearGradient} // Don't forget this!
          linearGradientProps={{
            colors: ['red', 'orange'],
            start: {x: 0, y: 0.5},
            end: {x: 1, y: 0.5},
          }}
          containerStyle={styles.button}
          title="Continue"
          onPress={login}
          disabled={!buttonEnabled}
          disabledStyle={{
            opacity: 0.7,
          }}
        />
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  centered: {
    height: hp('100%'),
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    padding: 10,
    justifyContent: 'space-between',
    width: wp('90%'),
    height: hp('20%'),
  },
  button: {
    alignSelf: 'center',
    width: wp('90%'),
    borderRadius: 25,
  },
  buttonContainer: {
    position: 'absolute',
    padding: 8,
    bottom: 0,
    width: wp('100%'),
    borderWidth: 0.5,
    borderColor: 'lightgrey',
  },
  label: {
    fontSize: RFValue(11, 580),
    color: COLORS.primary,
  },
});
