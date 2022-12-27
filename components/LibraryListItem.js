import React from 'react';
import {Image, Box, Text, Center} from 'native-base';
import {TouchableNativeFeedback, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { imageData } from '../services/Common';

export default function LibraryListItem({data, deleteBook, navigation}) {

  const navigateSingleBook = () => {
    navigation.navigate('SingleBook', {book: data.book});
  };

  return (
    <Box borderBottomWidth="1" padding={2} borderColor={'#c8c0c0'}>
      <View style={{display: 'flex', flexDirection: 'row'}}>
        <TouchableNativeFeedback
          onPress={navigateSingleBook}
          background={TouchableNativeFeedback.Ripple('#c7c7c7')}>
          <View style={{display: 'flex', flexDirection: 'row', flex: 9}}>
            <Image
              flex={2.8}
              source={imageData(data.book.images[0].image)}
              height={100}
              borderRadius={10}
              shadow={3}
            />
            <View flex={7} style={{paddingHorizontal: 4, paddingVertical: 5}}>
              <Text
                isTruncated
                noOfLines={1}
                fontSize={'lg'}
                color="coolGray.800"
                bold>
                {data.book.title}
              </Text>
              <Text
                isTruncated
                noOfLines={2}
                fontSize={'md'}
                color="coolGray.800">
                {data.book.discription_about}
              </Text>
            </View>
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback
          onPress={() => deleteBook(data.book._id)}
          background={TouchableNativeFeedback.Ripple('#c7c7c7', true, 30)}>
          <Center style={{flex: 1}}>
            <Ionicons name="trash" style={{fontSize: 20, color: 'black'}} />
          </Center>
        </TouchableNativeFeedback>
      </View>
    </Box>
  );
}
