import React, {useState, useEffect} from 'react';
import {TouchableNativeFeedback, StyleSheet, View, Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import authStorage from '../services/AuthStorage';
import StyleVariables from '../styles/StyleVariables';
import Home from '../screens/Home';
import Library from '../screens/Library';
import Explore from '../screens/Explore';

const Tab = createBottomTabNavigator();

export default function TabRoutes(props) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    authStorage.getUser().then(user => {
      setUser(user);
    });
  }, []);

  return (
    <Tab.Navigator
    initialRouteName='Home'
      screenOptions={{
        headerLeft: () => (
          <TouchableNativeFeedback
            onPress={() => props.navigation.openDrawer()}
            background={TouchableNativeFeedback.Ripple('#EEE', true, 20)}>
            <View style={styles.leftButton}>
              <Ionicons name="menu" size={24} style={{color: '#fff'}} />
            </View>
          </TouchableNativeFeedback>
        ),
        headerRight: () => (
          <View style={{flexDirection: 'row', alignContent: 'center'}}>
            <TouchableNativeFeedback
              onPress={() => props.navigation.navigate('Search')}
              background={TouchableNativeFeedback.Ripple('#EEE', true, 20)}>
              <View
                style={{
                  padding: 10,
                  marginHorizontal: 4,
                }}>
                <Ionicons name="search" size={24} style={{color: '#fff'}} />
              </View>
            </TouchableNativeFeedback>
            {user != null && (
              <TouchableNativeFeedback
                onPress={() => props.navigation.navigate('Profile')}
                background={TouchableNativeFeedback.Ripple('#EEE', true, 20)}>
                <View
                  style={{
                    padding: 10
                  }}>
                  <Image
                    source={{uri: user.image}}
                    style={{height: 30, width: 30, borderRadius:40}}
                  />
                </View>
              </TouchableNativeFeedback>
            )}
          </View>
        ),
        headerShown: true,
        tabBarShowLabel: false,
        headerStyle: {backgroundColor: StyleVariables.AppColor},
        headerTitleStyle: {color: '#fff'},
        tabBarStyle: {backgroundColor: StyleVariables.AppColor},
        tabBarInactiveTintColor: '#fff',
        tabBarActiveTintColor: StyleVariables.AppColor3,
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          title: 'Reading now',
          tabBarIcon: ({color, size}) => (
            <Ionicons name="book" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Explore"
        component={Explore}
        options={{
          title: 'Explore',
          tabBarIcon: () => (
            <TouchableNativeFeedback
                onPress={() => props.navigation.navigate('Explore')}
                background={TouchableNativeFeedback.Ripple('#EEE', true, 25)}>
                <View>
                  <Image
                    source={require("../assets/images/logo.png")}
                    style={{height: 40, width: 40, borderRadius:40, borderColor:StyleVariables.AppColor3, borderWidth:1, }}
                  />
                </View>
              </TouchableNativeFeedback>
          ),
        }}
      />
      <Tab.Screen
        name="Library"
        component={Library}
        options={{
          title: 'My Library',
          tabBarIcon: ({color, size}) => (
            <Ionicons name="library" color={color} size={size} />
          ),
          headerShadowVisible:false,
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  leftButton: {
    padding: 10,
    marginLeft: 10,
  },
  rightButton: {
    padding: 10,
    marginHorizontal: 10,
  } 
});
