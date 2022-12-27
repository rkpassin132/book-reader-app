import React, { Component } from 'react';
import { ScrollView, StyleSheet, Image, ToastAndroid } from 'react-native';
import { Text } from 'native-base';
import GlobalStyle from '../styles/GlobalStyle';
import StyleVariables from '../styles/StyleVariables';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { authLogin } from '../services/api/AuthAPI';
import authStorage from '../services/AuthStorage';

export default class Login extends Component {
  constructor(props) {
    super();
    this.state = {
      loading: false,
      loginData: {
        category: '',
        token: '',
      },
    };
  }

  componentDidMount() {
    GoogleSignin.configure();
  }

  facebookLogin() {
    LoginManager.logInWithPermissions(['public_profile', 'email']).then(
      result => {
        if (result.isCancelled) {
        } else {
          AccessToken.getCurrentAccessToken().then(data => {
            // User this url get data from server side
            // https://graph.facebook.com/me?fields=email,name&access_token=
          });
        }
      },
      error => {
      },
    );
  }

  googleLogin() {
    GoogleSignin.hasPlayServices().then(() => {
      GoogleSignin.signIn().then((user) => {
        GoogleSignin.getTokens().then((token) => {
          this.setState({
            loginData: { category: 'google', token: token.accessToken },
          }, () => this.login());
        });
      });
    }).catch(error => {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        ToastAndroid.show('User cancelled the login flow', ToastAndroid.LONG);
      } else if (error.code === statusCodes.IN_PROGRESS) {
        ToastAndroid.show(
          'Operation is in progress already',
          ToastAndroid.LONG,
        );
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        ToastAndroid.show(
          'Play services not available or outdated',
          ToastAndroid.LONG,
        );
      } else {
      }
    });
  };

  login() {
    authLogin(this.state.loginData).then((res) => {
      if (res.data.success) {
        authStorage.setToken(res.data.token);
        authStorage.setUser(res.data.user);
        ToastAndroid.show(res.data.message, ToastAndroid.LONG);
        this.props.navigation.reset({ index: 0, routes: [{ name: 'Drawer' }] });
      } else {
        ToastAndroid.show(res.data.message, ToastAndroid.LONG);
      }
    }).catch(({ response }) => {
      ToastAndroid.show("Something goes wrong", ToastAndroid.LONG);
    });
  }

  render() {
    return (
      <>
        <ScrollView style={[GlobalStyle.container, styles.container]}>
          <Image
            style={styles.logo}
            source={require('../assets/images/logo.png')}
          />
          <Text maxW="400" fontSize="3xl" style={[styles.appName]}>
            Book Reader
          </Text>
          <Text
            maxW="400"
            fontSize="lg"
            style={[{ textAlign: 'center', marginTop: 60, marginBottom: 10 }]}>
            Log In to continue
          </Text>

          <Icon.Button
            size={30}
            name="facebook"
            borderRadius={10}
            backgroundColor="#3b5998"
            style={styles.loginButton}
            onPress={() => {
              this.facebookLogin();
            }}>
            <Text
              fontSize="lg"
              width={'2/3'}
              color="white"
              textAlign={'center'}>
              Login with Facebook
            </Text>
          </Icon.Button>

          <Text textAlign={'center'} style={styles.orText}>
            OR
          </Text>

          <Icon.Button
            size={30}
            name="google"
            borderRadius={10}
            backgroundColor="#de5246"
            style={styles.loginButton}
            onPress={() => this.googleLogin()}>
            <Text
              fontSize="lg"
              width={'2/3'}
              color="white"
              textAlign={'center'}>
              Login with Google
            </Text>
          </Icon.Button>
        </ScrollView>
        <Text
          fontSize="sm"
          style={[GlobalStyle.center, { fontWeight: '400', marginVertical: 4 }]}>
          Please sign in with google or facebook
        </Text>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0f0f0',
  },
  logo: {
    position: 'relative',
    top: '5%',
    width: 120,
    height: 120,
    resizeMode: 'contain',
    textAlign: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 20,
  },
  appName: {
    position: 'relative',
    color: StyleVariables.AppColor,
    textAlign: 'center',
    marginBottom: 10,
    marginVertical: 0,
  },
  loginButton: { paddingLeft: 30, textAlign: 'center', marginVertical: 6 },
  orText: [GlobalStyle.p, { fontWeight: 'bold', marginVertical: 15 }],
});
