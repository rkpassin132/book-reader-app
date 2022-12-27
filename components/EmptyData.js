import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {Text, View, Button} from 'native-base';
import GlobalStyle from '../styles/GlobalStyle';
import StyleVariables from '../styles/StyleVariables';

export default function EmptyData(props) {
  return (
    <View style={[GlobalStyle.center]}>
      <Image
        style={{
          resizeMode: 'contain',
          width: '90%',
          height: props.imagehHeight ? props.imagehHeight : 300,
        }}
        source={props.image}
        size={50}
      />
      <Text
        style={{
          marginVertical: 20,
          fontSize: 22,
          color: 'grey',
          textAlign: 'center',
          width: '90%',
        }}>
        {props.text}
      </Text>
      {props.button != '' && props.button != null ? (
        <View style={{width: '100%', textAlign: 'center', marginVertical: 18}}>
          <Button
            style={[styles.learnMoreButton, GlobalStyle.center]}
            block
            onPress={() => {
              props.navigation.navigate(props.buttonNavigate);
            }}>
            <Text color={StyleVariables.AppColor}>Read</Text>
          </Button>
        </View>
      ) : (
        <></>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  learnMoreButton: {
    backgroundColor: 'white',
    borderColor: StyleVariables.AppColor,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    textAlign: 'center',
    marginHorizontal: '14%',
  },
});
