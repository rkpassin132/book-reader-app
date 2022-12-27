import {createDrawerNavigator} from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import StyleVariables from '../styles/StyleVariables';
import CustomDrawer from '../components/CustomDrawer';
import TabRoutes from './Tab';
import AboutUs from '../screens/AboutUs';
import Profile from '../screens/Profile';

const Drawer = createDrawerNavigator();

export default function DrawerRoutes() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: true,
        headerStyle: {backgroundColor: StyleVariables.AppColor},
        headerTitleStyle: {color: '#fff'},
        drawerActiveBackgroundColor: StyleVariables.AppColor,
        headerTintColor: "#fff",
        drawerActiveTintColor: '#fff',
        drawerInactiveTintColor: '#333',
        drawerLabelStyle: {
          marginLeft: -25,
          fontFamily: 'Roboto-Medium',
          fontSize: 15,
        },
      }}>
      <Drawer.Screen
        name="Home"
        component={TabRoutes}
        options={{
          headerShown: false,
          drawerIcon: ({color}) => (
            <Ionicons name="home-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="person-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="About"
        component={AboutUs}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons
              name="ios-information-circle-outline"
              size={24}
              color={color}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
