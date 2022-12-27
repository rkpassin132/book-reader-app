import React from 'react';
import {Image, Box, Text, Center} from 'native-base';
import {TouchableNativeFeedback, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { deleteBookFromDownload } from '../services/alert/DownloadAlert';

export default function DownloadListItem({book}) {

    const deleteBook = () => {
        deleteBookFromDownload()
    };

  return (
    <Box borderBottomWidth="1" padding={2} borderColor={'#c8c0c0'}>
      <View style={{display: 'flex', flexDirection: 'row'}}>
        <TouchableNativeFeedback
          onPress={() => {}}
          background={TouchableNativeFeedback.Ripple('#c7c7c7')}>
          <View style={{display: 'flex', flexDirection: 'row', flex:9}}>
            <Image
              flex={2.8}
              source={require('../assets/images/book/book.png')}
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
                This is my first book to read hi bro how are you i am fine
              </Text>
              <Text
                isTruncated
                noOfLines={2}
                fontSize={'md'}
                color="coolGray.800">
                This is my first book to read hi bro how are you i am fine
              </Text>
            </View>
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback
          onPress={deleteBook}
          background={TouchableNativeFeedback.Ripple('#c7c7c7', true, 30)}>
          <Center style={{flex: 1}}>
            <Ionicons name="trash" style={{fontSize: 20, color: 'black'}} />
          </Center>
        </TouchableNativeFeedback>
      </View>
    </Box>
  );
}
