import NetInfo from '@react-native-community/netinfo';

export default class Network {
  async isNetworkAvailable() {
    return NetInfo.fetch().then((response) => {
      return response.isConnected;
    });
  }
}
