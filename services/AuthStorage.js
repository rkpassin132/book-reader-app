import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Constant from '../utils/Constant';

export default authStorage = {
  setToken,
  getToken,
  removeToken,
  setUser,
  getUser,
  removeUser,
  removeAuth,
};

getToken().then(token => {
  if(token != false || token != null) setBearerToken(token);
});

function setBearerToken(token) {
  Constant.token = token;
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
}

function setToken(value = null) {
  setBearerToken(value);
  return AsyncStorage.setItem('@user_token', value);
}

function getToken() {
  return AsyncStorage.getItem('@user_token');
}

function removeToken() {
  Constant.token = null;
  return AsyncStorage.removeItem('@user_token');
}

function setUser(value) {
  return AsyncStorage.setItem('@user', JSON.stringify(value));
}

async function getUser() {
  let user = await AsyncStorage.getItem('@user');
  return user ? JSON.parse(user) : null;
}

function removeUser() {
  return AsyncStorage.removeItem('@user');
}

function removeAuth() {
  AsyncStorage.removeItem('@user_token');
  AsyncStorage.removeItem('@user');
  return true;
}
