import {TouchableNativeFeedback, StyleSheet, View} from 'react-native';
import {Center, Text} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import StyleVariables from '../styles/StyleVariables';

export default function Header(props) {
  return (
    <Center style={styles.headerContainer}>
      <TouchableNativeFeedback
        onPress={() => props.navigation.goBack()}
        background={TouchableNativeFeedback.Ripple('#EEE', true, 2)}>
        <Center style={{flex: 1}}>
          <Ionicons name="arrow-back" style={{fontSize: 20}} />
        </Center>
      </TouchableNativeFeedback>
      <View style={{flex: 8}}>
        <Text fontSize={'lg'} color={'white'}>
          {props.title}
        </Text>
      </View>
    </Center>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: StyleVariables.AppColor,
    height: 60,
    padding: 5,
  },
});
