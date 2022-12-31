import React, {useState, useEffect} from 'react';
import {Button, ScrollView, Text, View} from 'native-base';
import {ImageBackground, Linking, ActivityIndicator} from 'react-native';
import SingleBookOption from '../components/book/SingleBookOption';
import Chips from '../components/Chips';
import EmptyData from '../components/EmptyData';
import StyleVariables from '../styles/StyleVariables';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {getBookById} from '../services/api/BookAPI';
import {imageData} from '../services/Common';

export default function SingleBook(props) {
  const [book, setBookData] = useState({
    loading: true,
    ...props.route.params.book,
  });

  useEffect(() => {
    getBook();
  }, []);

  const getBook = async () => {
    let res = await getBookById(book._id);
    if (res.data.success) {
      setBookData({loading: false, ...res.data.book});
    }
  };

  return (
    <ScrollView style={{backgroundColor: StyleVariables.bodyBackground}}>
      {props.book != null ? (
        <EmptyData
          navigation={props.navigation}
          image={require('../assets/images/reading.png')}
          text="Start reading now"
          button="Read"
          buttonNavigate="Explore"
        />
      ) : (
        <View>
          <ImageBackground
            source={imageData(props.route.params.book.images[0].image)}
            style={{height: 350}}>
            <View
              style={{
                alignSelf: 'flex-start',
                paddingVertical: 5,
                paddingHorizontal: 10,
                marginTop: 15,
                backgroundColor: StyleVariables.AppColor,
              }}>
              <Text shadow={2} fontSize={'md'} color={'white'}>
                Read book
              </Text>
            </View>
          </ImageBackground>

          <Text padding={2} bold fontSize={'2xl'}>
            {book.title}
          </Text>
          {book.loading ? (
            <ActivityIndicator style={{flex: 1}} color="#0000ff" />
          ) : (
            <>
              <SingleBookOption {...props} book={book} />
              <View padding={3}>
                <Chips
                  title={book.category.category}
                  icon={book.category.iconCategory}
                  onPress={() => {}}
                />
                <Text fontSize={'xl'} bold marginTop={5}>
                  Discription
                </Text>
                <Text fontSize={'md'} marginTop={4}>
                  {book.discription_about}
                </Text>
                <Text fontSize={'md'} marginTop={5}>
                  {book.discription_for}
                </Text>
              </View>
              <Button
                leftIcon={
                  <Ionicons name="link" size={24} style={{color: 'white'}} />
                }
                marginTop={5}
                color={'white'}
                borderRadius={0}
                fontSize={'md'}
                shadow={2}
                bgColor={StyleVariables.AppColor}
                onPress={() => {
                  Linking.openURL(book.buy_link);
                }}>
                Redirect
              </Button>
            </>
          )}
        </View>
      )}
    </ScrollView>
  );
}
