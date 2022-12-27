import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  BackHandler,
  ToastAndroid,
} from 'react-native';
import { Button } from 'native-base';
import authStorage from '../services/AuthStorage';
import Constant from '../utils/Constant';
import { appUpdate } from '../services/api/AppAPI';
import { Spinner } from 'native-base';
import GlobalStyle from '../styles/GlobalStyle';
import DeviceInfo from 'react-native-device-info';
import Network from '../services/Network';
import Permission from '../services/Permission';

export default class Splash extends Component {
  constructor() {
    super();
    this.state = {
      internalServerError: false,
      appUpdate: false,
      updateData: {
        version: '',
        message: '',
      },
    };
  }

  async componentDidMount() {
    let permission = new Permission();
    await permission.StorageWrite({ requestPermission: true });

    let network = new Network();
    network.isNetworkAvailable().then(isConnected => {
      Constant.Offline = !isConnected;
      if (isConnected) {
        ToastAndroid.show('You are online', ToastAndroid.SHORT);
        this.checkUpdate();
      } else {
        ToastAndroid.show('You are offline', ToastAndroid.LONG);
      }
    });
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  handleBackButtonClick = () => {
    this.props.navigation.goBack(null);
    return true;
  };

  checkUpdate = async () => {
    const version = DeviceInfo.getVersion();
    appUpdate(version.toString())
      .then(res => {
        if (res.data.success) {
          if (res.data.update == false) {
            this.checkUser();
          } else {
            this.setState({
              appUpdate: true,
              updateData: {
                version: res.data.update.app_version,
                message: res.data.update.message,
              },
            });
          }
        } else {
          this.setState({ internalServerError: true });
        }
      })
      .catch(err => {
        this.setState({ internalServerError: true });
      });
  };

  checkUser = async () => {
    let token = await authStorage.getToken();
    if (token == null || token === "") {
      this.props.navigation.reset({ index: 0, routes: [{ name: 'Welcome' }] });
    }else{
      this.props.navigation.reset({ index: 0, routes: [{ name: 'Drawer' }] });
    }
  };

  render() {
    return (
      <>
        <ServerDown data={this.state} />
        <UpdateApp data={this.state} />
        <SplashScreen data={this.state} />
      </>
    );
  }
}

const SplashScreen = props => {
  if (props.data.internalServerError || props.data.appUpdate) {
    return null;
  }
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../assets/images/logo.png')}
      />
      <Text style={styles.logoName}>Reader</Text>
      <Spinner style={[styles.spinner]} color="green" />
    </View>
  );
};

const ServerDown = props => {
  if (props.data.internalServerError) {
    return (
      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={require('../assets/images/logo.png')}
        />
        <Text style={styles.logoName}>Server Down</Text>
        <Text style={[GlobalStyle.p, styles.updateMesaage]}>
          Please try after some time
        </Text>
      </View>
    );
  } else {
    return null;
  }
};

const UpdateApp = props => {
  if (!props.data.internalServerError && props.data.appUpdate) {
    return (
      // <ScrollView style={{height:"100%"}}>
      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={require('../assets/images/logo.png')}
        />
        <Text style={styles.logoName}>Reader</Text>
        <Text style={[GlobalStyle.p, styles.updateMesaage]}>
          This update is mandatory, you need to update this app
        </Text>
        <Button success block style={[styles.updateButton]}>
          <Text style={{ color: 'white', fontSize: 18 }}>Update</Text>
        </Button>
      </View>
      // </ScrollView>
    );
  } else {
    return null;
  }
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    textAlign: 'center',
  },
  logo: {
    position: 'relative',
    top: '30%',
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  logoName: {
    position: 'relative',
    top: '30%',
    fontSize: 30,
    color: 'black',
  },
  nukepin: {
    position: 'relative',
    top: '120%',
    fontSize: 20,
    color: '#888897',
  },
  updateMesaage: {
    position: 'relative',
    top: '45%',
    marginHorizontal: 30,
  },
  updateButton: {
    marginHorizontal: 30,
    marginVertical: 10,
    position: 'relative',
    top: '50%',
  },
  spinner: {
    position: 'relative',
    top: '45%',
  },
});
