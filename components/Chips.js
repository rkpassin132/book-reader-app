import React from "react";
import {Text, Center} from 'native-base';
import {TouchableNativeFeedback, StyleSheet, View} from 'react-native';

export default function Chips(props) {

  return (
    <TouchableNativeFeedback
      onPress={props.onPress}
      background={TouchableNativeFeedback.Ripple('#c7c7c7')}>
      <Center style={styles.chips}>
        <Text style={styles.chipText}>{props.title}</Text>
      </Center>
    </TouchableNativeFeedback>
  );
}
const styles = StyleSheet.create({
  chips: {
    backgroundColor: '#0000001f',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 16,
    margin: 3,
    alignSelf: 'flex-start',
  },
  chipText: {
    fontSize: 14,
  },
});
