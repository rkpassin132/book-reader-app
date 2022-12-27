import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Splash from '../screens/Splash';
import Welcome from '../screens/Welcome';
import Login from '../screens/Login';
import DrawerRoutes from './Drawer';
import Search from '../screens/Search';
import SingleBook from '../screens/SingleBook';
import MoreBook from '../screens/MoreBook';
import PlayBook from '../screens/PlayBook';
import ReadBook from '../screens/ReadBook';

export default function Routes() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Drawer"
          component={DrawerRoutes}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Search"
          component={Search}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SingleBook"
          component={SingleBook}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MoreBook"
          component={MoreBook}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ReadBook"
          component={ReadBook}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="PlayBook"
          component={PlayBook}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
