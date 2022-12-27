import React, {useState, useEffect} from 'react';
import {
  View,
  ImageBackground,
  Image,
  StyleSheet,
  TouchableNativeFeedback,
  Share,
} from 'react-native';
import {Text} from 'native-base';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import authStorage from '../services/AuthStorage';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import recentBookStorage from '../services/RecentBookStorage';

const CustomDrawer = props => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    authStorage.getUser().then(user => {
      setUser(user);
    });
  }, []);

  const logout = async () => {
    authStorage.removeAuth();
    recentBookStorage.removeRecentBook();
    GoogleSignin.configure();
    try {
      await GoogleSignin.signOut();
    } catch (err) {}
    props.navigation.reset({index: 0, routes: [{name: 'Login'}]});
  };

  const onShare = async () => {
    await Share.share({
      title: 'Book reader app',
      message:
        'Download book reader app from play store and read amazing books. https://play.google.com/store/games?hl=en&gl=US',
      url: 'https://play.google.com/store/games?hl=en&gl=US',
    });
  };

  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{backgroundColor: '#8200d6'}}>
        <ImageBackground
          source={require('../assets/images/menu-bg.jpeg')}
          style={{padding: 20}}>
          {user != null && (
            <Image
              source={{uri: user.image}}
              style={{
                height: 80,
                width: 80,
                borderRadius: 40,
                marginBottom: 10,
              }}
            />
          )}
          <Text
            style={{
              color: '#fff',
              fontSize: 18,
              fontFamily: 'Roboto-Medium',
              marginBottom: 5,
            }}>
            {user != null ? user.name : ''}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.textTop}>{user != null ? user.email : ''}</Text>
            <FontAwesome5 name="coins" size={14} color="#fff" />
          </View>
        </ImageBackground>
        <View style={{flex: 1, backgroundColor: '#fff', paddingTop: 10}}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={{padding: 20, borderTopWidth: 1, borderTopColor: '#ccc'}}>
        <TouchableNativeFeedback
          onPress={onShare}
          background={TouchableNativeFeedback.Ripple('#EEE')}>
          <View style={styles.bottomButton}>
            <Ionicons
              name="share-social-outline"
              size={22}
              style={{color: '#333'}}
            />
            <Text style={styles.textBottom}>Tell a Friend</Text>
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback
          onPress={logout}
          background={TouchableNativeFeedback.Ripple('#EEE')}>
          <View style={styles.bottomButton}>
            <Ionicons name="exit-outline" size={22} style={{color: '#333'}} />
            <Text style={styles.textBottom}>Sign Out</Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  textTop: {
    color: '#fff',
    fontFamily: 'Roboto-Regular',
    marginRight: 5,
  },
  bottomButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },
  textBottom: {
    fontSize: 15,
    fontFamily: 'Roboto-Medium',
    marginLeft: 5,
  },
});
export default CustomDrawer;
