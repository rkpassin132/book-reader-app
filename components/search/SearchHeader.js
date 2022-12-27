import React, {useState} from 'react';
import {Input, Center} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {StyleSheet, TouchableNativeFeedback, View} from 'react-native';
import StyleVariables from '../../styles/StyleVariables';

export default function SearchHeader(props) {
  const [search, setSearch] = useState('');

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
        <Input
          type="text"
          autoFocus={true}
          autoCorrect={false}
          spellCheck={true}
          shadow={2}
          fontSize={'md'}
          borderRadius={20}
          height={10}
          variant="filled"
          placeholder="Search by title"
          cursorColor={StyleVariables.AppColor}
          returnKeyType={'search'}
          onChangeText={value => setSearch(value)}
          onSubmitEditing={() => props.getTitleBooks(search)}
          style={{backgroundColor: 'white'}}
        />
      </View>
      <TouchableNativeFeedback
        onPress={() => props.getTitleBooks(search)}
        background={TouchableNativeFeedback.Ripple('#EEE', true, 2)}>
        <Center style={{flex: 1}}>
          <Ionicons name="search" style={{fontSize: 20}} />
        </Center>
      </TouchableNativeFeedback>
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
