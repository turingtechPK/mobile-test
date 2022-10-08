const key = 'authToken';
import AsyncStorage from '@react-native-async-storage/async-storage';

const storeToken = async authToken => {
  try {
    AsyncStorage.setItem(key, authToken);
    console.log('Success storing token');
  } catch (error) {
    console.log('Err storing token', error);
  }
};

const getToken = async () => {
  try {
    return AsyncStorage.getItem(key);
  } catch (error) {
    console.log('Error getting auth token');
  }
};

const removeToken = async () => {
  try {
    AsyncStorage.removeItem(key);
  } catch (error) {
    console.log('Error removing auth token');
  }
};

export default {
  storeToken,
  getToken,
  removeToken,
};
