import React, {useRef} from 'react';
import {Card, Text, View, Center} from 'native-base';
import {ImageBackground, TouchableNativeFeedback} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import StyleVariables from '../../styles/StyleVariables';
import BookCardOption from './BookCardOption';
import { imageData } from '../../services/Common';

export default function BookCard(props) {
  const bookOption = useRef(null);

  const navigateSingleBook = () => {
    props.navigation.navigate('SingleBook', {book: props.book});
  };

  return (
    <>
      <TouchableNativeFeedback
        onPress={navigateSingleBook}
        background={TouchableNativeFeedback.Ripple('#c7c7c7', true, 120)}>
        <Card width={180} padding={0} margin={2}>
          <ImageBackground
            imageStyle={{margin: 2, borderRadius: 10}}
            source={imageData(props.book.images[0].image)}
            style={{height: 200}}></ImageBackground>
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              paddingVertical: 5,
              paddingLeft: 10,
              width: '100%',
              backgroundColor: StyleVariables.AppColor4,
              height: 55,
              display: 'flex',
              flexDirection: 'row',
            }}>
            <Text
              fontSize={'md'}
              color={'white'}
              opacity={0.9}
              isTruncated
              noOfLines={2}
              style={{flex: 6}}>
              {props.book.title}
            </Text>
            <TouchableNativeFeedback
              onPress={() => bookOption.current.openOption()}
              background={TouchableNativeFeedback.Ripple('#EEE', true, 15)}>
              <Center style={{flex: 1}}>
                <Ionicons
                  name="ellipsis-vertical-sharp"
                  style={{fontSize: 20}}
                />
              </Center>
            </TouchableNativeFeedback>
          </View>
        </Card>
      </TouchableNativeFeedback>
      <BookCardOption ref={bookOption} book={props.book} navigation={props.navigation} />
    </>
  );
}
